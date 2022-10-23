import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { Button } from './shared/button';

export const Kanban = () => {
  return <VoidKanban />;
};

const VoidKanban = () => {
  const kanbanBgColor = useColorModeValue('light.200', 'dark.300');

  return (
    <Flex
      h="100%"
      bg={kanbanBgColor}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontWeight="bold" color="dark.10" fontSize="lg" mb="7">
        This board is empty. Create a new column to get started.
      </Text>

      <Button onClick={() => alert('clicked')} maxW="140px">
        + Add New Column
      </Button>
    </Flex>
  );
};
