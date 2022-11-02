import { useEffect } from 'react';
import { ChakraProps, Flex, useDisclosure, VStack } from '@chakra-ui/react';

import { useKanban } from '../contexts/kanban-context';
import { Board } from '../types/domain';
import { Text } from './shared/text';
import { BoardListItem } from './board-list-item';
import { NewBoardModal } from './new-board-modal';

type Props = {
  containerProps?: ChakraProps;
};

export const BoardList = ({ containerProps }: Props) => {
  const { boards, updateActiveBoard, activeBoard } = useKanban();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBoardClick = (board: Board) => {
    updateActiveBoard(board);
  };

  useEffect(() => {
    const firstBoard = boards?.[0];

    if (firstBoard) {
      updateActiveBoard(firstBoard);
    }
  }, [boards?.length]);

  return (
    <>
      <Flex {...containerProps} flexDir="column">
        <Text variant="h2" textTransform="uppercase" color="dark.10">
          all boards (1)
        </Text>
        <VStack alignItems="start" pt="8" spacing="6">
          {boards?.map((board) => (
            <BoardListItem
              key={board.id}
              name={board.title}
              active={activeBoard?.id === board.id}
              onClick={() => handleBoardClick(board)}
            />
          ))}
          <BoardListItem
            name="+ Create New Board"
            isNewBoard
            onClick={onOpen}
          />
        </VStack>
      </Flex>
      <NewBoardModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
