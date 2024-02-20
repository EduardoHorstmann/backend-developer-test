import { PrismaClient } from '../../../node_modules/@prisma/client';
import { Request, Response } from 'express';

class ControllerCompanies {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Busca todas as empresas cadastradas
  async getAllCompanies(req:Request, res:Response) {
    try {
      const companies = await this.prisma.companies.findMany();
      res.json(companies);
    } catch (error) {
      console.error('Erro ao obter empresas:', error);
      res.status(500).json({ error: 'Erro ao obter empresas' });
    }
  }

  // Filtra a empresa pelo ID
  async getCompanyById(req:Request, res:Response) {
    const { id } = req.params;
    try {
      const company = await this.prisma.companies.findUnique({
        where: {
          id: id
        }
      });
      if (!company) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }
      res.json(company);
    } catch (error) {
      console.error('Erro ao obter empresa por ID:', error);
      res.status(500).json({ error: 'Erro ao obter empresa por ID' });
    }
  }
}
export default ControllerCompanies;