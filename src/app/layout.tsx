import type { Metadata } from "next";
import "./global.scss";
import ActiveLinks from "./active-links";
import avatar from "../../public/avatar.svg";

import styles from "./layout.module.scss";
import Image from "next/image";

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
                <nav className={styles.nav}>
                    <ActiveLinks
                        links={[
                            [
                                "/",
                                // eslint-disable-next-line react/jsx-key
                                <Image priority={true} alt="Erdragh" src={avatar}></Image>,
                            ],
                            ["/projects", "Projects"],
                            ["/about", "About Me"],
                        ]}
                        active={styles.active}
                    />
                </nav>
                <main className={styles.main}>{children}</main>
                <footer>Hello</footer>
            </body>
        </html>
    );
}
