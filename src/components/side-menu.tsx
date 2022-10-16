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
    <>
      {isHidden ? (
        <>
          <Box
            p="9"
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="light.300"
          >
            <Logo />
          </Box>
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
        </>
      ) : (
        <Flex
          as="aside"
          flexDirection="column"
          p="7"
          pt="9"
          pl="9"
          justifyContent="space-between"
          height="100%"
          borderRight="1px solid"
          borderColor="light.300"
        >
          <Logo />

          <BoardList
            containerProps={{
              mt: '12',
              flex: '1',
            }}
          />

          <SideMenuControls onClick={onClick} />
        </Flex>
      )}
    </>
  );
};
