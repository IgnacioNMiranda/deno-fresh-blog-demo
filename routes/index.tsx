export default function Home() {
  return (
    <main class="p-4">
      <h1 class="font-bold text-3xl">My flashy blog ✨</h1>
      <ul class="list-disc list-inside">
        <li>
          <a
            class="underline hover:text-blue-400 transition-colors"
            href="/posts"
          >
            Posts
          </a>
        </li>
      </ul>
    </main>
  );
}
