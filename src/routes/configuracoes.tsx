import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/yimiya/settings";
import { pageHead } from "@/lib/yimiya-meta";
export const Route = createFileRoute("/configuracoes")({
  head: () =>
    pageHead(
      "Configurações",
      "Personalize a personalidade da Miya e suas preferências de aparência, conta, privacidade e segurança.",
    ),
  component: SettingsPage,
});
