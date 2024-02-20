import { PrismaClient, JobStatus } from '../../../node_modules/@prisma/client';
import { Request, Response } from 'express';
import ControllerJobs from '../controller/ControllerJobs';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const prisma = new PrismaClient();

describe('ControllerJobs', () => {
  let controller:  ControllerJobs;

  beforeAll(() => {
    controller = new ControllerJobs();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new job', async () => {
    const req = {
      body: {
        companyId: '27274709-0148-4551-ab57-f918e6a06fe5',
        title: 'Teste Jobs',
        description: 'Teste Jobs',
        location: 'AAA'
      }
    } as Request;
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('should archive a job', async () => {
    // Crie um job fictício no banco de dados para testar
    const createdJob = await prisma.jobs.create({
      data: {
        companyId: '27274709-0148-4551-ab57-f918e6a06fe5',
        title: 'Test Job',
        description: 'Test Job Description',
        location: 'Test Location'
      }
    });

    // Crie uma requisição simulada para o endpoint de publicação do job
    const publishReq = {
      params: {
        id: createdJob.id // Passe o ID do job criado
      }
    } as unknown as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;

    const publishRes = {
      status: jest.fn().mockReturnValue({
        json: jest.fn()
      }),
      json: jest.fn()
    } as unknown as Response;

    await controller.publishJob(publishReq, publishRes);

    // Verifique se o método archive está definido
    if (controller.archiveJob) {
      // Crie uma requisição simulada para o endpoint de arquivamento de job
      const archiveReq = {
        params: {
          id: createdJob.id // Passe o ID do job criado
        }
      } as unknown as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;

      const archiveRes = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        }),
        json: jest.fn()
      } as unknown as Response;

      await controller.archiveJob(archiveReq, archiveRes);

      // Verifique se o status HTTP 204 (No Content) foi retornado
      expect(archiveRes.status).toHaveBeenCalledWith(204);
    } else {
      fail('Method archive not implemented in ControllerJobs');
    }
    // Verifique se o job foi arquivado corretamente no banco de dados
    const archivedJobs = await prisma.jobs.findUnique({
      where: {
        id: createdJob.id
      }
    });
    // Verifique se archivedJob não é nulo
    expect(archivedJobs).toBeDefined();
    // Verifique se o job foi arquivado corretamente (o campo archived deve ser true)
    archivedJobs ? expect(archivedJobs.status).toBe(JobStatus.archived) : fail('Archived job not found');
  });
  it('should publish a job', async () => {
    // Crie um job fictício no banco de dados para testar
    const createdJob = await prisma.jobs.create({
      data: {
        companyId: '27274709-0148-4551-ab57-f918e6a06fe5',
        title: 'Test Job',
        description: 'Test Job Description',
        location: 'Test Location'
      }
    });

    // Crie uma requisição simulada para o endpoint de publicação de job
    const req = {
      params: {
        id: createdJob.id // Passe o ID do job criado
      }
    } as unknown as Request<ParamsDictionary, any, any, any>;

    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    // Chame o método de publicação de job
    await controller.publishJob(req, res);

    // Verifique se o status HTTP 200 foi retornado
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifique se a resposta contém a mensagem correta
    expect(res.json).toHaveBeenCalledWith({ message: 'Job publicado com sucesso' });

    // Verifique se o status do job foi atualizado corretamente no banco de dados
    const publishedJob = await prisma.jobs.findUnique({
      where: {
        id: createdJob.id
      }
    });

    // Verifique se o job não é nulo
    expect(publishedJob).toBeDefined();

    // Verifique se o status do job foi atualizado para "published"
    if (publishedJob) {
      expect(publishedJob.status).toBe('published');
    } else {
      fail('Published job not found');
    }
  });

  it('should delete a job', async () => {
    // Crie um job fictício no banco de dados para testar
    const createdJob = await prisma.jobs.create({
      data: {
        companyId: '27274709-0148-4551-ab57-f918e6a06fe5',
        title: 'Test Job',
        description: 'Test Job Description',
        location: 'Test Location',
        status: 'draft' // Defina o status como "draft" para permitir exclusão
      }
    });

    // Crie uma requisição simulada para o endpoint de exclusão de job
    const req = {
      params: {
        id: createdJob.id // Passe o ID do job criado
      }
    } as unknown as Request<ParamsDictionary, any, any, any>;

    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    // Chame o método de exclusão de job
    await controller.deleteJob(req, res);

    // Verifique se o status HTTP 200 foi retornado
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifique se a resposta contém a mensagem correta
    expect(res.json).toHaveBeenCalledWith({ message: 'Job excluído com sucesso' });

    // Verifique se o job foi excluído corretamente do banco de dados
    const deletedJob = await prisma.jobs.findUnique({
      where: {
        id: createdJob.id
      }
    });

    // Verifique se o job não é mais encontrado no banco de dados
    expect(deletedJob).toBeNull();
  });

  it('should update a job', async () => {
    // Crie um job fictício no banco de dados para testar
    const createdJob = await prisma.jobs.create({
      data: {
        companyId: '27274709-0148-4551-ab57-f918e6a06fe5',
        title: 'Test Job',
        description: 'Test Job Description',
        location: 'Test Location'
      }
    });

    // Defina os novos dados para atualização
    const updatedData = {
      title: 'Updated Job Title',
      description: 'Updated Job Description',
      location: 'Updated Location'
    };

    // Crie uma requisição simulada para o endpoint de atualização de job
    const req = {
      params: {
        id: createdJob.id // Passe o ID do job criado
      },
      body: updatedData
    } as unknown as Request<ParamsDictionary, any, any, any>;

    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    // Chame o método de atualização de job
    await controller.updateJob(req, res);

    // Verifique se o status HTTP 200 foi retornado
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifique se a resposta contém a mensagem correta
    expect(res.json).toHaveBeenCalledWith({ message: 'Job alterado com sucesso' });

    // Verifique se o job foi atualizado corretamente no banco de dados
    const updatedJob = await prisma.jobs.findUnique({
      where: {
        id: createdJob.id
      }
    });

    // Verifique se os campos foram atualizados corretamente
    expect(updatedJob?.title).toBe(updatedData.title);
    expect(updatedJob?.description).toBe(updatedData.description);
    expect(updatedJob?.location).toBe(updatedData.location);
  });
});