import { useState } from "react";
import { ArrowUpRight, Code2, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AppShell } from "./shell";
import mark from "@/assets/yimiya-mark.png";
const articles = [
  {
    category: "Yimiya",
    title: "Um novo espaço para suas ideias",
    description: "Conheça a Yimiya e a proposta por trás da Miya.",
    body: "A Yimiya está sendo construída como um espaço de conversa profissional, claro e pessoal. A Miya é a inteligência da plataforma, com um estilo que você pode ajustar nas configurações. Esta primeira versão é uma demonstração: as respostas são exemplos locais, sem um modelo de IA conectado.",
    icon: Cpu,
  },
  {
    category: "Programação",
    title: "Código claro começa com boas perguntas",
    description: "Contexto, exemplos e objetivos ajudam a estruturar melhor um problema.",
    body: "Ao formular uma pergunta sobre programação, descreva o resultado esperado, o comportamento atual e um exemplo mínimo. Nunca inclua chaves de API, tokens ou credenciais. Separe o problema em etapas e verifique qualquer código sugerido antes de executá-lo.",
    icon: Code2,
  },
  {
    category: "Cibersegurança",
    title: "Segurança como ponto de partida",
    description: "Princípios essenciais para desenvolver com mais responsabilidade.",
    body: "Valide entradas, limite permissões e mantenha dependências atualizadas. Em análises de segurança, trabalhe apenas com sistemas para os quais você tem autorização. Use ambientes de teste e mantenha dados sensíveis fora das conversas.",
    icon: ShieldCheck,
  },
  {
    category: "Inteligência artificial",
    title: "IA com senso crítico",
    description: "Como usar respostas de IA sem abrir mão da sua análise.",
    body: "Modelos podem produzir informações incorretas mesmo quando parecem confiantes. Verifique fontes, revise cálculos e confirme orientações importantes. Uma resposta de IA não substitui aconselhamento profissional nem validação técnica.",
    icon: Cpu,
  },
];
export function ExplorePage() {
  const [filter, setFilter] = useState("Tudo");
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <AppShell title="Explorar">
      <div className="content-page">
        <div className="page-eyebrow">ALÉM DA CONVERSA</div>
        <h1 className="page-heading">Explore novas possibilidades.</h1>
        <p className="page-description">Ideias, tecnologia e o que vem a seguir na Yimiya.</p>
        <div className="explore-filters">
          {["Tudo", "Yimiya", "Programação", "Inteligência artificial", "Cibersegurança"].map(
            (category) => (
              <Button
                key={category}
                size="sm"
                variant={filter === category ? "secondary" : "ghost"}
                className="explore-filter"
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ),
          )}
        </div>
        <div className="explore-grid">
          {articles.map(
            (article, index) =>
              (filter === "Tudo" || filter === article.category) && (
                <article className="explore-card" key={article.title}>
                  <div
                    className={`explore-art ${index > 0 ? "technical" : ""} ${index === 2 ? "security" : ""}`}
                  >
                    {index === 0 ? (
                      <img src={mark} width={85} height={85} alt="Yimiya" loading="lazy" />
                    ) : (
                      <article.icon />
                    )}
                  </div>
                  <div className="explore-card-body">
                    <span className="article-tag">{article.category}</span>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <div className="explore-card-footer">
                      <span>Editorial de demonstração</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelected(index)}>
                        Ler mais
                        <ArrowUpRight />
                      </Button>
                    </div>
                  </div>
                </article>
              ),
          )}
        </div>
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent>
          {selected !== null && (
            <>
              <span className="text-xs text-primary">{articles[selected]?.category}</span>
              <DialogTitle>{articles[selected]?.title}</DialogTitle>
              <p className="text-sm leading-8 text-muted-foreground">{articles[selected]?.body}</p>
              <span className="text-xs text-muted-foreground">
                Conteúdo editorial de demonstração, não uma notícia publicada.
              </span>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
