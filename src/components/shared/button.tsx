import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <ChakraButton
      onClick={onClick}
      disabled={disabled}
      fontWeight="700"
      fontSize="sm"
      color="light.100"
      bgColor="primary"
      borderRadius="24px"
      _hover={{
        bgColor: 'secondary',
      }}
      _active={{
        bgColor: 'secondary',
      }}
    >
      {children}
    </ChakraButton>
  );
};
