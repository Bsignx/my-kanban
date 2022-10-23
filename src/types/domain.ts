export type Board = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  boardId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Subtask = {
  id: number;
  title: string;
  taskId: number;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Status = {
  id: number;
  title: string;
  boardId: number;
  createdAt: Date;
  updatedAt: Date;
};
