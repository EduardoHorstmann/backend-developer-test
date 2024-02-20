import express from 'express';
const ControllerFeed = require('../controller/ControllerFeed')
const router = express.Router();

const feedController = new ControllerFeed()

router.get('/', feedController.listFeed.bind(feedController));

export default router;