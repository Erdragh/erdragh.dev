import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Erdragh - Licenses",
    description: "Licenses for content used on this website.",
};

export default async function Licensese() {
    return (
        <>
            <h2>Licenses</h2>
            <ul>
                <li>
                    Under construction symbol:
                    <p>
                        <a href="https://commons.wikimedia.org/wiki/File:Twemoji12_1f6a7.svg">Twitter</a>,{" "}
                        <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>, via Wikimedia Commons
                    </p>
                </li>
            </ul>
        </>
    );
}
