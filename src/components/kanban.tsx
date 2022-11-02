import { Box, HStack } from '@chakra-ui/react';

import { useKanban } from '../contexts/kanban-context';
import { Task } from '../types/domain';
import { BoardColumn } from './board-column';
import { VoidBoard } from './void-board';

export const Kanban = () => {
  const { tasksByStatus } = useKanban();

  const isFilled = Object.keys(tasksByStatus).length > 0;

  return (
    <Box p="6">
      {isFilled ? <FilledBoard tasksByStatus={tasksByStatus} /> : <VoidBoard />}
    </Box>
  );
};

const FilledBoard = ({
  tasksByStatus,
}: {
  tasksByStatus: Record<string, Task[]>;
}) => {
  return (
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
  );
};
