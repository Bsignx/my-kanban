// src/server/router/_app.ts
import { router } from '../trpc';

import { exampleRouter } from './example';
import { kanbanRouter } from './kanban';

export const appRouter = router({
  example: exampleRouter,
  kanban: kanbanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
