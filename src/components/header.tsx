import { Heading, Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { Button } from './shared/button';

export const Header = () => {
  const headingColor = useColorModeValue('dark.200', 'light.100');
  const headerBgColor = useColorModeValue('light.100', 'dark.100');
  const headerBorderColor = useColorModeValue('light.300', 'dark.50');

  return (
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
        <Heading fontWeight="700" color={headingColor} fontSize="3xl">
          Platform Launch
        </Heading>
        <Button onClick={() => alert('clicked')} disabled>
          + Add New Task
        </Button>
      </Flex>
    </Box>
  );
};
