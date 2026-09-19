import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Nav from "@/components/shared/Nav/Nav";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/config/site";
import styles from "./post.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt ?? `${post.title} — ${SITE.name}` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <p className={styles.meta}>
          <Link href="/blog">← Blog</Link>
          {" · "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className={styles.h1}>{post.title}</h1>
        <article className={styles.body}>
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
        {post.relatedLink?.href && (
          <p className={styles.related}>
            Related: <Link href={post.relatedLink.href}>{post.relatedLink.label ?? post.relatedLink.href}</Link>
          </p>
        )}
        <p className={styles.related}>
          <Link href="/book">Book a ride</Link>
        </p>
      </main>
    </>
  );
}
