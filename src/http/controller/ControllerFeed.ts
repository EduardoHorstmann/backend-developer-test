import { Request, Response } from 'express';
const { getFeed } = require('../../../plooralless/handler')

class ControllerFeed {
  async listFeed(req: Request, res: Response) {
    return getFeed(req, res);
  }
}

module.exports = ControllerFeed;