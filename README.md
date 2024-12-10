# Plataforma de Votação Ágil - README

## 📌 Motivação do Projeto

Este projeto surgiu da necessidade de uma ferramenta simples, ágil e gratuita para gerenciar votações de funcionalidades em processos ágeis, especialmente durante reuniões de planejamento em times de desenvolvimento. Ele foi idealizado para suprir a falta de opções acessíveis e diretas, sem depender de assinaturas de terceiros.

---

## 🛠 Arquitetura do Projeto

### Stack utilizada:

- **Stack utilizada:**

  - **React** com **Vite** e **TypeScript**.
  - A organização escolhida ajuda a manter o código modular, limpo e fácil de escalar, facilitando o futuro do desenvolvimento da aplicação:
    1. **`src/`**: Contém o código-fonte da aplicação.
    - **`__tests__/`**: Diretório para testes unitários ou de integração.
    - **`app/`**: Onde pode ser centralizado o gerenciamento da aplicação, como componentes principais, configuração do roteamento ou estados globais.
    - **`assets/`**: Imagens, fontes e outros arquivos estáticos.
    - **`components/`**: Componentes reutilizáveis da UI.
    - **`domain/`**: Lógica de domínio, como modelos, serviços ou camadas de abstração específicas da aplicação.
    - **`hooks/`**: Hooks personalizados, usados para abstrair a lógica de estado ou manipulação de dados.
    - **`lib/`**: Funções auxiliares ou bibliotecas que podem ser compartilhadas em toda a aplicação.
    - **`providers/`**: Componentes que fornecem contextos ou estados globais para a aplicação, como provedores de tema ou autenticação.
    - **`routes/`**: Definições de rotas ou navegação.
    - **`schemas/`**: Definições de esquemas de validação ou interfaces de tipos, possivelmente com Zod ou outras bibliotecas de validação.
    - **`services/`**: Funções para interação com APIs, bancos de dados ou outras lógicas de serviço.
    - **`utils/`**: Funções utilitárias, como formatação de datas, cálculos, entre outros.
    - **`App.tsx`**: Arquivo principal da aplicação onde o componente raiz é renderizado.
    - **`index.css`**: Arquivo de estilos globais.
    - **`main.tsx`**: Ponto de entrada da aplicação (onde o ReactDOM renderiza a aplicação).
  - Utilização de bibliotecas como Radix UI, React Query, React Hook Form e TailwindCSS para um desenvolvimento eficiente e estilizado.

- **Principais dependências:**
  - Gerenciamento de estado: `@tanstack/react-query`
  - Formulários: `react-hook-form` e `zod`
  - Estilização: `tailwindcss` e `clsx`
  - Comunicação com backend: `axios` e `socket.io-client`

### Backend

- **Stack utilizada:**

  - **Node.js** com **Express** e **TypeScript**.
  - Banco de dados **MongoDB**, gerenciado via **Mongoose**.
  - Gerenciamento de autenticação com **Passport.js** e suporte a autenticações via Google e GitHub.
  - **Socket.IO** para funcionalidade em tempo real (votação e atualizações dinâmicas).

- **Estrutura modular:**
  - Modulo `room`: Gerenciamento de sessões e salas de votação.
  - Modulo `stories`: CRUD de histórias, com suporte a descrições, links e pontuações.
  - Modelos definidos para `Session`, `Story` e `User` com uso de schemas do Mongoose.

---

## 🔍 Modelagem de Dados

- **Modelo `Session`:**

  - Representa uma sessão de votação.
  - Campos principais:
    - `title` (título da sessão).
    - `token` (identificador único).
    - `owner` (proprietário da sessão).
    - `votes` (votações de usuários).
    - `game_type` (tipo de jogo: Fibonacci ou Decimal).
    - `stories` (lista de histórias associadas).
    - `selected_story` (história atualmente selecionada para votação).

- **Modelo `Story`:**

  - Representa uma história a ser votada.
  - Campos principais:
    - `name` (nome da história).
    - `code` (identificador).
    - `description` (descrição opcional).
    - `score` (pontuação atribuída durante a votação).

- **Modelo `User`:**
  - Representa um usuário autenticado.
  - Campos principais:
    - `name` (nome do usuário).
    - `email` (e-mail único).
    - `password` (criptografado com bcrypt).
    - Suporte a login via Google ou GitHub.

---

## ✔️ Requisitos do Projeto

- **Frontend:**

  - Node.js v18+
  - Vite v5
  - Dependências listadas no arquivo `package.json`

- **Backend:**
  - Node.js v18+
  - MongoDB
  - Dependências listadas no arquivo `package.json`

---

## 🚀 Iniciando o Desenvolvimento

### Frontend

1. Clone o repositório.
2. Acesse a pasta do frontend: `cd Poker-Sprints`.
3. Configure o arquivo `.env.local` com as seguintes variáveis:
   - `VITE_API_URL=<SUA_URL_BASE_DA_API>`: URL da api do backend.
