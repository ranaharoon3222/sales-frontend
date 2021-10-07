import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Button,
} from '@chakra-ui/react';

const UseDrawer = ({
  children,
  isOpen,
  onClose,
  placement = 'bottom',
  ...rest
}) => {
  return (
    <Drawer
      placement={placement}
      isOpen={isOpen}
      onClose={onClose}
      size='md'
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton zIndex={99} bg='black' color='white' />

        <DrawerBody pt={16}>{children}</DrawerBody>

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
