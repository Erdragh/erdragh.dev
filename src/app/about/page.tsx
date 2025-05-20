import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Erdragh - About Me",
    description: "A little information about me as a person on the internet.",
};

export default async function AboutMe() {
    return (
        <>
            <h1>About Me</h1>
            <p>I'm a Computer Science student from Germany. I'm almost done with my Bachelor's degree, which is about visualizing medical data in the browser.</p>
            <p>
                I've taken to web development as a profession and have been working as a web developer since before I went to university.
                I love programming and have been doing it ever since I was 13 years old. Two specific topics have crystallized as subtopics I enjoy most.
                One is web development, which should be apparent, and the other one is graphics programming.
            </p>
            <p>
                Because I also like gaming (flatscreen and VR) I've combined my passion for programming with it and have been getting into modding for various games.
                Most prominently Minecraft, where I enjoy making mods and modpacks (which have netted me &gt; 1 million downloads in total).
            </p>
        </>
    );
}
