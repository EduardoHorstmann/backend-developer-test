const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Povoa a tabela com base no script. Para executar deve entrar no diretório do arquivo e executar "node seed.ts" 
async function seed() {
  try {
    await prisma.companies.createMany({
      data: [
        { name: 'ABC Corp' },
        { name: 'XYZ LLC' },
        { name: 'ACME Enterprises' }
      ]
    });
    console.log('Dados das empresas inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}
seed();