# IRON FRONTLINE v1.5

Run-and-gun arcade em HTML5 Canvas (384×216, pixel art). Três missões, chefes, armas, reféns e save local.

## Jogabilidade

- **Mover:** A/D ou stick
- **Pular:** W / Espaço
- **Agachar:** S
- **Atirar:** J
- **Granada:** K
- **Melee:** F
- **Recarregar:** R (automático com pente vazio)
- **Pausar:** Esc

Controles touch no celular. Gamepad suportado.

### Missões

1. CITY UNDER FIRE
2. DESERT ASSAULT
3. IRON HARBOR

Progresso e melhores scores ficam no `localStorage`.

## Melhorias desta publicação

- Indicador visual de reload no HUD
- Ciclo de volume persistente (botão VOL no menu: mudo / 35% / 70% / 100%)
- Volume restaurado do save ao iniciar
- `package.json` identificado como `iron-frontline` v1.5.0
- `.gitignore` para Node/Vite

## Rodar localmente

```bash
npm install
npm run dev
```

Sprites esperados em `public/sprites/` — veja `PLAYER-SPRITES-INTEGRATION.md` e `src/game/assets.ts`.

## Stack

Vite · React 19 · TanStack Router/Start · Tailwind 4 · Canvas 2D
