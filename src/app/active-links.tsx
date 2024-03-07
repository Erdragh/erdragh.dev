"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLinks({ links, active }: { links: [url: string, label: string][]; active: string }) {
    const pathname = usePathname();
    return links.map(([url, label]) => (
        <Link href={url} key={url} className={url === pathname ? active : undefined}>
            {label}
        </Link>
    ));
}
