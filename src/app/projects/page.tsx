import UnderConstruction from "@/components/under-construction";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Erdragh - Projects",
    description: "A little showcase of some of the projects I'm proud of.",
};

export default async function Projects() {
    return (
        <>
            <h2>Projects</h2>
            <UnderConstruction />
        </>
    );
}
