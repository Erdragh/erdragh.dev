import type { Metadata } from "next";
import "./global.scss";
import ActiveLinks from "./active-links";
import avatar from "../../public/avatar.svg";

import styles from "./layout.module.scss";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Erdragh",
    description: "I'm a Computer Science student and web developer. I also make Minecraft mods.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const commitHash = process.env.COMMIT_HASH;
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
                <main className={`content-width stretch-vertical ${styles.main}`}>{children}</main>
                <footer className={`content-width ${styles.footer}`}>
                    <div className={styles.foot}>
                        <h3 id="contact">Contact</h3>
                        <div className={styles.contact}>
                            You can find me via:
                            <div className={styles.links}>
                                <Link href="https://github.com/Erdragh" className="custom-link bubble">
                                    GitHub
                                </Link>
                                <Link href="mailto:mail@erdragh.dev" className="custom-link bubble">
                                    E-Mail
                                </Link>
                                <Link href="https://discord.com/users/365143419078705153" className="custom-link bubble">
                                    Discord
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.foot}>
                        <h3>This Website</h3>
                        {commitHash ? <>Commit hash: {commitHash}</> : <>Environment: {process.env.NODE_ENV}</>}
                        <Link href="https://github.com/Erdragh/erdragh.dev">Source code on GitHub</Link>
                    </div>
                </footer>
            </body>
        </html>
    );
}
