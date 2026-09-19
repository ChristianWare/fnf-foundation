import Link from "next/link";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./Footer.module.css";

const PAGES = [
  { text: "Services", href: "/services" },
  { text: "Fleet", href: "/fleet" },
  { text: "Airports", href: "/airports" },
  { text: "Locations", href: "/locations" },
  { text: "Routes", href: "/routes" },
  { text: "About", href: "/about" },
  { text: "Blog", href: "/blog" },
  { text: "Contact", href: "/contact" },
  { text: "Corporate accounts", href: "/corporate-accounts" },
];
const ACCOUNT = [
  { text: "Book a ride", href: "/book" },
  { text: "Log in", href: "/login" },
  { text: "Create account", href: "/register" },
];
const LEGAL = [
  { text: "Privacy", href: "/privacy" },
  { text: "Terms", href: "/terms" },
];

/**
 * Minimal footer. Contact details come from Admin → Company Settings
 * (which fall back to src/config/site.ts until the operator fills them in).
 */
export default async function Footer() {
  const s = await getCompanySettings();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.brand}>{s.companyName || SITE.name}</p>
          <p className={styles.muted}>{s.companyTagline || SITE.tagline}</p>
          <p>
            <a href={`tel:${s.dispatchPhoneRaw || SITE.phone.tel}`}>
              {s.dispatchPhone || SITE.phone.display}
            </a>
          </p>
          <p>
            <a href={`mailto:${s.supportEmail || SITE.email.support}`}>
              {s.supportEmail || SITE.email.support}
            </a>
          </p>
          <p className={styles.muted}>
            {s.officeAddress || SITE.address.street}
            <br />
            {s.officeCity ||
              `${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`}
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.heading}>Pages</p>
          <ul className={styles.list}>
            {PAGES.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.heading}>Account</p>
          <ul className={styles.list}>
            {ACCOUNT.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.text}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.heading}>Legal</p>
          <ul className={styles.list}>
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        © {year} {SITE.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
