import { useState } from 'react';

const useMyHook = (array, time, angle) => {
  const [data, setData] = useState(array);

  const roundTime = (time) => {
    const roundedTime = Math.round(time * 2) / 2; // Round time to the closest interval of 0.5
    return roundedTime.toFixed(1); // Convert roundedTime to a string with one decimal place
  };

  const updateData = (time, angle) => {
    const roundedTime = roundTime(time);

    // Find the data point with the rounded time in the array
    const newData = data.map((item) => {
      if (item.time === parseFloat(roundedTime)) {
        return { ...item, angle: angle };
      }
      return item;
    });

    setData(newData);
  };

  return { data, updateData };
};