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

## Implantação com Serverless Framework

Este projeto utiliza o Serverless Framework para implantar serviços na nuvem. O Serverless Framework permite que você defina a infraestrutura como código e implante facilmente sua aplicação em provedores de nuvem como AWS, Azure, Google Cloud, etc.

### Configuração

1. Certifique-se de ter o Serverless Framework instalado globalmente:
npm install -g serverless

2. Configure suas credenciais de provedor de nuvem (AWS, neste caso) no seu ambiente local:
serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY

### Implantação

Para implantar sua aplicação:
serverless deploy

Isso implantará todos os recursos definidos no arquivo `serverless.yml` na sua conta da AWS.

### Remoção

Para remover todos os recursos implantados:
serverless remove

Isso desfaz todas as implantações e remove todos os recursos provisionados na sua conta da AWS.

Para obter mais informações sobre como usar o Serverless Framework, consulte a [documentação oficial](https://www.serverless.com/framework/docs/).





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
