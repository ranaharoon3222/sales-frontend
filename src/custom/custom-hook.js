import React, { useState } from 'react';

const CustomHook = () => {
  const [state, setState] = useState(18);

  const checkAge = (age) => {
    return age >= state ? 'YOu are adult' : 'You are Kid';
  };

  return { checkAge };
};

export default CustomHook;
