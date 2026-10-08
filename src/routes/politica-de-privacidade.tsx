import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/yimiya/legal';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/politica-de-privacidade')({ head: () => pageHead('Política de Privacidade', 'Saiba como a demonstração da Yimiya armazena suas conversas e preferências localmente.'), component: () => <LegalPage kind="privacy" /> });
