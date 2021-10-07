import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
} from '@chakra-ui/react';

const Index = ({ children, title, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
