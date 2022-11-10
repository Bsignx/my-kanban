import { useEffect } from 'react';
import { ChakraProps, Flex, useDisclosure, VStack } from '@chakra-ui/react';

import { useKanban } from '../contexts/kanban-context';
import { Board } from '../types/domain';
import { Text } from './shared/text';
import { SideMenuListItem } from './side-menu-list-item';
import { NewBoardModal } from './new-board-modal';

type Props = {
  containerProps?: ChakraProps;
};

export const SideMenuList = ({ containerProps }: Props) => {
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

  const boardsQuantity = boards?.length;

  return (
    <>
      <Flex {...containerProps} flexDir="column">
        <Text variant="h2" textTransform="uppercase" color="dark.10">
          all boards ({boardsQuantity})
        </Text>
        <VStack alignItems="start" pt="8" spacing="6">
          {boards?.map((board) => (
            <SideMenuListItem
              key={board.id}
              name={board.title}
              active={activeBoard?.id === board.id}
              onClick={() => handleBoardClick(board)}
            />
          ))}
          <SideMenuListItem
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
