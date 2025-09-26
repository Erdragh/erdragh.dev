import Link from "next/link";
import styles from "./page.module.scss";

export default async function Home() {
    return (
        <>
            <div>
                <h1>Erdragh (<em>Jan Bayer</em>)</h1>
                <p>Hello, I&apos;m Erdragh.</p>
                <p>I&apos;ve been programming for as long as I can reasonably remember. Among other things I do web development, game development and Minecraft mod development.</p>
        
            </div>
            <div className={styles.factors}>
                <div className={`bubble ${styles.factor}`}>
                    <h2>At Work</h2>
                    <ul>
                        <li>
                            I&apos;ve used <Link href={"https://angular.io/"}>Angular</Link> for developing interactive web applications, even though it doesn&apos;t feel nice to use it.
                        </li>
                        <li>
                            I&apos;ve written form-associated Web Components for easier cross-library forms.
                        </li>
                        <li>
                            I&apos;ve used <Link href={"https://react.dev/"}>React</Link> and <Link href={"https://nextjs.org/"}>NextJS</Link> for beautiful and
                            performant websites.
                        </li>
                        <li>
                            I&apos;ve written software for the <Link href="https://www.wildfly.org/">WildFly</Link> Java application server.
                        </li>
                    </ul>
                </div>
                <div className={`bubble ${styles.factor}`}>
                    <h2>At Home</h2>
                    <ul>
                        <li>
                            I dabble with game and engine development. Recently I have taken to using <Link href="https://ziglang.org">Zig</Link> with <Link href="https://wiki.libsdl.org/SDL3/CategoryGPU">SDL3&apos;s GPU API</Link>.
                        </li>
                        <li>
                            I have started multiple Rust GUI app projects, many of which are waiting for my attention again.
                        </li>
                        <li>I write Minecraft mods, available on <Link href="https://modrinth.com/user/Erdragh">Modrinth</Link>.</li>
                    </ul>
                </div>
                <div className={`bubble ${styles.factor}`}>
                    <h2>For You</h2>
                    <p>I am not currently looking for a job.</p>
                    <p>If you want to contact me anyway, see the <Link href="#contact">Contact</Link> information.</p>
                </div>
            </div>
        </>
    );
}
