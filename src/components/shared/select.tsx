import {
  Select as ChakraSelect,
  SelectProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<
  {
    label?: string;
  } & SelectProps
>;

export const Select = ({ children, label, ...delegated }: Props) => {
  const labelColor = useColorModeValue('dark.10', 'light.100');

  return (
    <>
      {!!label && (
        <Text
          as="label"
          htmlFor={label}
          fontWeight="700"
          fontSize="small"
          color={labelColor}
        >
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
        fontSize="small"
        fontWeight="medium"
        cursor="pointer"
        {...delegated}
      >
        {children}
      </ChakraSelect>
    </>
  );
};
