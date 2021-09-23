import React, { useState } from 'react';
import { useCleanObjects } from 'helpers/useCleanObjects';
import { useToasts } from 'helpers/useToast';
import { useHistory } from 'react-router-dom';
import { useResponses } from 'helpers/useResponses';

export const SubmitObject = ({
  successMessage,
  errorMessage,
  mutate = false,
}) => {
  const { toast } = useToasts();
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { cleanObjects } = useCleanObjects();
  const { successResponse, errorResponse } = useResponses({
    error,
    successLabel: successMessage,
  });

  const successCase = async () => {
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
    setError(false);
    mutate && (await mutate());
    toast({
      title: successMessage,
    });
  };

  const errorCase = (error, order) => {
    const stockMsg = error.response.data.message;
    setSuccess(false);
    setError(stockMsg ? stockMsg : error.message);
    setLoading(false);
    toast({
      title: order ? stockMsg : errorMessage,
      status: 'error',
    });
  };

  return {
    history,
    success,
    loading,
    cleanObjects,
    successResponse,
    errorResponse,
    errorCase,
    successCase,
    error,
    setLoading,
  };
};
