import { AppShell } from "./shell";
const content = {
  terms: {
    title: "Termos de Uso",
    subtitle: "Princípios para uma experiência transparente.",
    sections: [
      [
        "Sobre esta versão",
        "A Yimiya é uma plataforma de inteligência artificial em desenvolvimento. Esta versão é uma demonstração de interface. Não há modelo de IA conectado, contas reais ou cobrança.",
      ],
      [
        "Uso responsável",
        "Utilize a plataforma de forma lícita e respeitosa. Não compartilhe senhas, chaves de API ou dados sensíveis. A demonstração não deve ser usada para decisões críticas.",
      ],
      [
        "Limitações das respostas",
        "As respostas exibidas são exemplos locais e não constituem aconselhamento técnico, jurídico, médico ou financeiro. Verifique informações importantes por fontes independentes.",
      ],
      [
        "Próximas versões",
        "As condições do serviço deverão ser atualizadas e revisadas antes do lançamento de funcionalidades reais.",
      ],
    ],
  },
  privacy: {
    title: "Política de Privacidade",
    subtitle: "Transparência sobre o seu espaço pessoal.",
    sections: [
      [
        "Dados locais",
        "Conversas, nome de exibição, e-mail demonstrativo e preferências podem ser salvos no armazenamento local deste navegador. Nenhuma senha é armazenada pela aplicação.",
      ],
      [
        "Controle do histórico",
        "Você pode desativar a persistência do histórico e excluir conversas em Configurações → Privacidade. Em um dispositivo compartilhado, apague seus dados ao encerrar a experiência.",
      ],
      [
        "Serviços externos",
        "O conteúdo das conversas não é enviado a uma API de IA nesta versão. A infraestrutura que hospeda a página e o serviço de fontes podem processar informações técnicas de conexão; os termos finais deverão detalhar os fornecedores.",
      ],
      [
        "Antes do lançamento",
        "A política final deverá identificar o responsável pelo tratamento dos dados, bases legais, prazos de retenção, canais de contato e direitos aplicáveis.",
      ],
    ],
  },
  ai: {
    title: "Política de Uso da IA",
    subtitle: "Inteligência com responsabilidade.",
    sections: [
      [
        "Limites de segurança",
        "A personalidade da Miya altera o estilo das respostas, nunca as regras de segurança. Preferências personalizadas não podem autorizar atividades ilegais, abusivas ou que causem danos.",
      ],
      [
        "Programação e cibersegurança",
        "Utilize orientações de segurança apenas em sistemas próprios ou com autorização explícita. Não solicite acesso indevido, roubo de credenciais ou exploração maliciosa de sistemas.",
      ],
      [
        "Verificação humana",
        "Confirme informações, valide códigos em ambientes controlados e procure profissionais qualificados para decisões de alto impacto. A Miya pode cometer erros.",
      ],
      [
        "Demonstração atual",
        "Nenhuma IA está conectada. Os textos exibidos são ilustrativos e não representam capacidades reais de um modelo ou de um sistema de moderação já implementado.",
      ],
    ],
  },
};
export function LegalPage({ kind }: { kind: keyof typeof content }) {
  const page = content[kind];
  return (
    <AppShell title={page.title}>
      <div className="content-page legal-body">
        <div className="page-eyebrow">TRANSPARÊNCIA</div>
        <h1 className="page-heading">{page.title}</h1>
        <p className="page-description">{page.subtitle}</p>
        <div className="legal-disclaimer">
          Minuta de demonstração. Este texto precisa de revisão jurídica e dos dados reais da
          empresa antes da publicação do serviço.
        </div>
        {page.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
