import { NextFunction, Request, Response, Router } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

export const apiRouter = Router();

apiRouter.get('/users', async (_request, response) => {
  response.json(await UserModel.find().sort({ username: 1 }));
});
apiRouter.post('/users', async (request, response) => {
  response.status(201).json(await UserModel.create(request.body));
});

apiRouter.get('/teams', async (_request, response) => {
  response.json(await TeamModel.find().sort({ name: 1 }));
});
apiRouter.post('/teams', async (request, response) => {
  response.status(201).json(await TeamModel.create(request.body));
});

apiRouter.get('/activities', async (_request, response) => {
  response.json(await ActivityModel.find().sort({ recordedAt: -1 }));
});
apiRouter.post('/activities', async (request, response) => {
  response.status(201).json(await ActivityModel.create(request.body));
});

apiRouter.get('/leaderboard', async (_request, response) => {
  response.json(await LeaderboardModel.find().sort({ rank: 1 }));
});

apiRouter.get('/workouts', async (_request, response) => {
  response.json(await WorkoutModel.find().sort({ title: 1 }));
});
apiRouter.post('/workouts', async (request, response) => {
  response.status(201).json(await WorkoutModel.create(request.body));
});

apiRouter.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : 'Request failed';
  response.status(400).json({ error: message });
});