import { Input, InputProps, Text } from '@chakra-ui/react';

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
  return (
    <>
      {!!label && (
        <Text as="label" htmlFor={label} fontWeight="700" fontSize="sm">
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
        borderColor="border.1"
        {...delegated}
      />
    </>
  );
};
