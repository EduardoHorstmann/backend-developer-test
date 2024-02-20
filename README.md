# Backend Developer Test

Bem-vindo ao teste técnico para desenvolvedores de backend!

## Descrição

Este projeto é uma aplicação backend desenvolvida em Node.js com Express e Prisma, fornecendo endpoints para gerenciar jobs em uma plataforma de recrutamento.

## Requisitos

- Node.js (v14+)
- TypeScript
- Docker (opcional, para executar o banco de dados PostgreSQL em um contêiner Docker)

## Instalação

1. Clone o repositório:
  git clone https://github.com/plooral/backend-developer-test.git

2. Instale as dependências do projeto:
cd backend-developer-test
npm install

3. Copie o arquivo `.env.example` para `.env` e defina as variáveis de ambiente necessárias, como credenciais de banco de dados.
cp .env.example .env

## Configuração do Banco de Dados

Se você optou por executar o banco de dados PostgreSQL em um contêiner Docker:

1. Inicie o contêiner Docker:
docker-compose up -d

2. O banco de dados estará disponível em `localhost:5432`.

## Execução

Para iniciar o servidor em modo de desenvolvimento:
npm run dev

## Testes

Para executar os testes automatizados:
npm test
