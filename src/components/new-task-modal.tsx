import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

import { useKanban } from '../contexts/kanban-context';
import { Button } from './shared/button';
import { Modal } from './shared/modal';
import { Select } from './shared/select';
import { TextField } from './shared/text-field';

import { Close as CloseIcon } from './shared/svgs/close';
import { trpc } from '../utils/trpc';

type TaskState = {
  title?: string;
  description?: string;
  status?: string;
};

export type SubtasksState = {
  title: string;
}[];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewTaskModal = ({ isOpen, onClose }: Props) => {
  const labelColor = useColorModeValue('dark.10', 'light.100');

  const { invalidate } = trpc.useContext();

  const { mutateAsync: createTask } = trpc.kanban.createTask.useMutation();
  const { mutate: createSubtask } = trpc.kanban.createSubtask.useMutation();

  const { statusesByBoardIdData, activeBoard } = useKanban();
  console.log(statusesByBoardIdData);
  const [task, setTask] = useState<TaskState>({});
  const [subtasks, setSubtasks] = useState<SubtasksState>([{ title: '' }]);
  const [currentStatus, setCurrentStatus] = useState<string>(
    statusesByBoardIdData[0]?.title || ''
  );

  const resetForm = () => {
    setTask({ title: '', description: '', status: '' });
    setSubtasks([{ title: '' }]);
    setCurrentStatus(statusesByBoardIdData[0]?.title || '');
  };

  const handleSubmmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // todo: add alert for empty fields
    if (!task?.title || !task?.description || !activeBoard?.id) return;

    const newTask = await createTask({
      title: task.title,
      description: task.description,
      status: currentStatus,
      boardId: activeBoard?.id,
    });

    subtasks.forEach((subtask) => {
      if (!subtask.title) return;

      createSubtask({
        title: subtask.title,
        taskId: newTask.id,
      });
    });

    resetForm();
    invalidate();
  };

  const handleSubtaskChange = ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { title: value };
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubtask = (index: number) => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks((prev) => [...prev, { title: '' }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmmit}>
        <TextField
          label="Title"
          placeholder="e.g. Take coffee break"
          mb="5"
          value={task?.title || ''}
          onChange={(value) => setTask({ ...task, title: value })}
        />
        <TextField
          as="textarea"
          height="120px"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          label="Description"
          mb="5"
          value={task?.description || ''}
          onChange={(value) => setTask({ ...task, description: value })}
        />

        <Text fontSize="small" fontWeight="700" mb="2" color={labelColor}>
          Subtasks
        </Text>
        {subtasks.map((subtask, index) => (
          <Flex mb="4">
            <TextField
              key={index}
              value={subtask.title}
              placeholder="e.g. Make coffee"
              onChange={(value: string) =>
                handleSubtaskChange({ value, index })
              }
            />

            <Box
              as="button"
              ml="4"
              aria-label="Remove column"
              onClick={() => handleRemoveSubtask(index)}
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
          mb="5"
          variant="secondary"
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </Button>

        <Select
          label="Status"
          mb="4"
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
        >
          {statusesByBoardIdData?.map((status) => (
            <option key={status.id} value={status.title}>
              {status.title}
            </option>
          ))}
        </Select>
        <Button type="submit" w="100%" mb="4">
          Create Task
        </Button>
      </form>
    </Modal>
  );
};
