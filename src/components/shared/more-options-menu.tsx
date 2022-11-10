import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';

import { MoreOptions as MoreOptionsIcon } from './icons/more-options';

type Props = {
  options: {
    label: string;
    onClick: () => void;
    color?: string;
  }[];
};

export const MoreOptionsMenu = ({ options }: Props) => {
  const bgColor = useColorModeValue('light.100', 'dark.300');

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="More options"
        icon={<MoreOptionsIcon />}
        variant="ghost"
      />
      <MenuList bgColor={bgColor} border="none" p="4">
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={option.onClick}
            bgColor={bgColor}
            fontWeight="500"
            color={option.color || 'dark.10'}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
