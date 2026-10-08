# Yimiya AI Platform

Crie o site da Yimiya, uma plataforma de inteligência artificial chamada Yimiya, cuja IA se chama Miya.



Quero uma interface inspirada na experiência de plataformas modernas de chat com IA pelo navegador, mas com identidade visual própria. Não copie exatamente o design de nenhum serviço existente.



ESTILO VISUAL



O site NÃO deve ter aparência kawaii, infantil ou excessivamente fofa.



Quero uma estética:



- dark;

- moderna;

- profissional;

- tecnológica;

- minimalista;

- elegante;

- com preto/grafite como base;

- branco/cinza para textos;

- rosa ou magenta como cor de destaque da Yimiya;

- pequenos detalhes visuais relacionados a tecnologia, mas sem exagerar na estética "hacker".



A identidade deve parecer uma plataforma profissional de IA, e não um site de personagem.



PÁGINA INICIAL / CHAT



Depois de entrar na conta, o usuário deve chegar ao chat.



Na primeira conversa, quando ainda não existe nenhuma mensagem, mostrar:



"Como posso ajudar?"



Abaixo, algumas sugestões de perguntas, por exemplo:



- "Explique segurança de APIs"

- "Me ajude com Python"

- "Analise esta vulnerabilidade"



Essas sugestões devem aparecer somente quando o chat estiver vazio.



Assim que o usuário começar uma conversa, essas sugestões desaparecem.



A interface deve ficar limpa e focada na conversa.



ESTRUTURA DO CHAT



Criar uma interface semelhante à experiência de um aplicativo moderno de IA:



Barra lateral



- Logo Yimiya

- botão "+ Novo chat"

- histórico de conversas

- conversas organizadas por período

- pesquisa nas conversas

- configurações

- perfil do usuário



Área principal



- mensagens do usuário;

- mensagens da Miya;

- indicador de resposta;

- suporte a código com syntax highlighting;

- botão para copiar código;

- campo de mensagem na parte inferior;

- botão de enviar;

- suporte futuro para anexar arquivos.



A interface precisa funcionar muito bem tanto em celular quanto em computador.



No celular, a barra lateral deve poder ser aberta/fechada.



LOGIN E CONTA



Criar uma página de login profissional.



Opções:



- entrar com e-mail;

- senha;

- criar conta;

- recuperação de senha.



Depois do login, o usuário entra diretamente no chat.



Criar também uma área de perfil/configurações.



PERSONALIDADE DA MIYA



A personalidade da Miya NÃO deve ficar fixa na interface.



Criar uma seção:



Configurações → Personalidade



O usuário poderá escolher como prefere conversar com a Miya.



Exemplos:



- Padrão

- Amigável

- Profissional

- Direta

- Criativa

- Técnica

- Personalizada



Adicionar também controles para:



Tom da conversa:

mais sério ↔ mais descontraído



Tamanho das respostas:

curtas ↔ detalhadas



Adicionar uma caixa de texto:



"Personalidade personalizada"



O usuário poderá escrever algo como:



"Quero respostas diretas, sem muita enrolação e com exemplos."



Essa configuração deve alterar o estilo das respostas da Miya, mas não deve permitir que o usuário desative as regras de segurança da plataforma.



NEWS / EXPLORAR



Criar uma seção separada chamada News ou Explorar.



Ela pode futuramente mostrar:



- novidades da Yimiya;

- atualizações;

- tecnologia;

- programação;

- inteligência artificial;

- cibersegurança;

- notícias relevantes.



Essa área não deve dominar a tela principal do chat.



CONFIGURAÇÕES



Criar:



- Personalidade

- Aparência

- Conta

- Privacidade

- Segurança

- Termos de Uso

- Política de Privacidade

- Política de Uso da IA



IMPORTANTE



Por enquanto, NÃO conectar nenhuma API de inteligência artificial.



Primeiro criar apenas o frontend completo e funcional da plataforma.



Deixar o código organizado para que posteriormente possamos conectar o backend/API da Yimiya.



Não colocar nenhuma chave de API no frontend.



O projeto deve ser responsivo, rápido, organizado e fácil de continuar editando no VS Code.



A Yimiya deve parecer uma plataforma real de IA, não apenas uma landing page.



O objetivo final é:



Yimiya = plataforma de IA

Miya = inteligência/persona

Chat = principal experiência

Personalidade = configurável pelo usuário

Visual = dark, profissional e tecnológico

Rosa/magenta = identidade da marca

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e8762e9-0ba2-46a5-9f70-0ae6f0350736).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
