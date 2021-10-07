import React from 'react';
import CheckAge from './custom-hook';

const index = () => {
  const { checkAge } = CheckAge(19);

  return <div> {checkAge(17)} </div>;
};

export default index;
