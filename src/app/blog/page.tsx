import type { Metadata } from "next";
import Link from "next/link";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides and answers from ${SITE.name}.`,
};

export default function Page() {
  const posts = getAllPosts();
  return (
    <PagePlaceholder {...guides.blog}>
      <h2>Posts (from content/blog)</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p._id}>
              <Link href={`/blog/${p.slug.current}`}>{p.title}</Link>
              {" — "}
              {new Date(p.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              {p.excerpt ? <><br />{p.excerpt}</> : null}
            </li>
          ))}
        </ul>
      )}
    </PagePlaceholder>
  );
}
