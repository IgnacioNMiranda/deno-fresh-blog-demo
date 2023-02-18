import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../types.d.ts";
import { getAllPosts } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, context) {
    const posts = await getAllPosts();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps<{ posts: Post[] }>) {
  const { posts } = props.data;
  return (
    <main class="p-4">
      <h1 class="text-4xl font-bold">
        Posts
      </h1>
      <ul class="list-disc list-inside">
        {posts.map(({ slug, title }) => (
          <li>
            <a
              class="underline hover:text-blue-400 transition-colors"
              href={`/posts/${slug}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
