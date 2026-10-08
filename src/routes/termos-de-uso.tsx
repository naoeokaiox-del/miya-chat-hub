import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/yimiya/legal';
import { pageHead } from '@/lib/yimiya-meta';
export const Route = createFileRoute('/termos-de-uso')({ head: () => pageHead('Termos de Uso', 'Minuta demonstrativa dos termos de uso e limitações da Yimiya.'), component: () => <LegalPage kind="terms" /> });
