"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SITE } from "@/config/site";
import styles from "./Nav.module.css";

/**
 * Minimal site nav. Text wordmark (no logo), plain links, Book, and a
 * Log in / Dashboard / Log out cluster driven by the session.
 * The props exist only so existing callers (`<Nav background="white" />`
 * in the dashboard layouts and booking pages) keep compiling; they have
 * no effect on this version.
 */
export interface NavProps {
  navItemColor?: string;
  color?: string;
  hamburgerColor?: string;
  background?: "white" | "cream" | "accent";
}

type AppRole = "USER" | "ADMIN" | "DRIVER" | "CORPORATE";

const LINKS = [
  { text: "Services", href: "/services" },
  { text: "Fleet", href: "/fleet" },
  { text: "Airports", href: "/airports" },
  { text: "Locations", href: "/locations" },
  { text: "About", href: "/about" },
  { text: "Blog", href: "/blog" },
  { text: "Contact", href: "/contact" },
  // Partner landing pages from config; none by default.
  ...SITE.nav.partners.map((p) => ({ text: p.text, href: p.href })),
];

function dashboardFor(roles: AppRole[]): string {
  if (roles.includes("ADMIN")) return "/admin";
  if (roles.includes("DRIVER")) return "/driver-dashboard";
  if (roles.includes("CORPORATE")) return "/corporate";
  return "/dashboard";
}

export default function Nav(props: NavProps) {
  void props; // accepted for compatibility, intentionally unused
  const pathname = usePathname() ?? "/";
  const { data: session, status } = useSession();
  const roles = ((session?.user as { roles?: AppRole[] } | undefined)?.roles ??
    []) as AppRole[];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.brand}>
          {SITE.name}
        </Link>

        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={isActive(l.href) ? styles.active : undefined}
              >
                {l.text}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href="/book" className={styles.btn}>
            Book
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href={dashboardFor(roles)}>Dashboard</Link>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
