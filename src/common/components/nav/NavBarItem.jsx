import Link from "next/link";
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next";

import styles from "./NavBar.module.css";

export default function NavBarItem ({ item: navItemKey, link }){
    const router = useRouter();
    const selected = link == router.asPath; //TODO

    const { t } = useTranslation('common');

    return (
        <li key={navItemKey} className="nav-item">
            {/* TODO: better class names */}
            <div className={styles["nav-link-background"] + " mx-lg-0 mx-sm-3 " + (selected ? styles["selected"] : "")}>
                <Link href={link}>
                    <a className={styles["nav-link"]} >
                        {t(navItemKey)}
                    </a>
                </Link>
            </div>
        </li>
    )
}