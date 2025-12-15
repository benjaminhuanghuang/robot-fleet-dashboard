# Robot fleet dashboard front end

## Setup

### Vite React project

```sh
npm create vite@latest .

```

### Tailwind CSS

<https://tailwindcss.com/docs/installation/using-vite>

```sh
npm install tailwindcss @tailwindcss/vite

```

Modify vite.config.ts
Modify index.css

### Shadcn

<https://ui.shadcn.com/docs/installation/vite>

After Tailwind CSS has been configured, modify tsconfig.json and tsconfig.app.json

Modify vite.config.ts to support @

```sh
npm install -D @types/node

npx shadcn@latest init
npx shadcn@latest add button
```
