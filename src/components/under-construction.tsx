import Image from "next/image";
import underConstruction from "../assets/logos/under_construction.svg";

import styles from "./under-construction.module.scss";

export default function UnderConstruction() {
    return (
        <div className={styles.underConstruction}>
            <Image src={underConstruction} alt="Under Construction" className="bubble" />
            <div>This content is currently under construction.</div>
        </div>
    );
}
