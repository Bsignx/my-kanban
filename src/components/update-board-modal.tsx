import { useState } from 'react';

import { useKanban } from '../contexts/kanban-context';
import { trpc } from '../utils/trpc';
import { BoardColumnsEditor } from './board-columns-editor';
import { Button } from './shared/button';
import { Modal } from './shared/modal';
import { TextField } from './shared/text-field';

type FormDataState = {
  title: string;
  columns: {
    title: string;
    id?: number;
  }[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const UpdateBoardModal = ({ isOpen, onClose }: Props) => {
  const { mutate: updateBoard } = trpc.kanban.updateBoard.useMutation();
  const { mutate: updateStatus } = trpc.kanban.updateStatus.useMutation();
  const { mutate: createStatus } = trpc.kanban.createStatus.useMutation();

  const { activeBoard, statusesByBoardIdData } = useKanban();

  const statuses = statusesByBoardIdData.map((status) => ({
    id: status.id,
    title: status.title,
  }));

  const [formData, setFormData] = useState<FormDataState>({
    title: activeBoard?.title || '',
    columns: statuses,
  });

  const statusTitles = formData.columns.map((column) => column.title);

  const handleAddColumn = () => {
    setFormData((prev) => ({
      ...prev,
      columns: [
        ...prev.columns,
        {
          title: '',
        },
      ],
    }));
  };

  const handleRemoveColumn = (index: number) => {
    const columns = formData.columns?.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, columns }));
  };

  const handleColumnChange = ({
    columnIndex,
    value,
  }: {
    value: string;
    columnIndex: number;
  }) => {
    const newColumns = [...formData.columns];

    const changedColumn = newColumns[columnIndex];

    if (!changedColumn) return;

    changedColumn.title = value;

    setFormData((prev) => ({
      ...prev,
      columns: newColumns,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const shouldUpdate =
      formData.title && formData.columns.length > 0 && activeBoard?.id;

    if (!shouldUpdate) return;

    updateBoard({
      id: activeBoard?.id,
      title: formData.title,
    });

    formData.columns.forEach((updatedStatus) => {
      const oldStatus = statusesByBoardIdData.find(
        (status) =>
          status.id === updatedStatus.id && status.boardId === activeBoard?.id
      );

      if (oldStatus && oldStatus?.id) {
        updateStatus({
          id: oldStatus.id,
          title: updatedStatus.title,
        });
      } else {
        createStatus({
          title: updatedStatus.title,
          boardId: activeBoard?.id,
        });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Board">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Board Name"
          placeholder="e.g. Take coffee break"
          value={formData.title || ''}
          onChange={(value) => setFormData({ ...formData, title: value })}
        />
        <BoardColumnsEditor
          columns={statusTitles}
          onAddColumn={handleAddColumn}
          onColumnChange={handleColumnChange}
          onRemoveColumn={handleRemoveColumn}
        />
        <Button type="submit" w="100%" mb="4">
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};
