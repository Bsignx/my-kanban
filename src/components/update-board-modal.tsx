import { useEffect, useState } from 'react';

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
  const { invalidate } = trpc.useContext();

  const { canCreateStatus } = useKanban();

  const commonUseMutationOptions = {
    onSuccess: () => {
      invalidate();
    },
  };

  const { mutate: updateBoard } = trpc.kanban.updateBoard.useMutation(
    commonUseMutationOptions
  );
  const { mutateAsync: updateStatus } = trpc.kanban.updateStatus.useMutation(
    commonUseMutationOptions
  );
  const { mutateAsync: createStatus } = trpc.kanban.createStatus.useMutation(
    commonUseMutationOptions
  );
  const { mutateAsync: deleteStatus } = trpc.kanban.deleteStatus.useMutation(
    commonUseMutationOptions
  );

  const { activeBoard, statusesByBoardIdData } = useKanban();

  const statuses = statusesByBoardIdData.map((status) => ({
    id: status.id,
    title: status.title,
  }));

  const initialFormData: FormDataState = {
    title: activeBoard?.title || '',
    columns: statuses,
  };

  const [formData, setFormData] = useState<FormDataState>(initialFormData);

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

    try {
      const shouldUpdate =
        formData.title && formData.columns.length > 0 && activeBoard?.id;

      if (!shouldUpdate) return;

      updateBoard({
        id: activeBoard?.id,
        title: formData.title,
      });

      formData.columns.forEach(async (updatedStatus) => {
        const oldStatus = statusesByBoardIdData.find(
          (status) =>
            status.id === updatedStatus.id && status.boardId === activeBoard?.id
        );

        if (!canCreateStatus) return;

        if (oldStatus && oldStatus?.id) {
          await updateStatus({
            id: oldStatus.id,
            title: updatedStatus.title,
          });
        } else {
          await createStatus({
            title: updatedStatus.title,
            boardId: activeBoard?.id,
          });
        }
      });

      const formDataStatusIds = formData.columns.map((column) => column.id);

      const statusToDelete = statusesByBoardIdData.filter(
        (status) =>
          !formDataStatusIds.includes(status.id) &&
          status.boardId === activeBoard?.id
      );

      statusToDelete.forEach(async (status) => {
        if (!status.id) return;

        await deleteStatus({ id: status.id });
      });
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, [activeBoard?.title]);

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
