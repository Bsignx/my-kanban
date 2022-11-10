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
  updateBoard: publicProcedure
    .input(z.object({ id: z.number(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.board.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),
  deleteBoard: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.board.delete({
      where: {
        id: input,
      },
    });
  }),
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  getTasksByBoardId: publicProcedure
    .input(z.object({ boardId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          boardId: input.boardId,
        },
      });
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
  deleteTask: publicProcedure
    .input(z.object({ taskId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),
  updateTaskStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),
  getSubtasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subtask.findMany();
  }),
  getSubtasksByTaskId: publicProcedure
    .input(z.object({ taskId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.subtask.findMany({
        where: {
          taskId: input.taskId,
        },
      });
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
  updateSubtask: publicProcedure
    .input(z.object({ id: z.number(), isDone: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subtask.update({
        where: {
          id: input.id,
        },
        data: {
          isDone: input.isDone,
        },
      });
    }),
  deleteSubtasksByTaskId: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subtask.deleteMany({
        where: {
          taskId: input,
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
  createStatus: publicProcedure
    .input(z.object({ boardId: z.number(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.status.create({
        data: {
          ...input,
        },
      });
    }),
  updateStatus: publicProcedure
    .input(z.object({ id: z.number(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.status.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),
  deleteStatus: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.status.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
