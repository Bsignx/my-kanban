import { ChakraProps, Text as ChakraText } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const variantsStyles = {
  h1: {
    fontWeight: '700',
    fontSize: '3xl',
  },
  h2: {
    fontWeight: '700',
    fontSize: 'md',
    letterSpacing: '2.4px',
  },
  h3: {
    fontWeight: '700',
    fontSize: 'lg',
  },
  p: {
    fontWeight: '400',
    fontSize: 'md',
  },
  span: {
    fontWeight: '400',
  },
};

type Props = PropsWithChildren<
  {
    variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  } & ChakraProps
>;

export const Text = ({ variant = 'p', children, ...delegated }: Props) => {
  const variantStyles = variantsStyles[variant];

  return (
    <ChakraText as={variant} {...variantStyles} {...delegated}>
      {children}
    </ChakraText>
  );
};
