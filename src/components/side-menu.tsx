import { Flex, Box } from '@chakra-ui/react';

import { BoardList } from './board-list';
import { Logo } from './shared/svgs/logo';
import { Show as ShowIcon } from './shared/svgs/show';
import { SideMenuControls } from './side-menu-controls';

type Props = {
  onClick: () => void;
  isHidden: boolean;
};

export const SideMenu = ({ onClick, isHidden }: Props) => {
  return (
    <Box as="aside" bgColor="transparent">
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
        borderColor="light.300"
        bgColor="light.100"
      >
        <Logo />
      </Box>
      <Box
        aria-hidden={isHidden}
        transform={isHidden ? 'translateX(-300px)' : 'translateX(0)'}
        transition="transform 0.3s ease-in-out"
        height="calc(100vh - 100px)"
        bgColor="light.100"
        borderRight="1px solid"
        borderColor="light.300"
        p="7"
        pt="9"
        pl="9"
      >
        <Flex
          display={isHidden ? 'none' : 'flex'}
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <BoardList
            containerProps={{
              mt: '12',
              flex: '1',
            }}
          />

          <SideMenuControls onClick={onClick} />
        </Flex>
      </Box>
    </Box>
  );
};
