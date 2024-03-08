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
                <nav className={`content-width ${styles.nav}`}>
                    <ActiveLinks
                        links={[
                            [
                                "/",
                                // eslint-disable-next-line react/jsx-key
                                <Image priority={true} alt="Homepage" src={avatar}></Image>,
                            ],
                            ["/projects", "Projects"],
                            ["/about", "About Me"],
                        ]}
                        active={styles.active}
                        className={"bubble custom-link"}
                    />
                </nav>
                <main className={`content-width ${styles.main}`}>{children}</main>
                <footer className={`content-width`}>Hello</footer>
            </body>
        </html>
    );
}
