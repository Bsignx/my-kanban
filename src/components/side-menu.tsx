import { Flex, Box, useColorModeValue, useColorMode } from '@chakra-ui/react';

import { SideMenuList } from './side-menu-list';
import { SideMenuControls } from './side-menu-controls';

import { Logo } from './shared/icons/logo';
import { ShowSideMenuButton } from './show-side-menu-button';

type Props = {
  onClick: () => void;
  isHidden: boolean;
};

export const SideMenu = ({ onClick, isHidden }: Props) => {
  const { colorMode } = useColorMode();

  const sideMenuBgColor = useColorModeValue('light.100', 'dark.100');
  const sideMenuBorderColor = useColorModeValue('light.300', 'dark.50');

  return (
    <Box as="aside">
      {isHidden && <ShowSideMenuButton onClick={onClick} />}
      <Box
        p="9"
        borderRight="1px solid"
        borderBottom={isHidden ? '1px solid' : 'none'}
        borderColor={sideMenuBorderColor}
        bgColor={sideMenuBgColor}
        height="100px"
      >
        <Logo theme={colorMode} />
      </Box>
      <Box
        aria-hidden={isHidden}
        transform={isHidden ? 'translateX(-300px)' : 'translateX(0)'}
        transition="transform 0.3s ease-in-out"
        height="calc(100vh - 100px)"
        bgColor={sideMenuBgColor}
        borderRight="1px solid"
        borderColor={sideMenuBorderColor}
        p="7"
        pl="9"
        pt="2"
      >
        <Flex
          display={isHidden ? 'none' : 'flex'}
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <SideMenuList />

          <SideMenuControls onClick={onClick} />
        </Flex>
      </Box>
    </Box>
  );
};
