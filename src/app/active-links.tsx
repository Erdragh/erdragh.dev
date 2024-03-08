"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLinks({ links, active, className }: { links: [url: string, label: React.ReactNode | string][]; active: string, className: string }) {
    const pathname = usePathname();
    return links.map(([url, label]) => (
        <Link href={url} key={url} className={`${url === pathname ? active : ''} ${className}`}>
            {label}
        </Link>
    ));
}
