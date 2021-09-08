import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Index = ({ handlePageChange, data, limit, page }) => {
  return (
    <>
      <div>
        <IconButton
          onClick={() => handlePageChange('')}
          aria-label='Prev Page'
          icon={<AiOutlineArrowLeft />}
          m={3}
          disabled={page === 0}
        />
        <IconButton
          onClick={() => handlePageChange('add')}
          m={3}
          aria-label='Next Page'
          icon={<AiOutlineArrowRight />}
          disabled={data !== limit}
        />
      </div>
    </>
  );
};

export default Index;
