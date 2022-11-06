import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

import { trpc } from '../utils/trpc';
import { Button } from './shared/button';
import { Modal } from './shared/modal';
import { TextField } from './shared/text-field';

import { Close as CloseIcon } from './shared/svgs/close';

const initialBoardState = {
  title: '',
  columns: ['To Do', 'In Progress', 'Done'],
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewBoardModal = ({ isOpen, onClose }: Props) => {
  const labelColor = useColorModeValue('dark.10', 'light.100');

  const utils = trpc.useContext();

  const { mutateAsync: createBoard } = trpc.kanban.createBoard.useMutation();
  const { mutate: createStatus } = trpc.kanban.createStatus.useMutation();

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
        createStatus({
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

        <Text
          fontSize="small"
          fontWeight="700"
          mt="6"
          mb="2"
          color={labelColor}
        >
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
