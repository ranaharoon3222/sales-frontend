import React from 'react';
import {
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

const Index = ({ setValue, value }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setValue(search);
  };

  return (
    <SimpleGrid columns={1} spacingX={1} spacingY={1} p={4}>
      <InputGroup>
        <InputLeftElement pointerEvents='none' children={<RiSearchLine />} />
        <Input
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          placeholder='Search in Products'
          name='search'
          defaultValue={value}
        />
      </InputGroup>
      {/* <Button onClick={() => setValue('')}>Clear Search</Button> */}
    </SimpleGrid>
  );
};

export default Index;
