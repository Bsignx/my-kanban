import { useEffect } from 'react';
import { ChakraProps, Flex, VStack } from '@chakra-ui/react';

import { useKanban } from '../contexts/kanban-context';
import { Text } from './shared/text';
import { Board } from '../types/domain';
import { Board as BoardIcon } from './shared/svgs/board';

type Props = {
  containerProps?: ChakraProps;
};

export const BoardList = ({ containerProps }: Props) => {
  const { boards, updateActiveBoard, activeBoard } = useKanban();

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
    <Flex {...containerProps} flexDir="column">
      <Text variant="h2" textTransform="uppercase" color="dark.10">
        all boards (1)
      </Text>
      <VStack alignItems="start" pt="8" spacing="6">
        {boards?.slice(0, 3).map((board) => (
          <BoardItem
            key={board.id}
            name={board.title}
            active={activeBoard?.id === board.id}
            onClick={() => handleBoardClick(board)}
          />
        ))}
        <BoardItem name="+ Create New Board" isNewBoard />
      </VStack>
    </Flex>
  );
};

const BoardItem = ({
  name,
  active,
  isNewBoard,
  onClick,
}: {
  name: string;
  active?: boolean;
  isNewBoard?: boolean;
  onClick?: () => void;
}) => (
  <Flex
    onClick={onClick}
    as="button"
    color={isNewBoard ? 'primary' : `${active ? 'light.100' : 'dark.10'}`}
    alignItems="center"
    cursor="pointer"
    _hover={{
      color: active ? 'light.300' : 'secondary',
    }}
    _before={{
      content: '""',
      bgColor: active ? 'primary' : 'transparent',
      position: 'absolute',
      zIndex: -1,
      left: '0',
      w: '240px',
      h: '48px',
      borderRadius: '0 50px 50px 0',
    }}
  >
    <BoardIcon color="inherit" />
    <Text variant="p" fontWeight="700" color="inherit" ml="4">
      {name}
    </Text>
  </Flex>
);
