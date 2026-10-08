import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Paperclip,
  Shield,
  ShieldCheck,
  Square,
  Terminal,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";
import mark from "@/assets/yimiya-mark.png";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { AppShell, IconButton } from "./shell";
import { useYimiya } from "./store";
const suggestions = [
  { text: "Explique segurança de APIs", icon: Shield },
  { text: "Me ajude com Python", icon: Code2 },
  { text: "Analise esta vulnerabilidade", icon: Terminal },
];
function Composer() {
  const { send, pendingId, stop } = useYimiya();
  const [input, setInput] = useState("");
  return (
    <PromptInput
      className="composer"
      onSubmit={({ text }) => {
        if (text.trim() && !pendingId) {
          send(text);
          setInput("");
        }
      }}
    >
      <PromptInputTextarea
        aria-label="Mensagem para Miya"
        placeholder="Pergunte qualquer coisa à Miya…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <PromptInputFooter className="justify-between">
        <div className="composer-tools">
          <IconButton
            label="Anexar arquivos — em breve"
            onClick={() => toast("Anexos estarão disponíveis em uma próxima versão.")}
          >
            <Paperclip />
          </IconButton>
          <span className="composer-model">
            Miya<span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Demo</span>
          </span>
        </div>
        <PromptInputSubmit
          aria-label={pendingId ? "Parar resposta" : "Enviar mensagem"}
          className="send-button"
          status={pendingId ? "streaming" : "ready"}
          onStop={stop}
          disabled={!input.trim() && !pendingId}
        >
          {pendingId ? <Square /> : <ArrowUp />}
        </PromptInputSubmit>
      </PromptInputFooter>
    </PromptInput>
  );
}
export function ChatPage() {
  const { chats, activeId, pendingId, send } = useYimiya();
  const current = chats.find((c) => c.id === activeId);
  const empty = !current?.messages.length;
  const [liked, setLiked] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Não foi possível copiar. Tente selecionar o texto.");
    }
  }
  return (
    <AppShell chat>
      <div className="chat-body">
        {empty ? (
          <div className="empty-chat">
            <div className="welcome">
              <img className="welcome-mark" src={mark} alt="Yimiya" width={75} height={75} />
              <h1>Como posso ajudar?</h1>
              <p>Um espaço para suas ideias. Uma nova forma de ir além.</p>
            </div>
            <Composer />
            <div className="suggestions">
              {suggestions.map(({ text, icon: Icon }) => (
                <Button
                  key={text}
                  variant="outline"
                  className="suggestion"
                  disabled={!!pendingId}
                  onClick={() => send(text)}
                >
                  <span className="suggestion-top">
                    <Icon />
                    <ArrowUpRight className="suggestion-arrow" />
                  </span>
                  <span>{text}</span>
                </Button>
              ))}
            </div>
            <div className="empty-caption">
              <ShieldCheck />
              Suas ideias, no seu espaço.
            </div>
          </div>
        ) : (
          <>
            <Conversation className="transcript">
              <ConversationContent className="transcript-content">
                <div className="local-note">
                  <ShieldCheck className="size-3" />
                  {current.example
                    ? "Conversa de exemplo"
                    : "Demonstração · respostas ilustrativas, sem IA conectada"}
                </div>
                {current.messages.map((m) => (
                  <Message key={m.id} from={m.role}>
                    {m.role === "assistant" && (
                      <div className="assistant-name">
                        <img src={mark} alt="" width={23} height={23} />
                        <span>Miya</span>
                      </div>
                    )}
                    <MessageContent>
                      {m.role === "assistant" ? (
                        <MessageResponse className="message-response">{m.text}</MessageResponse>
                      ) : (
                        <div className="whitespace-pre-wrap break-words leading-7">{m.text}</div>
                      )}
                    </MessageContent>
                    {m.role === "assistant" && (
                      <MessageActions>
                        <MessageAction tooltip="Copiar resposta" onClick={() => copy(m.text, m.id)}>
                          {copied === m.id ? <Check /> : <Copy />}
                        </MessageAction>
                        <MessageAction
                          tooltip={liked.includes(m.id) ? "Remover avaliação" : "Boa resposta"}
                          className={
                            liked.includes(m.id) ? "text-primary" : "text-muted-foreground"
                          }
                          onClick={() =>
                            setLiked((v) =>
                              v.includes(m.id) ? v.filter((id) => id !== m.id) : [...v, m.id],
                            )
                          }
                        >
                          <ThumbsUp />
                        </MessageAction>
                      </MessageActions>
                    )}
                  </Message>
                ))}
                {pendingId === activeId && (
                  <Message from="assistant">
                    <div className="assistant-name">
                      <img src={mark} alt="" width={23} height={23} />
                      Miya
                    </div>
                    <Shimmer>Preparando uma resposta…</Shimmer>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
            <div className="active-composer">
              <Composer />
            </div>
          </>
        )}
      </div>
      <footer className="chat-footer">
        Miya pode cometer erros. Verifique informações importantes.<span className="mx-2">·</span>
        <Link to="/politica-de-uso-da-ia">Uso responsável da IA</Link>
      </footer>
    </AppShell>
  );
}
