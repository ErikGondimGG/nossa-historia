# 💍 Nossa História — Scrapbook Digital Interativo

## Visão Geral

Um site single-page para comemorar 1 ano de namoro. A namorada (Vivi) abre o link e vive uma experiência emocional e imersiva que conta a história do casal em capítulos, culminando em um momento surpresa com alianças.

---

## Stack

- **React** (Vite)
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **React Router** ou scroll-based navigation
- **Hospedagem:** Vercel ou Netlify (gratuito)

---

## Estrutura de Páginas / Seções

### 1. Tela de Entrada
- Fundo escuro com partículas suaves (estrelas ou pétalas)
- Texto centralizado aparecendo letra por letra:
  > *"Há exatamente 1 ano…"*
- Botão sutil: `"Começar nossa história"`
- Música de fundo começa suavemente ao clicar (integração com iframe do Spotify ou arquivo de áudio local)

---

### 2. Linha do Tempo — Capítulos
Rolagem vertical com efeito **parallax**. Cada capítulo ocupa a tela inteira (full-screen section).

Cada capítulo tem:
- **Foto** do momento (imagem carregada localmente ou via URL)
- **Data** do acontecimento
- **Título curto** (ex: *"O começo de tudo"*)
- **Texto** — carta escrita pelo usuário, em fonte estilo manuscrita
- **Música do momento** — nome da música exibido discretamente

> 💡 Os capítulos devem ser fáceis de editar — usar um arquivo `data/chapters.js` com array de objetos, para o desenvolvedor preencher com os dados reais sem mexer nos componentes.

Estrutura do objeto de capítulo:
```js
{
  id: 1,
  date: "21 de fevereiro de 2024",
  title: "O começo de tudo",
  text: "Texto da carta aqui...",
  image: "/images/foto1.jpg",
  music: "Nome da música — Artista",
  color: "#1a1a2e" // cor de fundo da seção
}
```

---

### 3. Mapa Interativo
- Seção com mapa (usar **Leaflet.js** ou **Google Maps Embed**)
- Marcadores nos lugares que o casal visitou juntos
- Ao clicar no marcador, abre um pequeno card com foto e recado daquele lugar

---

### 4. "Razões pra te amar"
- Grid ou carrossel de cards
- Cada card está virado (flip card)
- Ao clicar/hover, revela uma razão escrita pelo usuário
- Animação suave de flip 3D
- Fundo com gradiente rosado/roxo

---

### 5. Cápsula do Tempo
- Seção com visual de envelope lacrado ou cofre
- Texto: *"Abra no nosso 2º aniversário — [data daqui 1 ano]"*
- Ao tentar clicar, aparece uma animação de cadeado e mensagem: *"Ainda não… 😊"*
- O conteúdo real fica hardcoded no código mas não renderizado na tela por ora

---

### 6. Grand Finale — Tela Final 💍
Esta é a seção mais importante. Deve ser tratada com cuidado especial.

**Fluxo:**
1. A página escurece gradualmente após o último capítulo
2. Aparece a frase, letra por letra:
   > *"Tem uma última coisa que não cabia na tela…"*
3. Após alguns segundos, surgem **duas alianças animadas** girando suavemente no centro (SVG animado ou Lottie animation)
4. Abaixo das alianças, aparece a mensagem pessoal (editável em `data/finale.js`):
   > *"Vivi, esse ano foi o melhor da minha vida. E eu quero que os próximos sejam ainda melhores."*
5. Após a mensagem, aparece um botão ou instrução:
   > *"Agora… fecha os olhos ❤️"*
6. Quando ela clicar/tocar na tela, a tela fica completamente preta com apenas o texto:
   > *"Pode abrir 😊"*
   
   *(Nesse momento o desenvolvedor entrega as alianças pessoalmente)*

**Detalhes visuais do finale:**
- Fundo: preto ou azul muito escuro
- Fonte: serifada elegante (ex: Playfair Display)
- Animação das alianças: suave, brilho dourado
- Opcional: exibir a frase *"Capítulo 1 do resto da nossa história"* com a data atual

---

## Dados Editáveis

Criar pasta `src/data/` com os arquivos:

```
src/
  data/
    chapters.js     → array com todos os capítulos
    reasons.js      → array com as razões pra te amar
    places.js       → array com os lugares do mapa
    finale.js       → mensagem final e configurações do grand finale
```

---

## Assets

```
public/
  images/           → fotos do casal organizadas por capítulo
  audio/            → música de fundo (opcional)
```

---

## Identidade Visual

- **Paleta:** tons escuros (preto, azul meia-noite, vinho) com detalhes em dourado e rosa
- **Fontes:**
  - Títulos: `Playfair Display` (Google Fonts) — elegante, serifada
  - Cartas: `Dancing Script` (Google Fonts) — manuscrita
  - UI geral: `Inter` — limpa e moderna
- **Mood:** cinematográfico, íntimo, elegante

---

## Considerações Finais

- O site deve funcionar **offline após carregado** (sem dependências externas obrigatórias)
- Totalmente **responsivo** — ela provavelmente vai ver no celular
- Sem login, sem banco de dados — tudo estático
- Deploy simples via `vercel deploy` ou drag-and-drop na Netlify
