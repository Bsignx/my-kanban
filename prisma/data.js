
const boards = [
    {
        title: 'Board 1',
    },
    {
        title: 'Board 2',
    },
    {
        title: 'Board 3',
    }
]

const tasks = [
    {
        title: 'Task 1',
        description: 'Task 1 description',
        boardId: 1,
    },
    {
        title: 'Task 2',
        description: 'Task 2 description',
        boardId: 1,
    },
    {
        title: 'Task 3',
        description: 'Task 3 description',
        boardId: 2,
    },
    {
        title: 'Task 4',
        description: 'Task 4 description',
        boardId: 2,
    },
    {
        title: 'Task 5',
        description: 'Task 5 description',
        boardId: 3,
    }
]

const subtasks = [
    {
        title: 'Subtask 1',
        isDone: false,
        taskId: 1,
    },
    {
        title: 'Subtask 2',
        isDone: false,
        taskId: 1,
    },
    {
        title: 'Subtask 3',
        isDone: false,
        taskId: 2,
    },
    {
        title: 'Subtask 4',
        isDone: false,
        taskId: 2,
    },
    {
        title: 'Subtask 5',
        isDone: false,
        taskId: 3,
    }
]

const statuses = [
    {
        title: 'To Do',
        boardId: 1,
    },
    {
        title: 'In Progress',
        boardId: 1,
    },
    {
        title: 'Done',
        boardId: 1,
    },
    {
        title: 'To Do',
        boardId: 2,
    },
    {
        title: 'In Progress',
        boardId: 2,
    },
    {
        title: 'Done',
        boardId: 2,
    },
    {
        title: 'To Do',
        boardId: 3,
    },
    {
        title: 'In Progress',
        boardId: 3,
    },
    {
        title: 'Done',
        boardId: 3,
    },
]

module.exports = {
    boards,
    tasks,
    subtasks,
    statuses
}

