# Guia de Autenticação — Firebase Authentication

## Como funciona (visão geral)

```
Usuário digita email + senha no formulário
         ↓
Firebase verifica as credenciais nos servidores do Google
         ↓
Firebase devolve um token JWT (prova de que o login foi válido)
         ↓
Nosso servidor verifica esse token e cria um cookie de sessão seguro no navegador
         ↓
Em cada acesso ao dashboard, o servidor lê o cookie e confirma que o usuário está autenticado
         ↓
Se o cookie for inválido ou inexistente → redireciona para /sign-in
```

Toda a autenticação passa pelos servidores do Google (`firebaseapp.com`). **Não é necessário nenhuma configuração de DNS no domínio do projeto.**

---

## O que são as variáveis de ambiente do cookie

```
AUTH_COOKIE_SIGNATURE_KEY_CURRENT=
AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS=
```

Estas chaves **não são do Firebase** — são segredos gerados por você, localmente, para proteger o cookie de sessão.

**Por quê?** Após o login, o servidor cria um cookie no navegador do usuário contendo os dados da sessão. Sem assinar esse cookie com uma chave secreta, qualquer pessoa poderia fabricar um cookie falso e acessar o dashboard sem senha. A assinatura HMAC garante que o cookie só é aceito se foi criado pelo seu servidor.

**`CURRENT`** → a chave ativa no momento, usada para criar e verificar novos cookies.

**`PREVIOUS`** → a chave anterior, usada apenas para não quebrar sessões existentes durante uma rotação de chave. Na primeira configuração, pode ser igual à `CURRENT` (ou outra string aleatória qualquer).

**Quando rotacionar?** Apenas se suspeitar que a chave foi comprometida. Para rotacionar:

1. Copie o valor de `CURRENT` para `PREVIOUS`
2. Gere uma nova string aleatória e coloque em `CURRENT`
3. Reinicie o servidor — sessões antigas ainda funcionarão até expirarem

---

## Passo a passo: configurar o Firebase

### 1. Criar o projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Add project"** (ou "Criar projeto")
3. Dê um nome ao projeto (ex: `observatorio-qualionibus`)
4. Desative o Google Analytics se quiser (não é necessário)
5. Clique em **"Create project"**

---

### 2. Ativar autenticação por email e senha

1. No menu lateral esquerdo, clique em **"Build" → "Authentication"**
2. Clique em **"Get started"**
3. Na aba **"Sign-in method"**, clique em **"Email/Password"**
4. Ative a primeira opção (**"Email/Password"**) — deixe a segunda ("Email link") desativada
5. Clique em **"Save"**

---

### 3. Obter as credenciais do app (chaves públicas)

1. Clique na engrenagem ⚙️ no menu lateral → **"Project settings"**
2. Role até a seção **"Your apps"**
3. Clique no ícone `</>` (Web) para registrar um app web
4. Dê um apelido (ex: `observatorio-web`) e clique em **"Register app"**
5. Copie os valores do objeto `firebaseConfig`:

```js
// Você verá algo assim:
const firebaseConfig = {
  apiKey: "AIzaSy...",           // → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "meu-projeto.firebaseapp.com", // → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "meu-projeto",      // → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ...
};
```

---

### 4. Obter as credenciais do servidor (Service Account)

Estas credenciais são privadas e ficam apenas no servidor (nunca expostas ao browser).

1. Ainda em **"Project settings"**, clique na aba **"Service accounts"**
2. Clique em **"Generate new private key"**
3. Confirme no popup — um arquivo `.json` será baixado
4. Abra o arquivo e copie:
   - `"project_id"` → `FIREBASE_PROJECT_ID`
   - `"client_email"` → `FIREBASE_CLIENT_EMAIL`
   - `"private_key"` → `FIREBASE_PRIVATE_KEY`

> ⚠️ A `private_key` contém quebras de linha (`\n`). Cole o valor inteiro (incluindo os `\n`) entre aspas na variável de ambiente. Exemplo:
>
> ```
> FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"
> ```

---

### 5. Gerar as chaves do cookie de sessão

Execute no terminal (qualquer máquina com OpenSSL — Linux/Mac/WSL):

