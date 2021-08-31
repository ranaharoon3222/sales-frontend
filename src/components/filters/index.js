import React from 'react';
import {
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

const Index = ({ setValue }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search;
    setValue(search.value);
  };

  return (
    <SimpleGrid columns={1} spacingX={1} spacingY={1} p={4}>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLeftElement pointerEvents='none' children={<RiSearchLine />} />
          <Input placeholder='Search in Products' name='search' />
        </InputGroup>
      </form>
    </SimpleGrid>
  );
};

export default Index;
