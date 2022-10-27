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

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const Modal = ({ children, isOpen, onClose }: Props) => (
  <>
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  </>
);
