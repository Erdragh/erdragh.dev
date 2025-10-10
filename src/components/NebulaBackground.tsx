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

function cyrb128(str: string): [number, number, number, number] {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}
function sfc32(a: number, b: number, c: number, d: number) {
    return function() {
        a |= 0; b |= 0; c |= 0; d |= 0;
        const t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

export function NebulaBackground({ seed: initialSeed = "webgl2" }: Readonly<{ seed?: string }>) {
    const path = usePathname();

    const seed = cyrb128(path + initialSeed);
    const rand = sfc32(...seed);

    const hueOffsetBase = rand();
    
    const canvas = useRef<HTMLCanvasElement>(null);
    const hueOffset = useRef<{
        current: number,
        target: number,
        startedAt: DOMHighResTimeStamp | null
    }>({
        current: hueOffsetBase,
        target: hueOffsetBase,
        startedAt: null
    });

    useEffect(() => {
        // update whole page hue offset
        document.body.style.setProperty("--hue-offset", hueOffsetBase + "");
        // update rendering hue offset
        hueOffset.current.target = hueOffsetBase;
        hueOffset.current.startedAt = null;
    }, [hueOffsetBase])

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

        // enable blending
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0,0,0,0);

        const render = (timestamp: DOMHighResTimeStamp) => {
            resize();
            if (hueOffset.current.target !== hueOffset.current.current) {
                if (hueOffset.current.startedAt === null) hueOffset.current.startedAt = timestamp;
                // interpolate hue offset to new one
                // TODO: correct color interpolation
                const timeSince = timestamp - hueOffset.current.startedAt;
                const progress = Math.min(timeSince / 1000, 1.0);
                hueOffset.current.current = progress * hueOffset.current.target + (1 - progress) * hueOffset.current.current;
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1f(gl.getUniformLocation(program, "time"), timestamp / 1000);
            gl.uniform1f(gl.getUniformLocation(program, "hueOffset"), hueOffset.current.current);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            if (running) requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        return () => {
            running = false
        }
    }, [canvas, hueOffset])

    return <>
        <canvas className={styles.background} ref={canvas}>
        </canvas>
    </>
}