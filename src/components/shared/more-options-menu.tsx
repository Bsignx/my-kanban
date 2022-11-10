import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="More options"
        icon={<MoreOptionsIcon />}
        variant="ghost"
      />
      <MenuList bgColor="dark.300" border="none" p="4">
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={option.onClick}
            bgColor="dark.300"
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
