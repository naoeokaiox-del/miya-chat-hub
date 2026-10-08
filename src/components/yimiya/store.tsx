import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
export type ChatMessage = { id: string; role: "user" | "assistant"; text: string };
export type Chat = {
  id: string;
  title: string;
  updated: number;
  messages: ChatMessage[];
  example?: boolean;
};
export type Preferences = {
  personality: string;
  tone: number;
  length: number;
  custom: string;
  compact: boolean;
  saveHistory: boolean;
  name: string;
  email: string;
};
const defaults: Preferences = {
  personality: "Padrão",
  tone: 35,
  length: 50,
  custom: "",
  compact: false,
  saveHistory: true,
  name: "Visitante",
  email: "",
};
const examples: Chat[] = [
  {
    id: "example-1",
    title: "Boas práticas de segurança em APIs",
    updated: Date.now(),
    example: true,
    messages: [
      { id: "e1", role: "user", text: "Quais são as boas práticas de segurança em APIs?" },
      {
        id: "e2",
        role: "assistant",
        text: "**Conversa de exemplo**\n\nComece por autenticação, autorização e validação de entrada. Use HTTPS, limites de requisições e registros sem dados sensíveis.\n\nPara cada endpoint, verifique se o usuário tem permissão de acessar o recurso solicitado.",
      },
    ],
  },
  {
    id: "example-2",
    title: "Organizando um projeto Python",
    updated: Date.now() - 86400000,
    example: true,
    messages: [
      { id: "e3", role: "user", text: "Como posso organizar um projeto Python?" },
      {
        id: "e4",
        role: "assistant",
        text: '**Conversa de exemplo**\n\nSepare código, testes e configurações. Use um ambiente virtual e mantenha as dependências em um arquivo próprio.\n\n```python\ndef main():\n    print("Olá, mundo!")\n\nif __name__ == "__main__":\n    main()\n```',
      },
    ],
  },
  {
    id: "example-3",
    title: "Ideias para um novo projeto",
    updated: Date.now() - 86400000,
    example: true,
    messages: [
      { id: "e5", role: "user", text: "Me ajude a pensar em um projeto." },
      {
        id: "e6",
        role: "assistant",
        text: "**Conversa de exemplo**\n\nUma boa ideia nasce de um problema concreto. Pense em uma tarefa repetitiva do seu dia e em como você poderia simplificá-la.",
      },
    ],
  },
  {
    id: "example-4",
    title: "Entendendo modelos de linguagem",
    updated: Date.now() - 3 * 86400000,
    example: true,
    messages: [
      { id: "e7", role: "user", text: "O que são modelos de linguagem?" },
      {
        id: "e8",
        role: "assistant",
        text: "**Conversa de exemplo**\n\nSão modelos treinados para identificar padrões em texto e gerar sequências de palavras. Suas respostas podem conter erros e precisam ser verificadas.",
      },
    ],
  },
];
type Store = {
  chats: Chat[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  newChat: () => void;
  deleteChat: (id: string) => void;
  clearChats: () => void;
  send: (text: string) => void;
  pendingId: string | null;
  stop: () => void;
  prefs: Preferences;
  updatePrefs: (patch: Partial<Preferences>) => void;
  demoSignedIn: boolean;
  demoLogin: (name: string, email: string) => void;
  demoLogout: () => void;
  ready: boolean;
};
const StoreContext = createContext<Store | null>(null);
const STORAGE_KEY = "yimiya-frontend-demo-v1";
function demoResponse(text: string, prefs: Preferences) {
  const serious = prefs.tone < 50;
  const intro =
    prefs.personality === "Direta"
      ? ""
      : serious
        ? "Vamos por partes.\n\n"
        : "Vamos explorar isso juntos.\n\n";
  let body =
    "Esta é uma resposta de demonstração. A Miya ainda não está conectada a um modelo de inteligência artificial.\n\nVocê pode continuar esta conversa para experimentar a interface.";
  if (/python/i.test(text))
    body =
      "**Exemplo em Python**\n\nUma função simples para filtrar números pares:\n\n```python\ndef numeros_pares(numeros: list[int]) -> list[int]:\n    return [n for n in numeros if n % 2 == 0]\n\nprint(numeros_pares([1, 2, 3, 4, 5, 6]))\n# [2, 4, 6]\n```\n\nA compreensão de lista percorre os valores e mantém aqueles cujo resto da divisão por 2 é zero.";
  else if (/api|seguran|vulnerab/i.test(text))
    body =
      '**Segurança de APIs**\n\n1. **Autenticação:** valide a identidade de quem faz a requisição.\n2. **Autorização:** verifique o acesso a cada recurso, não apenas ao endpoint.\n3. **Validação:** trate toda entrada como não confiável.\n4. **Proteção:** use HTTPS e limites de requisições.\n5. **Monitoramento:** registre eventos sem expor credenciais.\n\n```python\n# Exemplo defensivo de validação\ndef validar_id(valor: str) -> int:\n    if not valor.isdigit():\n        raise ValueError("ID inválido")\n    return int(valor)\n```';
  if (prefs.length < 30) body = body.split("\n\n").slice(0, 2).join("\n\n");
  if (prefs.length > 75)
    body +=
      "\n\n**Próximo passo**\n\nTeste cada mudança em um ambiente controlado. Revise os resultados e a documentação oficial antes de usar em produção.";
  if (prefs.personality === "Personalizada" && prefs.custom)
    body +=
      "\n\nSua preferência personalizada foi salva para a futura conexão da Miya. Nesta demonstração, apenas os estilos predefinidos são simulados.";
  return `${intro}${body}\n\n*Resposta ilustrativa local · nenhuma IA conectada.*`;
}
export function YimiyaProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(examples);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Preferences>(defaults);
  const [demoSignedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.chats)) setChats(saved.chats);
        if (saved.prefs) setPrefs({ ...defaults, ...saved.prefs });
        setSignedIn(saved.demoSignedIn === true);
      }
    } catch {
      /* Invalid or unavailable local demo storage: use defaults. */
    }
    setReady(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ chats: prefs.saveHistory ? chats : [], prefs, demoSignedIn }),
      );
    } catch {
      /* Private browsing may block storage. */
    }
  }, [chats, prefs, demoSignedIn, ready]);
  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPendingId(null);
  }
  function send(text: string) {
    if (!text.trim() || pendingId) return;
    const id = activeId ?? crypto.randomUUID();
    const message: ChatMessage = { id: crypto.randomUUID(), role: "user", text: text.trim() };
    setChats((current) => {
      if (current.some((chat) => chat.id === id))
        return current.map((chat) =>
          chat.id === id
            ? { ...chat, updated: Date.now(), messages: [...chat.messages, message] }
            : chat,
        );
      return [
        { id, title: text.trim().slice(0, 45), updated: Date.now(), messages: [message] },
        ...current,
      ];
    });
    setActiveId(id);
    setPendingId(id);
    timer.current = setTimeout(() => {
      const response: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: demoResponse(text, prefs),
      };
      setChats((current) =>
        current.map((chat) =>
          chat.id === id ? { ...chat, messages: [...chat.messages, response] } : chat,
        ),
      );
      setPendingId(null);
      timer.current = null;
    }, 1100);
  }
  return (
    <StoreContext.Provider
      value={{
        chats,
        activeId,
        setActiveId,
        newChat: () => setActiveId(null),
        deleteChat: (id) => {
          if (pendingId === id) stop();
          setChats((current) => current.filter((c) => c.id !== id));
          if (activeId === id) setActiveId(null);
        },
        clearChats: () => {
          stop();
          setChats([]);
          setActiveId(null);
        },
        send,
        pendingId,
        stop,
        prefs,
        updatePrefs: (patch) => setPrefs((current) => ({ ...current, ...patch })),
        demoSignedIn,
        demoLogin: (name, email) => {
          setPrefs((current) => ({
            ...current,
            name: name || email.split("@")[0] || "Visitante",
            email,
          }));
          setSignedIn(true);
          setActiveId(null);
        },
        demoLogout: () => {
          stop();
          setSignedIn(false);
          setActiveId(null);
          setChats([]);
          setPrefs(defaults);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {
            /* optional storage */
          }
        },
        ready,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function useYimiya() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("YimiyaProvider is required");
  return context;
}
