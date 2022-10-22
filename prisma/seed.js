const { PrismaClient } = require('@prisma/client');
const { boards, statuses, subtasks, tasks } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.board.deleteMany();
    console.log('Deleted records in board table');

    await prisma.task.deleteMany();
    console.log('Deleted records in task table');

    await prisma.subtask.deleteMany();
    console.log('Deleted records in subtask table');

    await prisma.status.deleteMany();
    console.log('Deleted records in status table');

    await prisma.$queryRaw`ALTER TABLE Board AUTO_INCREMENT = 1`;
    console.log('reset board auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Task AUTO_INCREMENT = 1`;
    console.log('reset task auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Subtask AUTO_INCREMENT = 1`;
    console.log('reset subtask auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Status AUTO_INCREMENT = 1`;
    console.log('reset status auto increment to 1');

    await prisma.board.createMany({
      data: boards,
    });
    console.log('Added board data');

    await prisma.task.createMany({
      data: tasks,
    });
    console.log('Added task data');

    await prisma.subtask.createMany({
      data: subtasks,
    });
    console.log('Added subtask data');

    await prisma.status.createMany({
      data: statuses,
    });
    console.log('Added status data');

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
