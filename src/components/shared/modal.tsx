import {
  ModalBody,
  ModalContent,
  ModalOverlay,
  Modal as ChakraModal,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { Text } from './text';

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>;

export const Modal = ({ children, isOpen, onClose, title }: Props) => {
  const modalBgColor = useColorModeValue('light.100', 'dark.100');

  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {!!title && (
            <ModalHeader bg={modalBgColor} borderRadius="md">
              <Text variant="h3">{title}</Text>
            </ModalHeader>
          )}

          <ModalCloseButton />
          <ModalBody bg={modalBgColor} borderRadius="md">
            {children}
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};
