import { Box, VStack } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';

import { Task } from '../types/domain';
import { BoardTask } from './board-task';
import { Text } from './shared/text';

const boardColors = [
  '#49C4E5',
  '#8471F2',
  '#67E2AE',
  '#F2C94C',
  '#F2994A',
  '#EB5757',
  '#9B51E0',
  '#2F80ED',
];

export const BoardColumn = ({
  boardTitle,
  tasks,
  index,
}: {
  index: number;
  boardTitle: string;
  tasks: Task[];
}) => (
  <Box>
    <Text
      variant="h2"
      textTransform="uppercase"
      color="dark.10"
      mb="6"
      _before={{
        content: '""',
        w: '15px',
        h: '15px',
        borderRadius: '50%',
        bgColor: `${boardColors[index]}`,
        display: 'inline-block',
        mr: '2',
        position: 'relative',
        top: '2px',
      }}
    >
      {boardTitle} ({tasks.length})
    </Text>
    <Droppable droppableId={boardTitle}>
      {(provided) => (
        <VStack
          alignItems="start"
          w="280px"
          spacing="5"
          h="100%"
          minH="50vh"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <BoardTask key={task.id.toString()} task={task} index={index} />
          ))}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  </Box>
);
