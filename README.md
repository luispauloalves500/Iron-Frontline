# IRON FRONTLINE v1.5

Run-and-gun arcade em HTML5 Canvas (384×216).

Repo: https://github.com/luispauloalves500/Iron-Frontline

## Controles

- A/D mover · W/Espaço pular · S agachar
- J atirar · K granada · F melee · R recarregar · Esc pausar

## O que já está neste repo

- `package.json` / `tsconfig.json` / `.gitignore`
- `src/game/assets.ts` `audio.ts` `input.ts` `save.ts`
- `src/routes` + `src/router.tsx` + `src/routeTree.gen.ts`
- `src/styles.css`
- stubs de auth/error para o app abrir fora do builder

## Ainda falta copiar do ZIP local

Estes arquivos são grandes demais para a API usada aqui:

- `src/game/engine.ts` (~65 KB) — motor do jogo
- `src/components/game-view.tsx` — menu/HUD/touch
- `vite.config.ts` e pasta `scripts/`
- `public/sprites/` (PNGs/WebPs)

Do seu PC, com o ZIP extraído:

```bash
git clone https://github.com/luispauloalves500/Iron-Frontline.git
cd Iron-Frontline
cp -R /caminho/do/zip/src/game/engine.ts src/game/
cp -R /caminho/do/zip/src/components/game-view.tsx src/components/
cp -R /caminho/do/zip/public public
cp /caminho/do/zip/vite.config.ts .
cp -R /caminho/do/zip/scripts scripts
git add .
git commit -m "Add engine, HUD and sprites"
git push
```
