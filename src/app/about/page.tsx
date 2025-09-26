import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Erdragh - About Me",
    description: "A little information about me as a person on the internet.",
};

export default async function AboutMe() {
    return (
        <>
            <h1>About Me</h1>
            <p>I&apos;m a Computer Science student from Germany. I&apos;m almost done with my Bachelor&apos;s thesis, which is about visualizing medical data in the browser using a volume pathtracer in WebGL.</p>
            <p>You can view a demo of the software online: <Link href={"https://volxel.github.io/Volxel"}>Volxel DICOM Viewer Demo</Link></p>
            <p>
                I&apos;ve taken to web development as a profession and have been working as a web developer since before I went to university.
                I love programming and have been doing it ever since I was 13 years old. Two specific topics have crystallized as subtopics I enjoy most.
                One is web development, which should be apparent, and the other one is graphics programming.
            </p>
        </>
    );
}
