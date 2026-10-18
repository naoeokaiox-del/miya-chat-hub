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
        text: "Comece por autenticação, autorização e validação de entrada. Use HTTPS, limites de requisições e registros sem dados sensíveis.\n\nPara cada endpoint, verifique se o usuário tem permissão de acessar o recurso solicitado.",
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
        text: 'Separe código, testes e configurações. Use um ambiente virtual e mantenha as dependências em um arquivo próprio.\n\n```python\ndef main():\n    print("Olá, mundo!")\n\nif __name__ == "__main__":\n    main()\n```',
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
  send: (text: string) => Promise<void>;
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

export function YimiyaProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(examples);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Preferences>(defaults);
  const [demoSignedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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
      /* Usa os padrões em caso de falha no storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ chats: prefs.saveHistory ? chats : [], prefs, demoSignedIn }),
      );
    } catch {
      /* Modo anônimo pode bloquear o storage */
    }
  }, [chats, prefs, demoSignedIn, ready]);

  function stop() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setPendingId(null);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    let targetChatId = activeId;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
    };

    // Cria um novo chat se nenhum estiver ativo
    if (!targetChatId) {
      targetChatId = `chat-${Date.now()}`;
      const newChatObj: Chat = {
        id: targetChatId,
        title: trimmed.length > 30 ? `${trimmed.slice(0, 30)}…` : trimmed,
        updated: Date.now(),
        messages: [userMsg],
      };
      setChats((prev) => [newChatObj, ...prev]);
      setActiveId(targetChatId);
    } else {
      // Adiciona a mensagem do usuário ao chat atual
      setChats((prev) =>
        prev.map((c) =>
          c.id === targetChatId
            ? { ...c, updated: Date.now(), messages: [...c.messages, userMsg] }
            : c,
        ),
      );
    }

    setPendingId(targetChatId);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("https://yimiya.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Desculpe, não consegui obter uma resposta válida.";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: botReply,
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === targetChatId ? { ...c, messages: [...c.messages, botMsg] } : c,
        ),
      );
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Requisição cancelada pelo usuário.");
        return;
      }

      console.error("Erro na integração com o Render:", error);

      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: " Ops! Não foi possível se conectar com o servidor da Miya. Verifique sua conexão e tente novamente.",
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === targetChatId ? { ...c, messages: [...c.messages, errorMsg] } : c,
        ),
      );
    } finally {
      setPendingId(null);
      abortControllerRef.current = null;
    }
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
            /* storage opcional */
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