import { loadPost } from "../../utils/posts.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "deno-gfm";
import { Post } from "../../types.d.ts";

export const handler: Handlers = {
  async GET(_req, context) {
    const { slug } = context.params;
    const post = await loadPost(slug);
    return context.render({ post });
  },
};

export default function PostPage(props: PageProps<{ post: Post }>) {
  const { post } = props.data;
  if (!post) {
    return <div class="p-4 text-red-400 font-bold">Post not found</div>;
  }

  return (
    <article class="p-4">
      <h1>{post.title}</h1>
      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
