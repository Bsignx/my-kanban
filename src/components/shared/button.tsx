import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const variantsStyles = {
  primary: {
    color: 'light.100',
    bgColor: 'primary',
    _hover: {
      bgColor: 'secondary',
    },
    _active: {
      bgColor: 'secondary',
    },
  },
  secondary: {
    color: 'primary',
    bgColor: 'light.100',
    _hover: {
      bgColor: 'secondary',
      color: 'light.100',
    },
    _active: {
      bgColor: 'secondary',
    },
  },
};

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
} & Omit<ChakraButtonProps, 'children' | 'onClick' | 'disabled' | 'variant'>;

export const Button = ({
  onClick,
  children,
  disabled,
  variant = 'primary',
  ...delegaded
}: ButtonProps) => {
  return (
    <ChakraButton
      onClick={onClick}
      disabled={disabled}
      fontWeight="700"
      fontSize="sm"
      borderRadius="24px"
      {...variantsStyles[variant]}
      {...delegaded}
    >
      {children}
    </ChakraButton>
  );
};
