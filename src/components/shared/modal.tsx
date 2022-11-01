import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Modal as ChakraModal,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { Text } from './text';

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>;

export const Modal = ({ children, isOpen, onClose, title }: Props) => (
  <>
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {!!title && (
          <ModalHeader>
            <Text variant="h3">{title}</Text>
          </ModalHeader>
        )}

        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  </>
);