// src/server/router/_app.ts
import { router } from '../trpc';

import { kanbanRouter } from './kanban';

export const appRouter = router({
  kanban: kanbanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
