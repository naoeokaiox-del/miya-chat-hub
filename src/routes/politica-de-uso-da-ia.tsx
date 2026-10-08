import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/yimiya/legal';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/politica-de-uso-da-ia')({ head: () => pageHead('Política de Uso da IA', 'Conheça os princípios de uso responsável e os limites de segurança previstos para a Miya.'), component: () => <LegalPage kind="ai" /> });
