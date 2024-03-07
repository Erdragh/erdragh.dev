import type { Metadata } from "next";
import "./global.scss";
import ActiveLinks from "./active-links";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
    title: "Erdragh",
    description: "I'm a Computer Science student and web developer. I also make Minecraft mods.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main className={styles.main}>{children}</main>
                <nav className={styles.nav}>
                    <ActiveLinks
                        links={[
                            ["/", "Home"],
                            ["/projects", "Projects"],
                            ["/about", "About Me"],
                        ]}
                        active={styles.active}
                    />
                </nav>
                <footer>Hello</footer>
            </body>
        </html>
    );
}
