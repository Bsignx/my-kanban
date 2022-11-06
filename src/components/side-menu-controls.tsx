import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';

import { Hide as HideIcon } from './shared/icons/hide';
import { Text } from './shared/text';
import { ThemeSwitcher } from './theme-switcher';

type Props = {
  onClick: () => void;
};

export const SideMenuControls = ({ onClick }: Props) => {
  const themeSwitcherBgColor = useColorModeValue('light.300', 'dark.300');

  return (
    <Box>
      <Flex
        justifyContent="center"
        bgColor={themeSwitcherBgColor}
        h="48px"
        borderRadius="6px"
        mb="6"
      >
        <ThemeSwitcher />
      </Flex>
      <HStack
        onClick={onClick}
        as="button"
        color="dark.10"
        _hover={{
          color: 'secondary',
        }}
        aria-label="Hide side menu"
      >
        <HideIcon />
        <Text fontWeight="700" color="inherit" ml="5">
          Hide Sidebar
        </Text>
      </HStack>
    </Box>
  );
};
