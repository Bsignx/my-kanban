import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const kanbanRouter = router({
  getBoards: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany();
  }),
  createBoard: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.board.create({
        data: {
          ...input,
        },
      });
    }),
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        boardId: z.number(),
        status: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          ...input,
        },
      });
    }),
  getSubtasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subtask.findMany();
  }),
  createSubtask: publicProcedure
    .input(z.object({ title: z.string(), taskId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subtask.create({
        data: {
          ...input,
          isDone: false,
        },
      });
    }),
  getStatusesByBoardId: publicProcedure
    .input(z.object({ boardId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.status.findMany({
        where: {
          boardId: input.boardId,
        },
      });
    }),
  createStatuses: publicProcedure
    .input(z.object({ boardId: z.number(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.status.createMany({
        data: [
          {
            title: input.title,
            boardId: input.boardId,
          },
          {
            title: input.title,
            boardId: input.boardId,
          },
          {
            title: input.title,
            boardId: input.boardId,
          },
        ],
      });
    }),
});
