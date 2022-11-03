import { PropsWithChildren } from 'react';
import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';

type Props = PropsWithChildren<CheckboxProps>;

export const Checkbox = ({ children, ...delegated }: Props) => {
  return (
    <ChakraCheckbox
      iconColor="light.100"
      colorScheme="checkbox"
      fontSize="sm"
      display="flex"
      alignItems="center"
      spacing="3"
      css={{
        '.chakra-checkbox__label': {
          fontSize: 'var(--chakra-fontSizes-sm)',
          fontWeight: 'var(--chakra-fontWeights-medium)',
        },
      }}
      {...delegated}
    >
      {children}
    </ChakraCheckbox>
  );
};