4. Instale as dependências: `npm install`.
5. Inicie o servidor de desenvolvimento: `npm run dev`.

### Backend

1. Clone o repositório.
2. Acesse a pasta do backend: `cd PokerSprintsBackEnd`.
3. Configure o arquivo `.env` com as seguintes variáveis:
   - `DB_USER=<SEU_USUARIO>`: Usuário do banco de dados MongoDB.
   - `DB_PASS=<SUA_SENHA>`: Senha do banco de dados MongoDB.
   - `DB_DOMAIN=<SEU_CLUSTER>.mongodb.net`: Cluster do MongoDB.
   - `DB_APP_NAME=<NOME_DA_APP>`: Nome da aplicação no MongoDB.
   - `JWT_SECRET=<SUA_CHAVE_SECRETA>`: Chave secreta para geração de JWT (gerar chave).
   - `GOOGLE_CLIENT_ID=<SEU_GOOGLE_CLIENT_ID>`: Client ID para autenticação Google.
   - `GOOGLE_CLIENT_SECRET=<SEU_GOOGLE_CLIENT_SECRET>`: Client Secret para autenticação Google.
   - `CLIENT_URL=http://localhost:5173`: URL do front-end.
   - `GITHUB_CLIENT_ID=<SEU_GITHUB_CLIENT_ID>`: Client ID para autenticação GitHub.
   - `GITHUB_CLIENT_SECRET=<SEU_GITHUB_CLIENT_SECRET>`: Client Secret para autenticação GitHub.
   - `PORT=4000`: Porta na qual o servidor back-end será executado.
4. Instale as dependências: `npm install`.
5. Inicie o servidor: `npm run dev`.

---

## 📝 Configuração de Variáveis de Ambiente

### **Back-End: `.env`**

Crie um arquivo chamado `.env` na raiz do seu projeto back-end e adicione as variáveis abaixo:

```plaintext
DB_USER=<SEU_USUARIO>
DB_PASS=<SUA_SENHA>
DB_DOMAIN=<SEU_CLUSTER>.mongodb.net
DB_APP_NAME=<NOME_DA_APP>
JWT_SECRET=<SUA_CHAVE_SECRETA>
GOOGLE_CLIENT_ID=<SEU_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<SEU_GOOGLE_CLIENT_SECRET>
CLIENT_URL=http://localhost:5173
GITHUB_CLIENT_ID=<SEU_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<SEU_GITHUB_CLIENT_SECRET>
PORT=4000
```

#### Gerando Credenciais do MongoDB

Para gerar as credenciais de banco de dados (usuário, senha e cluster) no MongoDB Atlas, siga estas etapas:

1. **Criar uma Conta no MongoDB Atlas**: Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) e crie uma conta, caso ainda não tenha.
2. **Criar um Cluster**:
   - No painel do MongoDB Atlas, clique em "Build a Cluster".
   - Escolha o plano (para desenvolvimento, o plano gratuito "M0" é suficiente).
3. **Criar um Usuário de Banco de Dados**:
   - Na seção "Database Access", crie um novo usuário, fornecendo um nome de usuário e senha. Essas credenciais devem ser usadas nas variáveis `DB_USER` e `DB_PASS`.
4. **Obter o URI de Conexão**:
   - Na seção "Clusters", clique em "Connect".
   - Selecione "Connect your application".
   - Copie o URI de conexão fornecido e substitua a parte `<SEU_CLUSTER>` com o domínio do seu cluster. Exemplo: `cluster0.xxxxx.mongodb.net`.
5. **Substituir valores**:
   - Substitua `<SEU_USUARIO>` e `<SUA_SENHA>` com o usuário e a senha criados na etapa anterior.
   - O MongoDB Atlas fornecerá uma URL completa para conectar o banco de dados, por exemplo: `mongodb+srv://<DB_USER>:<DB_PASS>@cluster0.xxxxx.mongodb.net/<DB_APP_NAME>`.

#### Gerando a Chave Secreta (JWT)

A chave secreta usada para gerar o JWT pode ser uma string longa aleatória. Você pode gerar uma chave secreta de várias formas, incluindo usando um gerador de strings aleatórias ou a ferramenta de linha de comando do Node.js:

1. **Gerando uma chave com Node.js**:

   - Abra o terminal e execute o seguinte comando no seu projeto:

     ```bash
     node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
     ```

   - Esse comando irá gerar uma string aleatória de 64 bytes em formato hexadecimal, que pode ser usada como sua chave secreta.

---

### **Front-End: `.env.local`**

Crie um arquivo chamado `.env.local` na raiz do seu projeto front-end e adicione as variáveis abaixo:

```plaintext
VITE_API_URL=<SUA_URL_BASE_DA_API>
```

---

## 📋 Metodologias e Organização

- **Kanban**: Utilizado para gerenciar tarefas e acompanhar o progresso do projeto.
- Organização feita por módulos, garantindo escalabilidade e manutenção.

---
