import Link from "next/link";
import styles from "./page.module.scss";

export default async function Home() {
    return (
        <>
            <div>
                <h1>Erdragh (<em>Jan Bayer</em>)</h1>
                <p>Hello, I&apos;m Erdragh.</p>
                <p>I develop things and stuff. I mostly focus on web development, but write Minecraft Mods too.</p>
            </div>
            <div className={styles.factors}>
                <div className={`bubble ${styles.factor}`}>
                    <h2>At Work</h2>
                    <ul>
                        <li>
                            I&apos;ve used <Link href={"https://angular.io/"}>Angular</Link> for developing interactive web applications.
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
                            I was part of the development team for <Link href="https://github.com/Willibald-Gluck-Gymnasium/wgg-homepage">my school&apos;s old website</Link>.
                        </li>
                        <li>
                            I love the <Link href="https://www.rust-lang.org/">Rust</Link> language and am trying out{" "}
                            <Link href="https://bevyengine.org/">Bevy</Link>.
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
