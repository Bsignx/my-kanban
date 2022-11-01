import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Button } from './shared/button';
import { Text } from './shared/text';

export const VoidBoard = () => {
  return (
    <Flex h="100%" flexDir="column" alignItems="center" justifyContent="center">
      <Text variant="h3" color="dark.10" mb="7">
        This board is empty. Create a new column to get started.
      </Text>

      <Button onClick={() => alert('clicked')} maxW="160px">
        + Add New Column
      </Button>
    </Flex>
  );
};
