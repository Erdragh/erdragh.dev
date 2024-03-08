import UnderConstruction from "@/components/under-construction";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Erdragh - About Me",
    description: "A little information about me as a person on the internet.",
};

export default async function AboutMe() {
    return (
        <>
            <h2>About Me</h2>
            <UnderConstruction />
        </>
    );
}
