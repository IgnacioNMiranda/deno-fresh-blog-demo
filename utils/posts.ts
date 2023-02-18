import type { Post } from "../types.d.ts";
import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "deno-gfm";

export const getAllPostsSequential = async () => {
  const posts: Post[] = [];
  try {
    const postDirs = Deno.readDir("./content/posts");
    for await (const dir of postDirs) {
      if (dir.isFile) {
        const postPath = dir.name;
        const [slug] = postPath.split(".");
        const post = await loadPost(slug);
        if (post) posts.push(post);
      }
    }
  } catch (_e) {
    return [];
  }
  return posts;
};

export const getAllPosts = async () => {
  const promises: Promise<Post | null>[] = [];
  const posts: (Post | null)[] = [];
  try {
    const postDirs = Deno.readDir("./content/posts");
    for await (const dir of postDirs) {
      if (dir.isFile) {
        const postPath = dir.name;
        const [slug] = postPath.split(".");
        promises.push(loadPost(slug));
      }
    }
    posts.push(...(await Promise.all(promises)));
  } catch (_e) {
    return [];
  }
  return posts.filter(Boolean).sort((a, b) =>
    b!.date.getTime() - a!.date.getTime()
  );
};

export const loadPost = async (slug: string) => {
  let raw: string;

  try {
    raw = await Deno.readTextFile(`./content/posts/${slug}.md`);
  } catch (_e) {
    return null;
  }

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  return {
    slug,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: attrs.excerpt,
  } as Post;
};
