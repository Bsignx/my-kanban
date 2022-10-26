import { HStack } from '@chakra-ui/react';

import { Hide as HideIcon } from './shared/svgs/hide';
import { Text } from './shared/text';

type Props = {
  onClick: () => void;
};

export const SideMenuControls = ({ onClick }: Props) => {
  return (
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
  );
};
