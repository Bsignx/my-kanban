import { HStack } from '@chakra-ui/react';

import { Task } from '../types/domain';
import { BoardColumn } from './board-column';

type Props = {
  tasksByStatus: Record<string, Task[]>;
};

export const FilledBoard = ({ tasksByStatus }: Props) => (
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
