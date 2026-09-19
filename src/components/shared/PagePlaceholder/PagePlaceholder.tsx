import Link from "next/link";
// import Nav from "@/components/shared/Nav/Nav";
import type { PageGuide } from "@/lib/pageGuides";
import styles from "./PagePlaceholder.module.css";
import Nav from "../Nav/Nav";

type Props = PageGuide & {
  /** Overrides the guide title (used by dynamic pages: "Airport Transfers") */
  heading?: string;
  /** Rendered under the guidance — live lists, working forms */
  children?: React.ReactNode;
};

/**
 * Bare-bones page scaffold. Every public page renders this until it's
 * designed for a client. It lists what belongs on the page and where the
 * content lives, and keeps the page's working parts (forms, lists) below.
 */
export default function PagePlaceholder({
  title,
  heading,
  route,
  purpose,
  sections,
  data,
  links,
  children,
}: Props) {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <p className={styles.kicker}>Page template · {route}</p>
        <h1 className={styles.h1}>{heading ?? title}</h1>
        <p className={styles.purpose}>{purpose}</p>

        <h2 className={styles.h2}>What belongs on this page</h2>
        <ol className={styles.sections}>
          {sections.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.note}
            </li>
          ))}
        </ol>

        {data && (
          <>
            <h2 className={styles.h2}>Where the content lives</h2>
            <p className={styles.p}>
              <code className={styles.code}>{data}</code>
            </p>
          </>
        )}

        {links && links.length > 0 && (
          <>
            <h2 className={styles.h2}>Related pages</h2>
            <ul className={styles.links}>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {children && <div className={styles.children}>{children}</div>}

        <p className={styles.note}>
          Delete this guidance when you build the real page. The Nav, Footer,
          metadata, and any form or list above stay.
        </p>
      </main>
    </>
  );
}
