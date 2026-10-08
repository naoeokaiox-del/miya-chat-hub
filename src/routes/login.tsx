import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/yimiya/auth';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/login')({ head: () => pageHead('Entrar', 'Entre na demonstração da Yimiya e conheça seu espaço pessoal com Miya.'), component: () => <AuthPage /> });
