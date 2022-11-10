import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  HStack,
} from '@chakra-ui/react';

import { Button } from './shared/button';
import { useKanban } from '../contexts/kanban-context';
import { trpc } from '../utils/trpc';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteBoardDialog = ({ isOpen, onClose }: Props) => {
  const { activeBoard, statusesByBoardIdData } = useKanban();

  const { invalidate } = trpc.useContext();

  const { data: tasks } = trpc.kanban.getTasksByBoardId.useQuery(
    {
      boardId: activeBoard?.id || 0,
    },
    {
      enabled: !!activeBoard?.id,
    }
  );
  const { mutateAsync: deleteBoard } = trpc.kanban.deleteBoard.useMutation({
    onSuccess: () => {
      invalidate();
    },
  });
  const { mutateAsync: deleteStatus } = trpc.kanban.deleteStatus.useMutation();
  const { mutateAsync: deleteTask } = trpc.kanban.deleteTask.useMutation();
  const { mutateAsync: deleteSubtasksByTaskId } =
    trpc.kanban.deleteSubtasksByTaskId.useMutation();

  const cancelRef = useRef(null);

  const handleDeleteBoard = () => {
    if (!activeBoard) return;

    try {
      // * board
      deleteBoard(activeBoard.id);

      // * all statuses
      statusesByBoardIdData?.forEach((status) => {
        deleteStatus({ id: status.id });
      });

      // * all subtasks
      tasks?.forEach((task) => {
        deleteSubtasksByTaskId(task.id);
      });

      // * all tasks
      tasks?.forEach((task) => {
        deleteTask({ taskId: task.id });
      });
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent p="16px 8px">
          <AlertDialogHeader fontSize="xl" fontWeight="bold" color="red.400">
            Delete this board?
          </AlertDialogHeader>
          <AlertDialogBody color="dark.10" fontWeight="medium" fontSize="md">
            Are you sure you want to delete the ‘{activeBoard?.title}’ board?
            This action will remove all columns and tasks and cannot be
            reversed.
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack w="full" spacing="4">
              <Button
                onClick={handleDeleteBoard}
                w="100%"
                bgColor="red.400"
                _hover={{
                  bgColor: 'red.300',
                }}
              >
                Delete
              </Button>
              <Button w="100%" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
