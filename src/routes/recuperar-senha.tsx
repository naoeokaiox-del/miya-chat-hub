import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/yimiya/auth';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/recuperar-senha')({ head: () => pageHead('Recuperar senha', 'Demonstração do fluxo de recuperação de acesso à Yimiya.'), component: () => <AuthPage mode="forgot" /> });
