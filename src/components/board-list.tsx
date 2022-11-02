import { FormEvent, useEffect, useState } from 'react';
import {
  Box,
  ChakraProps,
  Flex,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { useKanban } from '../contexts/kanban-context';
import { trpc } from '../utils/trpc';
import { Board } from '../types/domain';
import { Text } from './shared/text';
import { Modal } from './shared/modal';
import { TextField } from './shared/text-field';
import { Button } from './shared/button';

import { Board as BoardIcon } from './shared/svgs/board';
import { Close as CloseIcon } from './shared/svgs/close';

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
            <BoardItem
              key={board.id}
              name={board.title}
              active={activeBoard?.id === board.id}
              onClick={() => handleBoardClick(board)}
            />
          ))}
          <BoardItem name="+ Create New Board" isNewBoard onClick={onOpen} />
        </VStack>
      </Flex>
      <NewBoardModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const initialBoardState = {
  title: '',
  columns: ['To Do', 'In Progress', 'Done'],
};

const NewBoardModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const utils = trpc.useContext();

  const { mutateAsync: createBoard } = trpc.kanban.createBoard.useMutation();
  const { mutate: createStatuses } = trpc.kanban.createStatuses.useMutation();

  const [boardForm, setBoardForm] = useState<{
    title: string;
    columns: string[];
  }>(initialBoardState);

  const handleAddColumn = () => {
    setBoardForm((prev) => ({
      ...prev,
      columns: [...prev.columns, ''],
    }));
  };

  const handleColumnChange = ({
    columnIndex,
    value,
  }: {
    value: string;
    columnIndex: number;
  }) => {
    const newColumns = [...boardForm.columns];
    newColumns[columnIndex] = value;

    setBoardForm({
      ...boardForm,
      columns: newColumns,
    });
  };

  const handleRemoveColumn = (index: number) => {
    const columns = boardForm.columns?.filter((_, i) => i !== index);
    setBoardForm((prev) => ({ ...prev, columns }));
  };

  const handleBoardFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasColumnsContent = boardForm.columns?.every(
      (column) => column.trim().length > 0
    );

    const isFilledForm =
      boardForm.title &&
      boardForm?.columns &&
      boardForm.columns.length > 0 &&
      hasColumnsContent;

    if (!isFilledForm) return;

    try {
      const createdBoard = await createBoard({ title: boardForm.title });

      for (const column of boardForm.columns) {
        createStatuses({
          boardId: createdBoard.id,
          title: column,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      utils.invalidate();
      setBoardForm(initialBoardState);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Board">
      <form onSubmit={handleBoardFormSubmit}>
        <TextField
          onChange={(value: string) =>
            setBoardForm((prev) => ({ ...prev, title: value }))
          }
          value={boardForm?.title || ''}
          label="Board Name"
          placeholder="e.g. Web Design"
        />

        <Text fontSize="sm" fontWeight="700" mt="6" mb="2">
          Board Columns
        </Text>
        {boardForm?.columns?.map((column, index) => (
          <Flex mb="4">
            <TextField
              value={column}
              onChange={(value: string) =>
                handleColumnChange({ value, columnIndex: index })
              }
            />

            <Box
              as="button"
              ml="4"
              aria-label="Remove column"
              onClick={() => handleRemoveColumn(index)}
            >
              <CloseIcon
                fill="dark.10"
                _hover={{
                  fill: 'secondary',
                }}
              />
            </Box>
          </Flex>
        ))}

        <Button
          type="button"
          w="100%"
          mb="4"
          variant="secondary"
          onClick={handleAddColumn}
        >
          + Add New Column
        </Button>
        <Button type="submit" w="100%" mb="4">
          Create New Board
        </Button>
      </form>
    </Modal>
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
