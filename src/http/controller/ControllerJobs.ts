import { PrismaClient, JobStatus } from '../../../node_modules/@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

const jobSchema = z.object({
  companyId: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  notes: z.string().optional(),
});

const updateJobSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
})

interface ControllerJobs {
  prisma: PrismaClient;
}

class ControllerJobs {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  /**
   * Realiza a criação do job
   * @param req 
   * @param res 
   */
  async create(req:Request, res:Response) {
    try {
      const validatedData = jobSchema.parse(req.body);
      const newJob = await this.prisma.jobs.create({
        data: validatedData,
      });
      res.status(201).json(newJob);
    } catch (error) {
      console.error('Erro de validação:', error);
      res.status(400).json({ error: 'Erro de validação' });
    }
  }
 /**
  *  Realiza a publicação do job se permitido
  * @param req 
  * @param res 
  */
  async publishJob(req:Request, res:Response) {
    try {
      const {id} = req.params;
      const statusJob = await this.getStatusJob(id);

      if(!statusJob) {
        return res.status(400).json({error:'Não foi encontrado o Job'});
       }
      if(statusJob !== JobStatus.draft) {
        return res.status(400).json({error:'O Job está com uma situação que não permite publicar'});
       }
      await this.updateJobStatus(id, JobStatus.published);
      res.status(200).json({ message: 'Job publicado com sucesso' });
    } catch(error) {
      console.error('Erro ao publicar job:', error);
      res.status(500).json({ error: 'Erro ao publicar job' });
    }
  }

  /**
   * Realiza alteração do status do job
   * @param id 
   * @param status 
   * @return bool
   */
  async updateJobStatus(id:string, status:JobStatus) {
    return await this.prisma.jobs.update({
      where: { id },
      data: { status: status }
    });
  }

  /**
   *  Indica o status do job
   * @param idJob 
   * @returns mix
   */
  async getStatusJob(idJob:string) {
    try {
      const job =  await this.prisma.jobs.findUnique({
        select: {
          status: true
        },
        where: {
          id: idJob
        }
      });
      if (!job) {
        throw new Error('Job não encontrado');
      }
      return job.status;
    } catch (error) {
      console.error('Erro ao buscar status do job:', error);
      throw new Error('Erro ao buscar status do job');
    }
  }

  /**
   * Realiza alteração do job
   * @param req 
   * @param res 
   */
  async updateJob(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const validatedData = updateJobSchema.parse(req.body);
      await this.prisma.jobs.update({
        where: { id },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          location: validatedData.location
        }
      });
      res.status(200).json({ message: 'Job alterado com sucesso' });
    } catch(error) {
      console.error('Erro ao alterar o job:', error);
      res.status(500).json({ error: 'Erro ao alterar o job' });
    }
  }

  async deleteJob(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const statusJob = await this.getStatusJob(id);

      if(!statusJob) {
        return res.status(400).json({error:'Não foi encontrato o Job'});
       }
      if(statusJob !== JobStatus.draft) {
        return res.status(400).json({error:'O Job está com uma situação que não permite excluir'});
       }
      await this.prisma.jobs.delete({
        where: { id }
      });
      res.status(200).json({ message: 'Job excluído com sucesso' });
    } catch(error) {
      console.error('Erro ao excluir o  job:', error);
      res.status(500).json({ error: 'Erro ao excluir o job' });
    }
  }

  async archiveJob(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const statusJob = await this.getStatusJob(id);

      if(!statusJob) {
        return res.status(400).json({error:'Não foi encontrado o Job'});
       }
      if(statusJob !== JobStatus.published) {
        return res.status(400).json({error:'O Job está com uma situação que não permite arquivar'});
       }
      await this.updateJobStatus(id, JobStatus.archived);
      res.status(204).json({ message: 'Job arquivado com sucesso' });
    } catch(error) {
      console.error('Erro ao arquivar o job:', error);
      return res.status(500).json({ error: 'Erro ao arquivar o job' });
    }
  }

  /**
   * Busca o Job pelo id
   * @param idJob 
   * @returns object <Job>
   */
  async getJob(idJob:string) {
    try {
      const job = await this.prisma.jobs.findUnique({
        where: {
          id: idJob
        }
      })
      if(!job) {
        return false;
      }
      return job;
    } catch (error) {
      return false;
    }
  }
}
export default ControllerJobs;