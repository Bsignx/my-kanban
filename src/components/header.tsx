import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { DeleteBoardDialog } from './delete-board-dialog';
import { NewTaskModal } from './new-task-modal';
import { Button } from './shared/button';
import { MoreOptionsMenu } from './shared/more-options-menu';
import { Text } from './shared/text';
import { UpdateBoardModal } from './update-board-modal';

export const Header = () => {
  const headingColor = useColorModeValue('dark.200', 'light.100');
  const headerBgColor = useColorModeValue('light.100', 'dark.100');
  const headerBorderColor = useColorModeValue('light.300', 'dark.50');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMoreOptions,
    onOpen: onOpenMoreOptions,
    onClose: onCloseMoreOptions,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteBoardDialog,
    onOpen: onOpenDeleteBoardDialog,
    onClose: onCloseDeleteBoardDialog,
  } = useDisclosure();

  const handleClickAddTask = () => {
    onOpen();
  };

  const moreOptions = [
    {
      label: 'Edit board',
      onClick: () => onOpenMoreOptions(),
    },
    {
      label: 'Delete board',
      onClick: () => onOpenDeleteBoardDialog(),
      color: 'red.400',
    },
  ];

  return (
    <>
      <Box
        as="header"
        bgColor={headerBgColor}
        w="100%"
        h="100%"
        p="6"
        borderBottom="1px solid"
        borderColor={headerBorderColor}
      >
        <Flex alignItems="center" justifyContent="space-between" h="100%">
          <Text variant="h1" color={headingColor} fontSize="2xl">
            Platform Launch
          </Text>
          <HStack spacing="2">
            <Button onClick={handleClickAddTask}>+ Add New Task</Button>
            <MoreOptionsMenu options={moreOptions} />
          </HStack>
        </Flex>
      </Box>
      <NewTaskModal isOpen={isOpen} onClose={onClose} />
      <UpdateBoardModal
        isOpen={isOpenMoreOptions}
        onClose={onCloseMoreOptions}
      />
      <DeleteBoardDialog
        isOpen={isOpenDeleteBoardDialog}
        onClose={onCloseDeleteBoardDialog}
      />
    </>
  );
};
