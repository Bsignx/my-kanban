import { Flex, Box, useColorModeValue, useColorMode } from '@chakra-ui/react';

import { BoardList } from './board-list';
import { SideMenuControls } from './side-menu-controls';
import { ThemeSwitcher } from './theme-switcher';

import { Logo } from './shared/svgs/logo';
import { Show as ShowIcon } from './shared/svgs/show';

type Props = {
  onClick: () => void;
  isHidden: boolean;
};

export const SideMenu = ({ onClick, isHidden }: Props) => {
  const { colorMode } = useColorMode();

  const sideMenuBgColor = useColorModeValue('light.100', 'dark.100');
  const sideMenuBorderColor = useColorModeValue('light.300', 'dark.50');
  const themeSwitcherBgColor = useColorModeValue('light.300', 'dark.300');

  return (
    <Box as="aside">
      {isHidden && (
        <Box
          onClick={onClick}
          as="button"
          bgColor="primary"
          h="48px"
          w="56px"
          position="absolute"
          left="0"
          top="70%"
          borderRadius="0 50px 50px 0"
        >
          <ShowIcon
            boxSize={6}
            color="light.100"
            _hover={{
              color: 'light.300',
            }}
          />
        </Box>
      )}
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
          <BoardList />
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

            <SideMenuControls onClick={onClick} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
