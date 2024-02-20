
import express from 'express';
import CompaniesRouter from './http/routes/Companies';
import JobsRouter from './http/routes/Jobs';
import FeedRouter from './http/routes/Feed';
const app = express();

app.use('/companies', CompaniesRouter);
app.use('/job', JobsRouter);
app.use('/feed', FeedRouter);

export { app };
