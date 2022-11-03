import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useKanban } from '../contexts/kanban-context';

import { Subtask, Task } from '../types/domain';
import { trpc } from '../utils/trpc';
import { Checkbox } from './shared/checkbox';
import { Modal } from './shared/modal';
import { Select } from './shared/select';
import { Text } from './shared/text';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  subtasks?: Subtask[];
  checkedItems: boolean[];
  subtasksProgressMessage: string;
};

export const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  subtasks = [],
  checkedItems,
  subtasksProgressMessage,
}: Props) => {
  const { invalidate } = trpc.useContext();

  const { statusesByBoardIdData } = useKanban();

  const { mutate: updateTaskStatus } =
    trpc.kanban.updateTaskStatus.useMutation();
  const { mutate: updateSubtask } = trpc.kanban.updateSubtask.useMutation({
    onSuccess: () => {
      invalidate();
    },
  });

  const [currentStatus, setCurrentStatus] = useState(task.status);

  const handleSubtaskChange = ({
    isDone,
    subtaskId,
  }: {
    subtaskId: number;
    isDone: boolean;
  }) => {
    try {
      updateSubtask({
        id: subtaskId,
        isDone,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskStatusChange = (status: string) => {
    try {
      setCurrentStatus(status);

      updateTaskStatus({
        id: task.id,
        status,
      });
    } catch (error) {
      setCurrentStatus(task.status);
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    invalidate();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} title={task.title}>
      <Text variant="p" fontSize="sm" color="dark.10" fontWeight="500">
        {task.description}
      </Text>
      <Text
        variant="p"
        fontSize="sm"
        mt="5"
        mb="4"
        color="light.100"
        fontWeight="700"
      >
        {subtasksProgressMessage}
      </Text>
      {subtasks?.map((subtask, index) => (
        <Box bgColor="dark.300" mb="2" p="2" borderRadius="sm">
          <Checkbox
            key={subtask.id}
            _checked={{
              color: 'dark.10',
              textDecoration: 'line-through',
            }}
            isChecked={
              checkedItems[index] !== undefined ? checkedItems[index] : false
            }
            onChange={(e) =>
              handleSubtaskChange({
                isDone: e.target.checked,
                subtaskId: subtask.id,
              })
            }
          >
            {subtask.title}
          </Checkbox>
        </Box>
      ))}
      <Select
        label="Current Status"
        mb="4"
        value={currentStatus}
        onChange={(e) => handleTaskStatusChange(e.target.value)}
      >
        {statusesByBoardIdData?.map((status) => (
          <option key={status.id} value={status.title}>
            {status.title}
          </option>
        ))}
      </Select>
    </Modal>
  );
};
