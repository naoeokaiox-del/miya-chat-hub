import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/yimiya/auth';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/reset-password')({ head: () => pageHead('Redefinir senha', 'Visualize a experiência de redefinição de senha da Yimiya, sem alterar credenciais reais.'), component: () => <AuthPage mode="reset" /> });
