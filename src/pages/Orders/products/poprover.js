import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  ButtonGroup,
  PopoverArrow,
  PopoverCloseButton,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

const Poprover = ({ trigger, title, children }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Popover
        placement='bottom'
        closeOnBlur={true}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent color='white' bg='purple.800' borderColor='blue.800'>
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
            {title}
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>{children}</PopoverBody>
          <PopoverFooter
            border='0'
            d='flex'
            alignItems='center'
            justifyContent='right'
            pb={4}
          >
            <ButtonGroup size='sm' justifyContent='right'>
              <Button colorScheme='purple' onClick={onClose}>
                Save
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Poprover;
