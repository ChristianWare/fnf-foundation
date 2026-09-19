import Link from "next/link";
import Nav from "@/components/shared/Nav/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 20px 96px", lineHeight: 1.55 }}>
        <h1 style={{ fontSize: 32, fontWeight: 600, margin: "0 0 12px" }}>Page not found</h1>
        <p style={{ margin: "0 0 16px" }}>That page doesn&apos;t exist or has moved.</p>
        <p>
          <Link href="/">Home</Link> · <Link href="/book">Book a ride</Link> · <Link href="/contact">Contact</Link>
        </p>
      </main>
    </>
  );
}
