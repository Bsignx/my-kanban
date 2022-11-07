import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Task } from '../types/domain';
import { trpc } from '../utils/trpc';
import { Text } from './shared/text';
import { TaskDetailModal } from './task-detail-modal';

type Props = {
  task: Task;
  index: number;
};

export const BoardTask = ({ task, index }: Props) => {
  const taskBgColor = useColorModeValue('light.100', 'dark.100');
  const taskTitleColor = useColorModeValue('dark.200', 'light.100');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const { data: subtasks } = trpc.kanban.getSubtasksByTaskId.useQuery(
    {
      taskId: task.id,
    },
    {
      onSuccess: (subtasks) => {
        const checkedItems = subtasks.map((subtask) => subtask.isDone);
        setCheckedItems(checkedItems);
      },
    }
  );

  const completedSubtasks = subtasks?.filter((subtask) => subtask.isDone);
  const completedSubtasksCount = completedSubtasks?.length;
  const totalSubtasksCount = subtasks?.length;
  const subtasksProgressMessage = `Subtasks (${completedSubtasksCount} of ${totalSubtasksCount})`;

  const handleTaskClick = () => {
    onOpen();
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <Box
            onClick={handleTaskClick}
            px="4"
            py="6"
            cursor="pointer"
            bgColor={taskBgColor}
            borderRadius="8px"
            w="100%"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Text variant="h3" color={taskTitleColor} fontSize="md">
              {task.title}
            </Text>
            <Text
              variant="p"
              fontSize="sm"
              mt="2"
              color="dark.10"
              fontWeight="700"
            >
              {subtasksProgressMessage}
            </Text>
          </Box>
        )}
      </Draggable>
      <TaskDetailModal
        checkedItems={checkedItems}
        isOpen={isOpen}
        task={task}
        onClose={onClose}
        subtasks={subtasks}
        subtasksProgressMessage={subtasksProgressMessage}
      />
    </>
  );
};
