import { Box, useDisclosure, VStack } from '@chakra-ui/react';

import { Task } from '../types/domain';
import { BoardColumnTask } from './board-column-task';
import { Modal } from './shared/modal';
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
}) => {
  return (
    <>
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
        <VStack alignItems="start" w="280px" spacing="5">
          {tasks.map((task) => (
            <BoardColumnTask key={task.id} task={task} />
          ))}
        </VStack>
      </Box>
    </>
  );
};
