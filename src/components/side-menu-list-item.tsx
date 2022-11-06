import { Flex } from '@chakra-ui/react';

import { Text } from './shared/text';

import { Board as BoardIcon } from './shared/icons/board';

type Props = {
  name: string;
  active?: boolean;
  isNewBoard?: boolean;
  onClick?: () => void;
};

export const SideMenuListItem = ({
  name,
  active,
  isNewBoard,
  onClick,
}: Props) => (
  <Flex
    onClick={onClick}
    as="button"
    color={isNewBoard ? 'primary' : `${active ? 'light.100' : 'dark.10'}`}
    alignItems="center"
    cursor="pointer"
    _hover={{
      color: active ? 'light.300' : 'secondary',
    }}
    _before={{
      content: '""',
      bgColor: active ? 'primary' : 'transparent',
      position: 'absolute',
      zIndex: -1,
      left: '0',
      w: '240px',
      h: '48px',
      borderRadius: '0 50px 50px 0',
    }}
  >
    <BoardIcon color="inherit" />
    <Text variant="p" fontWeight="700" color="inherit" ml="4">
      {name}
    </Text>
  </Flex>
);
