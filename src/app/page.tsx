import Galaxy, { GalaxyProject } from "@/components/galaxy";

export default async function Home() {
    const projects: GalaxyProject[] = ((await (await fetch("https://api.github.com/users/Erdragh/repos")).json()) as any[])
        .filter((repo) => !repo.fork && !repo.archived)
        .map((repo) => ({
            name: repo.name,
            id: repo.node_id,
            description: repo.description,
            link: repo.html_url,
            color: (
                (() => {
                    switch (repo.language) {
                        case "Java":
                        case "Kotlin":
                            return "red";
                        case "JavaScript":
                        case "TypeScript":
                        case "HTML":
                            return "yellow";
                        default:
                            return "blue";
                    }
                }) as () => GalaxyProject["color"]
            )(),
        }));
    return (
        <main>
            <Galaxy projects={projects}></Galaxy>
        </main>
    );
}
