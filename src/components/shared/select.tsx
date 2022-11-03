import { Select as ChakraSelect, SelectProps, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<
  {
    label?: string;
  } & SelectProps
>;

export const Select = ({ children, label, ...delegated }: Props) => {
  return (
    <>
      {!!label && (
        <Text as="label" htmlFor={label} fontWeight="700" fontSize="sm">
          {label}
        </Text>
      )}
      <ChakraSelect
        {...(label && {
          id: label,
        })}
        mt={label ? '2' : '0'}
        iconColor="primary"
        borderColor="border.1"
        cursor="pointer"
        {...delegated}
      >
        {children}
      </ChakraSelect>
    </>
  );
};
