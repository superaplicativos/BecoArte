# BecoArte

Site estático do Beco Street preparado para publicação no GitHub Pages.

## Estrutura

- `index.html`: entrada principal da experiência
- `styles.css`: identidade visual e layout
- `app.js`: renderização da interface
- `data.js`: catálogo estático com obras, preços, imagens e textos
- `becostreet.com.br/`: páginas e assets locais do acervo clonado

## Publicação

O repositório já inclui workflow de deploy para GitHub Pages em `.github/workflows/deploy-pages.yml`.

Fluxo recomendado:

1. manter os arquivos desta pasta na branch `main`
2. abrir `Settings > Pages`
3. selecionar `GitHub Actions` como source
4. a cada push, o deploy roda automaticamente

## Observação

Python foi usado apenas localmente para consolidar os dados em `data.js`.
Em produção, o site roda só com arquivos estáticos.
