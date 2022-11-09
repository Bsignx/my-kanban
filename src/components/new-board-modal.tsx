import { useColorModeValue } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

import { trpc } from '../utils/trpc';
import { Button } from './shared/button';
import { Modal } from './shared/modal';
import { TextField } from './shared/text-field';

import { BoardColumnsEditor } from './board-columns-editor';

const initialBoardState = {
  title: '',
  columns: ['To Do', 'In Progress', 'Done'],
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewBoardModal = ({ isOpen, onClose }: Props) => {
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
        <BoardColumnsEditor
          columns={boardForm?.columns || []}
          onAddColumn={handleAddColumn}
          onColumnChange={handleColumnChange}
          onRemoveColumn={handleRemoveColumn}
        />
        <Button type="submit" w="100%" mb="4">
          Create New Board
        </Button>
      </form>
    </Modal>
  );
};
