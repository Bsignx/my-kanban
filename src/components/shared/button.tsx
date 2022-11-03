import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const variantsStyles = (bgColor: string) => ({
  primary: {
    color: 'light.100',
    bgColor: bgColor,
    _hover: {
      bgColor: 'secondary',
    },
    _active: {
      bgColor: 'secondary',
    },
  },
  secondary: {
    color: 'primary',
    bgColor: bgColor,
    _hover: {
      bgColor: 'secondary',
      color: 'light.100',
    },
    _active: {
      bgColor: 'secondary',
    },
  },
});

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
  const primaryBgColor = 'primary';
  const secondaryBgColor = useColorModeValue('light.200', 'light.100');
  const bgColor = variant === 'primary' ? primaryBgColor : secondaryBgColor;

  return (
    <ChakraButton
      onClick={onClick}
      disabled={disabled}
      fontWeight="700"
      fontSize="sm"
      borderRadius="24px"
      {...variantsStyles(bgColor)[variant]}
      {...delegaded}
    >
      {children}
    </ChakraButton>
  );
};
