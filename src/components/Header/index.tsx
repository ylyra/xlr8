import Link from "next/link";
import { useRouter } from "next/router";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import styles from "./styles.module.scss";

export function Header() {
  const { asPath } = useRouter();

  const isOnBookmarkPage = asPath === "/bookmark";

  return (
    <header className={styles.headerWrapper}>
      <main className={styles.headerContentContainer}>
        <Link href="/">
          <a className={styles.homeButton}>XLR8</a>
        </Link>

        <Link href="/bookmark">
          <a className={styles.bookmarkLink}>
            {isOnBookmarkPage ? (
              <FaBookmark size={20} />
            ) : (
              <FaRegBookmark size={20} />
            )}
          </a>
        </Link>
      </main>
      <h1></h1>
    </header>
  );
}
