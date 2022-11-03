import { Input, InputProps, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
} & Omit<InputProps, 'onChange'>;

export const TextField = ({
  onChange,
  label,
  value,
  placeholder = '',
  ...delegated
}: Props) => {
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
      <Input
        {...(label && {
          id: label,
        })}
        mt={label ? '2' : '0'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fontWeight="medium"
        borderColor="border.1"
        fontSize="small"
        {...delegated}
      />
    </>
  );
};