```bash
openssl rand -base64 32
```

Execute **duas vezes** e use os resultados:

```
# Primeira execução:
AUTH_COOKIE_SIGNATURE_KEY_CURRENT=abc123...resultado1

# Segunda execução:
AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS=xyz789...resultado2
```

---

### 6. Preencher o arquivo `.env` (desenvolvimento local)

Edite o arquivo `.env` na raiz do projeto:

```env
# Firebase — chaves públicas (podem aparecer no browser)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-projeto

# Firebase — chaves privadas (apenas no servidor)
FIREBASE_PROJECT_ID=meu-projeto
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@meu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"

# Cookie de sessão
AUTH_COOKIE_SIGNATURE_KEY_CURRENT=<resultado do primeiro openssl>
AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS=<resultado do segundo openssl>

# Power BI (já estava configurado)
POWER_BI_DASHBOARD_URL=https://app.powerbi.com/view?r=...
```

---

### 7. Configurar em produção (Kubernetes)

Atualize o Secret do Kubernetes com as mesmas variáveis. Se o Secret se chama `observatorio-env`:

```bash
kubectl create secret generic observatorio-env \
  --from-literal=NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..." \
  --from-literal=NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="meu-projeto.firebaseapp.com" \
  --from-literal=NEXT_PUBLIC_FIREBASE_PROJECT_ID="meu-projeto" \
  --from-literal=FIREBASE_PROJECT_ID="meu-projeto" \
  --from-literal=FIREBASE_CLIENT_EMAIL="firebase-adminsdk@meu-projeto.iam.gserviceaccount.com" \
  --from-literal=FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n" \
  --from-literal=AUTH_COOKIE_SIGNATURE_KEY_CURRENT="..." \
  --from-literal=AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS="..." \
  --from-literal=POWER_BI_DASHBOARD_URL="https://..." \
  --dry-run=client -o yaml | kubectl apply -f -
```

Reinicie o deployment após atualizar o Secret:

```bash
kubectl rollout restart deployment/observatorio
```

---

## Gerenciar usuários (para o chefe e funcionários)

### Dar acesso ao Firebase Console para o chefe gerenciar usuários

1. No Firebase Console, clique em ⚙️ **"Project settings"**
2. Clique em **"Users and permissions"**
3. Clique em **"Add member"**
4. Insira o email Google do chefe
5. Selecione a role **"Firebase Authentication Admin"** — ela permite gerenciar usuários sem acessar código ou banco de dados
6. Clique em **"Done"**

> O chefe receberá um convite por email e poderá acessar o Firebase Console com a conta Google dele.

---

### Criar uma conta de usuário (para um funcionário)

1. No Firebase Console → **Authentication → Users**
2. Clique em **"Add user"**
3. Preencha:
   - **Email:** email do funcionário
   - **Password:** uma senha temporária (ex: `Observatorio@2025`)
4. Clique em **"Add user"**
5. Envie as credenciais para o funcionário por outro canal seguro (WhatsApp, email, etc.)
6. Oriente o funcionário a trocar a senha no primeiro acesso, de uma destas formas:
   - Na tela de login (`/sign-in`), clicar em **"Esqueci a senha"** e seguir o e-mail enviado pelo Firebase
   - Após entrar no painel, abrir o menu do usuário (ícone) → **"Trocar senha"**

---

### Importar usuários via CSV (lista WRI)

Use a **tela admin no portal** (não há mais script CLI):

1. Faça login com um e-mail listado em `ADMIN_EMAILS`.
2. No menu do usuário (ícone) → **Gerenciar e-mails WRI** (`/projetos/admin/wri-emails`).
3. Envie o CSV (`nome`, `e_mail`) → **Validar CSV** (preview: novos / existentes / inválidos).
4. Confirme **Importar N novos** — cria só os e-mails que ainda não existem no Firebase Auth e dispara e-mail de redefinição de senha.

**Admins** (env, separados por vírgula):

```env
ADMIN_EMAILS=lucastavarestt@gmail.com,viniciusoike@gmail.com,viniciusor@datascience.insper.edu.br
```

