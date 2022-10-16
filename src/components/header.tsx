import { Heading, Box, Flex } from '@chakra-ui/react';

import { Button } from './shared/button';

export const Header = () => {
  return (
    <Box
      as="header"
      bgColor="light.100"
      w="100%"
      h="100%"
      p="6"
      borderBottom="1px solid"
      borderColor="light.300"
    >
      <Flex alignItems="center" justifyContent="space-between" h="100%">
        <Heading fontWeight="700" color="dark.200" fontSize="3xl">
          Platform Launch
        </Heading>
        <Button onClick={() => alert('clicked')} disabled>
          + Add New Task
        </Button>
      </Flex>
    </Box>
  );
};
