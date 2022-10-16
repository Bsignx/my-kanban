import { ChakraProps, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Board as BoardIcon } from './shared/svgs/board';

type Props = {
  containerProps?: ChakraProps;
};

const boardList = [
  { id: 1, name: 'Platform Launch', active: true },
  { id: 2, name: 'Marketing Plan', active: false },
];

export const BoardList = ({ containerProps }: Props) => {
  return (
    <Flex {...containerProps} flexDir="column">
      <Heading
        textTransform="uppercase"
        fontWeight="700"
        fontSize="md"
        letterSpacing="2.4px"
        color="dark.10"
      >
        all boards (1)
      </Heading>
      <VStack alignItems="start" pt="7" spacing="6">
        {boardList.map(({ name, active, id }) => (
          <BoardItem key={id} name={name} active={active} />
        ))}
        <BoardItem name="+ Create New Board" isNewBoard />
      </VStack>
    </Flex>
  );
};

const BoardItem = ({
  name,
  active,
  isNewBoard,
  onClick,
}: {
  name: string;
  active?: boolean;
  isNewBoard?: boolean;
  onClick?: () => void;
}) => (
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
    <Text fontWeight="700" fontSize="md" color="inherit" ml="4">
      {name}
    </Text>
  </Flex>
);
