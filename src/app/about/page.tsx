import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Erdragh - About Me",
    description: "A little information about me as a person on the internet."
}

export default async function AboutMe() {
    return (
        <>
            About Me
        </>
    );
}
