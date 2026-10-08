import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Compass,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftClose,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import mark from "@/assets/yimiya-mark.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useYimiya } from "./store";
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`brand ${className}`}>
      <img src={mark} alt="" width={36} height={36} />
      <span>
        yimiya<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
export function IconButton({
  label,
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={label}
          onClick={onClick}
          className={className}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
export function AppShell({
  children,
  title = "Miya",
  chat = false,
}: {
  children: ReactNode;
  title?: string;
  chat?: boolean;
}) {
  const { chats, activeId, setActiveId, newChat, deleteChat, prefs, demoSignedIn, demoLogout } =
    useYimiya();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const goChat = (id: string | null) => {
    setActiveId(id);
    setOpen(false);
    setSearchOpen(false);
    navigate({ to: "/" });
  };
  const sorted = [...chats].sort((a, b) => b.updated - a.updated);
  const periods = [
    {
      name: "Hoje",
      items: sorted.filter((c) => new Date(c.updated).toDateString() === new Date().toDateString()),
    },
    {
      name: "Ontem",
      items: sorted.filter(
        (c) =>
          new Date(c.updated).toDateString() === new Date(Date.now() - 86400000).toDateString(),
      ),
    },
    {
      name: "Últimos 7 dias",
      items: sorted.filter(
        (c) =>
          new Date(c.updated).toDateString() !== new Date().toDateString() &&
          new Date(c.updated).toDateString() !== new Date(Date.now() - 86400000).toDateString(),
      ),
    },
  ];
  return (
    <TooltipProvider delayDuration={250}>
      <div className={`app-shell ${prefs.compact ? "compact-chat" : ""}`}>
        {open && (
          <div className="sidebar-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
        )}
        <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Barra lateral">
          <div className="sidebar-brand">
            <Brand />
          </div>
          <IconButton label="Fechar menu" className="sidebar-close" onClick={() => setOpen(false)}>
            <X />
          </IconButton>
          <Button
            className="sidebar-new"
            onClick={() => {
              newChat();
              goChat(null);
            }}
          >
            <Plus />
            Novo chat
          </Button>
          <nav className="side-nav" aria-label="Navegação principal">
            <Button variant="ghost" className="side-link" onClick={() => setSearchOpen(true)}>
              <Search />
              Pesquisar conversas
            </Button>
            <Link
              to="/explorar"
              className={`side-link ${location.pathname === "/explorar" ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <Compass />
              Explorar
              <ArrowUpRight className="arrow" />
            </Link>
          </nav>
          <div className="history">
            <div className="history-heading">
              <span>SUAS CONVERSAS</span>
              <span>LOCAL</span>
            </div>
            {periods.map(
              (period) =>
                period.items.length > 0 && (
                  <div key={period.name}>
                    <div className="history-period">{period.name}</div>
                    {period.items.map((c) => (
                      <div
                        key={c.id}
                        className={`history-item ${activeId === c.id && location.pathname === "/" ? "active" : ""}`}
                      >
                        <Button
                          variant="ghost"
                          className="history-title"
                          title={c.example ? `${c.title} · exemplo` : c.title}
                          onClick={() => goChat(c.id)}
                        >
                          {c.title}
                        </Button>
                        <IconButton
                          label={`Excluir ${c.title}`}
                          className="delete-chat"
                          onClick={() => deleteChat(c.id)}
                        >
                          <Trash2 className="size-3" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                ),
            )}
            {!chats.length && <p className="history-period">Nenhuma conversa ainda</p>}
          </div>
          <div className="sidebar-bottom">
            <Link
              to="/configuracoes"
              className={`side-link ${location.pathname === "/configuracoes" ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <Settings2 />
              Configurações
            </Link>
            <Button variant="ghost" className="profile-button" onClick={() => setAccountOpen(true)}>
              <span className="profile-avatar">
                {demoSignedIn ? prefs.name.slice(0, 2).toUpperCase() : "V"}
              </span>
              <span className="profile-details">
                <strong>{demoSignedIn ? prefs.name : "Visitante"}</strong>
                <small>{demoSignedIn ? "Conta demonstrativa" : "Modo demonstração"}</small>
              </span>
              <ChevronDown className="ml-auto size-3 text-muted-foreground" />
            </Button>
          </div>
        </aside>
        <main className="workspace">
          <div className={chat ? "chat-page" : ""}>
            <header className="topbar">
              <div className="topbar-left">
                <IconButton
                  label="Abrir menu"
                  className="mobile-menu"
                  onClick={() => setOpen(true)}
                >
                  <Menu />
                </IconButton>
                {chat ? (
                  <Button
                    variant="ghost"
                    className="model-button"
                    onClick={() => setModelOpen(true)}
                  >
                    Miya
                    <ChevronDown className="size-3 text-muted-foreground" />
                    <span className="model-status">DEMO</span>
                  </Button>
                ) : (
                  <span className="text-sm font-medium">{title}</span>
                )}
              </div>
              <div className="topbar-right">
                <span className="private-label">
                  <ShieldCheck />
                  Espaço pessoal
                </span>
                {chat ? (
                  <IconButton
                    label="Novo chat"
                    onClick={() => {
                      newChat();
                      goChat(null);
                    }}
                  >
                    <MessageSquare />
                  </IconButton>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => goChat(activeId)}>
                    <MessageSquare />
                    Voltar ao chat
                  </Button>
                )}
              </div>
            </header>
            {children}
          </div>
        </main>
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="search-dialog">
            <DialogTitle className="sr-only">Pesquisar conversas</DialogTitle>
            <div className="search-input-wrap">
              <Search className="size-4 text-muted-foreground" />
              <input
                autoFocus
                aria-label="Pesquisar conversas"
                placeholder="Pesquisar nas suas conversas…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="search-results">
              {sorted
                .filter((c) =>
                  `${c.title} ${c.messages.map((m) => m.text).join(" ")}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((c) => (
                  <Button variant="ghost" key={c.id} onClick={() => goChat(c.id)}>
                    <MessageSquare className="text-muted-foreground" />
                    <span className="truncate">{c.title}</span>
                    <ChevronRight className="ml-auto text-muted-foreground" />
                  </Button>
                ))}
              {!sorted.some((c) =>
                `${c.title} ${c.messages.map((m) => m.text).join(" ")}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ) && (
                <p className="p-5 text-center text-muted-foreground">
                  Nenhuma conversa encontrada.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={modelOpen} onOpenChange={setModelOpen}>
          <DialogContent>
            <DialogTitle>Miya</DialogTitle>
            <div className="flex items-center gap-4 py-4">
              <img src={mark} width={54} height={54} alt="Símbolo da Yimiya" />
              <div>
                <p className="font-medium">Inteligência, do seu jeito.</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Você está na demonstração da Yimiya. As respostas são exemplos locais, sem conexão
                  com IA.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setModelOpen(false);
                navigate({ to: "/configuracoes" });
              }}
            >
              Personalizar a Miya
              <Settings2 />
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog open={accountOpen} onOpenChange={setAccountOpen}>
          <DialogContent>
            <DialogTitle>{demoSignedIn ? "Sua conta" : "Seu espaço na Yimiya"}</DialogTitle>
            <p className="text-sm leading-7 text-muted-foreground">
              {demoSignedIn
                ? `Conectado em modo demonstrativo como ${prefs.name}.`
                : "Conheça a experiência de acesso e personalize sua Miya em modo demonstrativo."}
            </p>
            <Button
              onClick={() => {
                setAccountOpen(false);
                navigate({ to: demoSignedIn ? "/configuracoes" : "/login" });
              }}
            >
              {demoSignedIn ? "Perfil e configurações" : "Entrar na Yimiya"}
              <ChevronRight />
            </Button>
            {demoSignedIn && (
              <Button
                variant="outline"
                onClick={() => {
                  demoLogout();
                  setAccountOpen(false);
                  navigate({ to: "/login", replace: true });
                }}
              >
                <LogOut />
                Sair da demonstração
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
