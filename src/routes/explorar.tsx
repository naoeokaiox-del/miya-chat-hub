import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/yimiya/explore";
import { pageHead } from "@/lib/yimiya-meta";
export const Route = createFileRoute("/explorar")({
  head: () =>
    pageHead(
      "Explorar",
      "Explore conteúdos demonstrativos sobre a Yimiya, programação, inteligência artificial e cibersegurança.",
    ),
  component: ExplorePage,
});
