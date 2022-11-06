import { Box } from '@chakra-ui/react';

import { Show as ShowIcon } from './shared/icons/show';

type Props = {
  onClick: () => void;
};

export const ShowSideMenuButton = ({ onClick }: Props) => (
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
);
