<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep Yimiya feature UI in `src/components/yimiya` and use leaf routes for public content, so the chat remains the root experience and each page has independent metadata.
- Use a single browser-only demo state provider for conversations and preferences; account screens simulate access without storing passwords, so a future backend can replace demo operations without changing the presentation.
- Compose transcript, markdown, code, composer and loading states from installed AI Elements primitives to retain compatible chat foundations.
- Keep personality preferences separate from immutable safety expectations; local illustrative responses never represent a connected model or a real moderation service.
