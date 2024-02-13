"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./galaxy.module.scss";

const random = splitmix32(1);

const galaxyColors = {
    yellow: styles.yellow,
    blue: styles.blue,
    red: styles.red
};

export type GalaxyProject = {
    name: string;
    link: string;
    description: string;
    color: keyof typeof galaxyColors;
    id: string;
};

export default function Galaxy({ projects }: { projects: GalaxyProject[]}) {
    const [[width, height], setDimensions] = useState<[number, number]>([1000, 1000]);
    const galaxyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let eventTimeout: NodeJS.Timeout | undefined = undefined;
        const eventListener = () => {
            clearTimeout(eventTimeout);
            eventTimeout = setTimeout(() => {
                if (!galaxyRef.current) return
                setDimensions([galaxyRef.current.clientWidth, galaxyRef.current.clientHeight]);
            }, 500)
        }
        window.addEventListener("resize", eventListener);
        eventListener();
        return () => {
            window.removeEventListener("resize", eventListener);
        }
    }, [galaxyRef, setDimensions]);

    const points = useMemo(() => generatePoints(width, height, projects.length), [width, height, projects.length]);

    return (
        <div ref={galaxyRef} className={styles.galaxy}>
            {projects.map((project, i) => (
                <Star key={project.id} project={project} position={points[i]} />
            ))}
        </div>
    );
}

function Star({ project, position: [x, y] }: { project: GalaxyProject; position: [number, number] }) {
    return (
        <button
            className={`${styles.star} ${galaxyColors[project.color]}`}
            aria-label={project.name}
            style={
                {
                    "--star-x": x,
                    "--star-y": y,
                } as any
            }
        >
            <span className={styles.label}>{project.name}</span>
        </button>
    );
}

function generatePoints(width: number, height: number, n: number, iterations: number = 30): [number, number][] {
    console.debug("generating points");
    const start = Date.now()
    // https://math.stackexchange.com/questions/366474/find-coordinates-of-n-points-uniformly-distributed-in-a-rectangle

    // Step 1: Generate 100n random "density points"
    const densityPoints: [number, number][] = Array(n * 100)
        .fill(0, 0, n * 100)
        .map((_) => [random() * width, random() * height]);
    // Step 2: Generate n random points, called "sites"
    const sites: [number, number][] = Array(n)
        .fill(0, 0, n)
        .map((_) => [random() * width, random() * height]);
    // Steps 5: Repeat Step 3 and 4 to receive a good enough approximation
    for (let i = 0; i < iterations; i++) {
        // Step 3: Assign the points closest to a site to that site (approximate a Voronoi diagram)
        const assignedPoints: {
            site: [number, number];
            points: [number, number][];
        }[] = [];
        for (const site of sites) {
            assignedPoints.push({
                site,
                // Relies on the same instance of a site being returned, not just the same coordinates
                points: densityPoints.filter((point) => findClosestSite(sites, point) === site),
            });
        }
        // Step 4: Move the sites to the center of all associated points
        for (const { site, points } of assignedPoints) {
            const avg: [number, number] = points.reduce(([oldX, oldY], [curX, curY]) => [oldX + curX, oldY + curY], [0, 0]).map((it) => it / points.length) as [
                number,
                number
            ];
            site[0] = avg[0];
            site[1] = avg[1];
        }
    }
    console.debug("generated points", Date.now() - start);
    return sites;
}

function findClosestSite(sites: [number, number][], [x, y]: [number, number]): [number, number] | undefined {
    if (sites.length < 1) return undefined;
    let closestSite = sites[0];
    for (const site of sites) {
        const [siteX, siteY] = site;
        const [closestX, closestY] = closestSite;
        if (Math.pow(siteX - x, 2) + Math.pow(siteY - y, 2) < Math.pow(closestX - x, 2) + Math.pow(closestY - y, 2)) {
            closestSite = site;
        }
    }
    // returns the same instance of the site, not just the same coordinates
    return closestSite;
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function splitmix32(a: number): () => number {
    return function () {
        a |= 0;
        a = (a + 0x9e3779b9) | 0;
        var t = a ^ (a >>> 16);
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ (t >>> 15);
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
    };
}
