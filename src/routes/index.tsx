import { createFileRoute } from '@tanstack/react-router';
import { ChatPage } from '@/components/yimiya/chat';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/')({ head: () => pageHead('Converse com Miya', 'Seu espaço para explorar ideias, programação e tecnologia com Miya. Conheça a demonstração da Yimiya.'), component: ChatPage });
