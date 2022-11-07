import { HStack } from '@chakra-ui/react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Task } from '../types/domain';
import { trpc } from '../utils/trpc';
import { BoardColumn } from './board-column';

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
    console.log(result);
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
      <HStack spacing="6" overflow="auto" maxW="77vw" alignItems="start">
        {Object.entries(tasksByStatus).map(([status, tasks], index) => (
          <BoardColumn
            key={`${status}-${index}`}
            index={index}
            boardTitle={status}
            tasks={tasks}
          />
        ))}
      </HStack>
    </DragDropContext>
  );
};