Quem não estiver na lista não vê o link e, se abrir a URL, é redirecionado ao dashboard WRI. As APIs `/api/admin/*` respondem 403.

**Formato do CSV:**

```csv
nome,e_mail
Nome Completo,pessoa@org.br
```

**Regras:**

- Add-only: existentes não são alterados; ninguém é removido se sumir do CSV.
- Linhas inválidas (ex.: dois e-mails na mesma célula) aparecem no preview e são ignoradas.
- Limite da UI: 500 linhas / 1 MB. Cota Firebase (Spark): 150 e-mails de reset/dia.

Documentação técnica completa (arquitetura, segurança, manutenção): [`ADMIN_WRI_EMAILS.md`](./ADMIN_WRI_EMAILS.md).

---

### Trocar o email de um usuário

1. Firebase Console → Authentication → Users
2. Clique nos três pontos `⋮` ao lado do usuário
3. Clique em **"Edit user"**
4. Altere o email e salve

---

### Redefinir a senha (pelo próprio usuário)

O usuário **não precisa** do administrador para redefinir a senha:

1. Em `/sign-in`, clicar em **"Esqueci a senha"**
2. Informar o e-mail cadastrado
3. Abrir o link recebido por e-mail (página padrão do Firebase em `*.firebaseapp.com/__/auth/action`) e definir a nova senha
4. Voltar ao login com a nova senha

Com o usuário já logado no painel:

1. Abrir o menu do usuário (ícone no canto)
2. Clicar em **"Trocar senha"**
3. Informar a senha atual e a nova senha

### Redefinir a senha de um usuário (pelo administrador)

Ainda é possível pelo Console, se necessário:

1. Firebase Console → Authentication → Users
2. Clique nos três pontos `⋮` ao lado do usuário
3. Clique em **"Send password reset email"**
4. O Firebase envia um link de redefinição para o email do usuário

> **Template de e-mail:** em Authentication → Templates → Password reset, configure o idioma **Portuguese (Brazil)** e o nome do produto (ex.: Painel QualiÔnibus). Não é necessário cartão de crédito nem plano Blaze (cota gratuita: 150 e-mails de reset/dia no Spark). A tela de redefinição no link do e-mail é a padrão do Google (customizar a Action URL exige domínio no Firebase Hosting e não é usada neste projeto).

---

### Desativar temporariamente um acesso

1. Firebase Console → Authentication → Users
2. Clique nos três pontos `⋮` ao lado do usuário
3. Clique em **"Disable account"**
4. O usuário não conseguirá fazer login, mas a conta permanece no sistema

---

### Deletar uma conta

1. Firebase Console → Authentication → Users
2. Clique nos três pontos `⋮` ao lado do usuário
3. Clique em **"Delete account"**

---

## Resumo das variáveis de ambiente

| Variável                              | Origem                                           | Visível no browser? |
| -------------------------------------- | ------------------------------------------------ | -------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`       | Firebase Console → Project Settings → App      | Sim (intencional)    |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`   | Firebase Console → Project Settings → App      | Sim (intencional)    |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`    | Firebase Console → Project Settings → App      | Sim (intencional)    |
| `FIREBASE_PROJECT_ID`                | Arquivo`.json` da Service Account              | **Não**       |
| `FIREBASE_CLIENT_EMAIL`              | Arquivo`.json` da Service Account              | **Não**       |
| `FIREBASE_PRIVATE_KEY`               | Arquivo`.json` da Service Account              | **Não**       |
| `AUTH_COOKIE_SIGNATURE_KEY_CURRENT`  | Gerada localmente com`openssl rand -base64 32` | **Não**       |
| `AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS` | Gerada localmente com`openssl rand -base64 32` | **Não**       |
| `ADMIN_EMAILS`                       | Lista de e-mails admin (vírgula) para upload CSV WRI | **Não** |
| `POWER_BI_DASHBOARD_URL`             | Dashboard do Power BI (link de compartilhamento) | **Não**       |

> As variáveis `NEXT_PUBLIC_*` aparecem no código JavaScript do browser — isso é seguro e intencional para o Firebase funcionar no lado do cliente. Elas não dão acesso administrativo ao projeto.
