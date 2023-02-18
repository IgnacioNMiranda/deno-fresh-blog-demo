import { loadPost } from "./posts.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("loadPost() returns null if post does not exist", async () => {
  const post = await loadPost("non-existent");
  assertEquals(post, null);
});

Deno.test("loadPost() returns a post object if post exists", async () => {
  const post = await loadPost("hello-world");
  assertEquals(post?.slug, "hello-world");
});
