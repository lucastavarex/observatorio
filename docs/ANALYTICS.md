# Analytics — Observatório

O Observatório utiliza duas ferramentas de analytics em paralelo: **Google Analytics 4** para métricas de tráfego e **Microsoft Clarity** para análise de comportamento do usuário (heatmaps e gravações de sessão).

---

## Google Analytics 4

Integrado via pacote oficial `@next/third-parties/google` com o componente `<GoogleAnalytics>`.

- Coleta pageviews, eventos e métricas de engajamento
- Suporta `debugMode` habilitado automaticamente em desenvolvimento
- O script é injetado no `<head>` do layout raiz (sem nonce — a CSP do Observatório usa `'unsafe-inline'`)

**Variável de ambiente:**

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Microsoft Clarity

Integrado via pacote `@microsoft/clarity` com um componente client dedicado (`ClarityInit`).

### O que o Clarity coleta

- **Heatmaps** — onde os usuários clicam, movem o mouse e rolam a página
- **Gravações de sessão** — replay do comportamento completo de cada visita
- **Insights automáticos** — dead clicks, rage clicks, scroll depth, etc.

### Como funciona a integração

O Clarity é inicializado exclusivamente no cliente (browser), nunca no servidor:

```
layout.tsx (Server Component)
└── <head>
    └── <ClarityInit />  ← Client Component
            │
            └── useEffect(() => Clarity.init(id))
                    │
                    └── injeta <script src="https://www.clarity.ms/tag/{id}">
```

**Por que um componente separado?**

O `RootLayout` é um Server Component — adicionar `"use client"` nele quebraria o SSR de toda a aplicação. O `ClarityInit` isola a inicialização client-side sem impactar o layout raiz.

### Arquivo do componente

`src/components/clarity-init.tsx`

```tsx
"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function ClarityInit() {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (clarityId) {
      Clarity.init(clarityId);
    }
  }, []);

  return null;
}
```

- Só inicializa se `NEXT_PUBLIC_CLARITY_ID` estiver definido — sem erros silenciosos em ambientes sem a variável configurada
- Executa uma única vez na montagem do componente (`[]`)

### Uso no layout

`src/app/layout.tsx`

```tsx
import ClarityInit from "@/components/clarity-init";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""}
          debugMode={process.env.NODE_ENV === "development"}
        />
        <ClarityInit />
      </head>
      <body>...</body>
    </html>
  );
}
```

---

## Content Security Policy (CSP)

O projeto define a CSP em `src/proxy.ts` (com `'unsafe-inline'` em `script-src`, sem nonce). Os domínios abaixo foram adicionados para GA e Clarity:

| Diretiva | Domínio | Motivo |
| --- | --- | --- |
| `script-src` | `https://www.googletagmanager.com` | Script gtag do GA4 |
| `script-src` | `https://www.clarity.ms` | Script de tracking do Clarity |
| `script-src` | `https://scripts.clarity.ms` | Scripts auxiliares do Clarity |
| `connect-src` | `https://www.google-analytics.com` | Envio de eventos GA4 |
| `connect-src` | `https://analytics.google.com` | Endpoint adicional do GA4 |
| `connect-src` | `https://*.clarity.ms` | Envio de eventos e dados de sessão (`c`, `m`, `n`, etc.) |
| `img-src` | `https://www.google-analytics.com` | Pixel / beacon do GA |
| `img-src` | `https://c.clarity.ms` | Pixel de sincronização de cookies |

> **Importante:** o Observatório usa `'unsafe-inline'` em `script-src` (sem nonce). Não adicione hash/`'sha256-...'` nessa diretiva — se houver hash ou nonce, o browser **ignora** `'unsafe-inline'` e bloqueia scripts inline do GA, Next.js e Clarity. No portal-cidados o hash é necessário porque a CSP usa nonce em vez de `'unsafe-inline'`.

---

## Variáveis de ambiente

O prefixo `NEXT_PUBLIC_` é obrigatório para que o Next.js exponha a variável ao bundle do cliente.

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_CLARITY_ID` | Project ID do Microsoft Clarity |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Measurement ID do Google Analytics 4 |

### Configuração por ambiente

Cada ambiente pode ter seu próprio Project ID. Configure a variável na plataforma de deploy para cada ambiente:

| Ambiente | Como configurar |
| --- | --- |
| Local / Homologação | `.env` na raiz do projeto |
| Produção | Variável de ambiente na plataforma de deploy (K8s secrets, Docker, etc.) |

```env
# .env (homologação)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=<id-homologacao>

# produção — definir na plataforma de deploy / .env.prod
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-YYYYYYYYYY
NEXT_PUBLIC_CLARITY_ID=<id-producao>
```

> Os arquivos `.env` e `.env.prod` estão no `.gitignore` — os IDs nunca são commitados no repositório.

### Como obter o Project ID do Clarity

1. Acesse [clarity.microsoft.com](https://clarity.microsoft.com)
2. Crie ou selecione um projeto
3. Vá em **Settings → Overview**
4. Copie o **Project ID**

### Como obter o Measurement ID do GA4

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie ou selecione uma propriedade GA4
3. Vá em **Admin → Data streams**
4. Copie o **Measurement ID** (`G-XXXXXXXXXX`)

---

## Verificando a integração

### No browser (DevTools)

1. Abra o DevTools → aba **Network**
2. Filtre por `clarity.ms` ou `google-analytics` / `googletagmanager`
3. Você verá requisições confirmando que os dados estão sendo enviados

### No painel do Clarity

Sessões aparecem no dashboard em até **2 horas** após o primeiro acesso. Em homologação, use o Project ID correspondente para isolar os dados dos ambientes.

### No painel do GA4 (debug)

Em desenvolvimento, `debugMode` fica ativo. Use a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) ou o relatório **Realtime** no GA4.

---

## Referências

- [Microsoft Clarity — Documentação oficial](https://learn.microsoft.com/en-us/clarity/)
- [Pacote npm @microsoft/clarity](https://www.npmjs.com/package/@microsoft/clarity)
- [Next.js — `@next/third-parties` Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)
- [Next.js — Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
