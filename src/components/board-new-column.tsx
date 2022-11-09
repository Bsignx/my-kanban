import { Box, useDisclosure } from '@chakra-ui/react';

import { Text } from './shared/text';
import { UpdateBoardModal } from './update-board-modal';

export const BoardNewColumn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        as="button"
        minH="90%"
        width="280px"
        borderRadius="6px"
        flexShrink={0}
        bg="linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)"
        _hover={{
          h3: {
            color: 'var(--chakra-colors-primary)',
          },
        }}
      >
        <Text variant="h3" color="dark.10">
          + New Column
        </Text>
      </Box>
      <UpdateBoardModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
