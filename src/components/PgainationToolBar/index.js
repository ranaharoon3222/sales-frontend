import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Index = ({ handlePageChange, data }) => {
  return (
    <>
      {data < 25 ? (
        ''
      ) : (
        <div>
          <IconButton
            onClick={() => handlePageChange('')}
            aria-label='Prev Page'
            icon={<AiOutlineArrowLeft />}
            m={3}
          />
          <IconButton
            onClick={() => handlePageChange('add')}
            m={3}
            aria-label='Next Page'
            icon={<AiOutlineArrowRight />}
          />
        </div>
      )}
    </>
  );
};

export default Index;
