import { HStack } from '@chakra-ui/react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Task } from '../types/domain';
import { trpc } from '../utils/trpc';
import { BoardColumn } from './board-column';
import { BoardNewColumn } from './board-new-column';

type Props = {
  tasksByStatus: Record<string, Task[]>;
  activeBoardId?: number;
};

export const FilledBoard = ({ tasksByStatus, activeBoardId }: Props) => {
  const { invalidate } = trpc.useContext();

  const queryClient = useQueryClient();

  const { mutateAsync: updateTaskStatus } =
    trpc.kanban.updateTaskStatus.useMutation();

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId || !activeBoardId)
      return;

    const taskId = Number(draggableId);
    const taskStatus = destination.droppableId;

    try {
      queryClient.setQueryData(
        [['kanban', 'getTasksByBoardId'], { boardId: activeBoardId }],
        (oldData: Task[] | undefined) => {
          const optimisticData = oldData?.map((subtask) => {
            if (subtask.id === taskId) {
              return {
                ...subtask,
                status: taskStatus,
              };
            }

            return subtask;
          });

          return optimisticData;
        }
      );

      await updateTaskStatus({
        id: taskId,
        status: taskStatus,
      });
    } catch (error) {
      console.error(error);
    } finally {
      invalidate();
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <HStack
        spacing="6"
        overflow="auto"
        w="100%"
        h="100%"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
            borderRadius: '8px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(43, 44, 55, 0.6)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'darkgray',
          },
        }}
      >
        {Object.entries(tasksByStatus).map(([status, tasks], index) => (
          <BoardColumn
            key={`${status}-${index}`}
            index={index}
            boardTitle={status}
            tasks={tasks}
          />
        ))}
        <BoardNewColumn />
      </HStack>
    </DragDropContext>
  );
};
