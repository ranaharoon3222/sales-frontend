import React, { useState } from 'react';
import { useFetch } from 'helpers/axios';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import qs from 'qs';

export const useDateRange = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const query = qs.stringify({
    created_at_gte: state[0].startDate,
    created_at_lte: state[0].endDate,
  });

  const { loading, apiData, error } = useFetch(`/orders?${query}`);

  const DateComponent = () => {
    return (
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        editableDateInputs={true}
        moveRangeOnFirstSelection={true}
        months={2}
        ranges={state}
        maxDate={addDays(new Date(), 1)}
        direction='horizontal'
      />
    );
  };

  return { DateComponent, apiData, loading, error };
};
