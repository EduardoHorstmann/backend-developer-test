import { PrismaClient } from '../../../node_modules/@prisma/client';
import { Request, Response } from 'express';
import ControllerCompanies from '../controller/ControllerCompanies';

const prisma = new PrismaClient();

describe('ControllerCompanies', () => {
  let controller: ControllerCompanies;

  beforeAll(() => {
    controller = new ControllerCompanies();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should get all companies', async () => {
    const req = {} as Request;
    const res = {} as Response;
    res.json = jest.fn();

    await controller.getAllCompanies(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('should get company by ID', async () => {
    const req: Request = {
      params: { id: '27274709-0148-4551-ab57-f918e6a06fe5' } as unknown
    } as Request;

    const res = {} as Response;
    res.json = jest.fn();
    res.status = jest.fn().mockReturnValue(res);

    await controller.getCompanyById(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
