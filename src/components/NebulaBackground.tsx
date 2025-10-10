"use client";

import { useEffect, useRef } from "react";
import styles from "./NebulaBackground.module.scss"
import { usePathname } from "next/navigation";

import vertexShader from "./NebulaBackground.vert.glsl"
import fragmentShader from "./NebulaBackground.frag.glsl"

export function createShader(gl: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Failed to create Shader")
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;
    else {
        const log = gl.getShaderInfoLog(shader);
        console.error("Shader compilation failed\n", log)
        console.error("Full shader source:\n", source.split("\n").map((it, i) => `${i + 1}: ${it}`).join("\n"));
        gl.deleteShader(shader);
        throw new Error("Failed to compile shader, check Browser Console for details.");
    }
}

export function createProgram(gl: WebGL2RenderingContext, vertex: WebGLShader, fragment: WebGLShader): WebGLProgram {
    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create Program");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;
    else {
        const log = gl.getProgramInfoLog(program);
        console.error("Program linking failed\n", log);
        gl.deleteProgram(program);
        throw new Error("Failed to link program, check Browser Console for details.");
    }
}

export function NebulaBackground({ nebulaComplexity = 15, seed: initialSeed = "red" }: Readonly<{ nebulaComplexity?: number, seed?: string }>) {
    const path = usePathname();

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) return;
        let running = true;
        const gl = canvas.current.getContext("webgl2");
        if (!gl) return;

        // setup resizing
        const resize = () => {
            if (!canvas.current) throw new Error("Tried to resize non existent canvas");
            const rect = canvas.current.getBoundingClientRect();
            canvas.current.width = rect.width;
            canvas.current.height = rect.height;
            gl.viewport(0, 0, rect.width, rect.height);
        }
        const observer = new ResizeObserver(() => resize())
        observer.observe(canvas.current);

        // setup shaders and stuff
        const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
        const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
        const program = createProgram(gl, vertex, fragment);
        // setup vao
        const positionAttribute = gl.getAttribLocation(program, "a_position");
        if (positionAttribute < 0) {
            console.warn("Failed to get position attribute in shader");
            return;
        }
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttribute);
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.useProgram(program);

        const render = () => {
            gl.uniform1f(gl.getUniformLocation(program, "time"), performance.now());
            gl.uniform1f(gl.getUniformLocation(program, "hueOffset"), 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            if (running) requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        return () => {
            running = false
            observer.disconnect();
        }
    }, [canvas])

    return <>
        <canvas className={styles.background} ref={canvas}>
        </canvas>
    </>
}