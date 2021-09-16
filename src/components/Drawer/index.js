import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  DrawerHeader,
  Button,
} from '@chakra-ui/react';

const UseDrawer = ({ children, isOpen, onClose }) => {
  return (
    <Drawer placement='bottom' isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton zIndex={99} bg='black' color='white' />

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UseDrawer;
