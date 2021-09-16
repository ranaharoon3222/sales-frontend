import React from 'react';
import { Button, Stack } from '@chakra-ui/react';

const Index = React.forwardRef((prop, ref) => {
  return (
    <div ref={ref} style={{ padding: '20px' }}>
      <h2>Works</h2>
      <Stack spacing={4} direction='row' align='center'>
        <Button colorScheme='teal' size='xs'>
          Button
        </Button>
        <Button colorScheme='teal' size='sm'>
          Button
        </Button>
        <Button colorScheme='teal' size='md'>
          Button
        </Button>
        <Button colorScheme='teal' size='lg'>
          Button
        </Button>
      </Stack>
    </div>
  );
});

export default Index;
