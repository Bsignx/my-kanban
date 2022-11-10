import { PropsWithChildren } from 'react';
import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';

type Props = PropsWithChildren<CheckboxProps>;

export const Checkbox = ({ children, ...delegated }: Props) => {
  return (
    <ChakraCheckbox
      iconColor="light.100"
      colorScheme="checkboxScheme"
      fontSize="small"
      display="flex"
      alignItems="center"
      spacing="3"
      css={{
        '.chakra-checkbox__label': {
          fontSize: 'var(--chakra-fontSizes-small)',
          fontWeight: 'var(--chakra-fontWeights-semibold)',
        },
      }}
      {...delegated}
    >
      {children}
    </ChakraCheckbox>
  );
};
