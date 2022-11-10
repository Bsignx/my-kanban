import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import { Text } from './shared/text';
import { UpdateBoardModal } from './update-board-modal';

export const BoardNewColumn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue(
    'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)',
    'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)'
  );

  return (
    <>
      <Box
        onClick={onOpen}
        as="button"
        minH="90%"
        width="280px"
        borderRadius="6px"
        flexShrink={0}
        bg={bgColor}
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
