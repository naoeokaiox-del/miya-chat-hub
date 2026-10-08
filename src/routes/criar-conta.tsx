import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/yimiya/auth";
import { pageHead } from "@/lib/yimiya-meta";
export const Route = createFileRoute("/criar-conta")({
  head: () =>
    pageHead(
      "Criar conta",
      "Conheça a experiência de criação de conta da Yimiya em modo demonstrativo.",
    ),
  component: () => <AuthPage mode="signup" />,
});
