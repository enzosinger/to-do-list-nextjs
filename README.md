
# To-Do List App

Uma aplicação de gerenciamento de tarefas construída com **Next.js**, com funcionalidade para criar, editar, excluir e filtrar tarefas.

## 🚀 Configuração do Ambiente de Desenvolvimento

Siga estas etapas para configurar e executar o projeto localmente.

---

### 🛠️ Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- **Node.js** (Recomendado: versão 18 ou superior) e **NPM** (ou **Yarn**)
- **PostgreSQL** para o banco de dados
- Um editor de código, como o **VSCode**

---

### 📂 Configurando o Projeto

1. **Clone o repositório do projeto**
   ```bash
   git clone https://github.com/enzosinger/to-do-list-nextjs
   cd https://github.com/enzosinger/to-do-list-nextjs
   ```

2. **Instale as dependências**
   Use NPM ou Yarn para instalar as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

---

### 🗄️ Configurando o Banco de Dados

1. **Instale e configure o PostgreSQL**
   - Baixe e instale o PostgreSQL: [PostgreSQL Downloads](https://www.postgresql.org/download/).
   - Após a instalação, crie um banco de dados para o projeto. Use o comando abaixo no terminal do PostgreSQL ou no pgAdmin:
     ```sql
     CREATE DATABASE todo_list;
     ```

2. **Configuração das tabelas**
   Execute o seguinte script SQL no banco de dados criado para criar a tabela necessária:
   ```sql
    CREATE TABLE Task (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL DEFAULT 'Outro',
      completed BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); 
   ```

3. **Configure a variável de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes informações:
   ```
   DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<nome-do-banco>
   ```
   Substitua:
   - `<usuario>` pelo seu usuário do PostgreSQL (ex.: `postgres`)
   - `<senha>` pela senha do usuário do PostgreSQL
   - `<host>` pelo endereço do servidor (ex.: `localhost`)
   - `<porta>` pela porta do PostgreSQL (ex.: `5432`)
   - `<nome-do-banco>` pelo nome do banco criado (ex.: `todo_list`)

---

### ▶️ Executando o Projeto

1. **Execute as migrações do Prisma**
   Certifique-se de que o esquema do Prisma esteja sincronizado com o banco de dados.
   ```bash
   npx prisma migrate dev
   ```

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

3. **Acesse o projeto no navegador**
   O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

---

### 🛠️ Funcionalidades

- Criar tarefas
- Editar tarefas (título e categoria)
- Marcar tarefas como concluídas ou pendentes
- Excluir tarefas
- Filtrar tarefas por status ou categoria
- Buscar tarefas por título

---

### 🐛 Resolução de Problemas

1. **Problema: Conexão com o banco de dados falhou**
   - Verifique se o PostgreSQL está em execução.
   - Confirme se o arquivo `.env` está configurado corretamente.
   - Teste a conexão com o comando:
     ```bash
     psql -U <usuario> -d <nome-do-banco> -h <host> -p <porta>
     ```

2. **Erro ao instalar dependências**
   - Certifique-se de que o **Node.js** está instalado.
   - Remova o diretório `node_modules` e reinstale as dependências:
     ```bash
     rm -rf node_modules
     npm install
     ```

3. **Prisma não sincronizado**
   - Rode novamente o comando:
     ```bash
     npx prisma migrate dev
     ```

---
