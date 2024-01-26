import { useState, useEffect } from 'react';
import config from '../../../../config';

export default function lastKnownValue() {
  const [lastKnownValues, setLastKnownValues] = useState({
    Speed: "N/A",
    FuelRate: "N/A",
    Time: "N/A",
    Date: "N/A",
    Voltage: "N/A",
    WaterTemperature: "N/A",
    Level: "N/A",
    Capacity: "N/A",
    Latitude: "N/A",
    Longitude: "N/A",
    Tilt_Trim: "N/A",
    SOG: "N/A",
    // You can add other attributes here as needed
  });

  const [nmeaData, setNmeaData] = useState([]);
  const [globalArray, setGlobalArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 1000;

  useEffect(() => {
    const readAndLogNMEA2000Data = async () => {
      try {
        // const response = await fetch('/assets/sample.txt');
        const response = await fetch(config.VITE_SAMPLE_URL);
        const text = await response.text();

        const lines = text.split('\n');

        for (const line of lines) {
          const parts = line.trim().split(/\s+/);

          if (parts.length > 4) {
            const timestamp = parts[0];
            const num1 = parts[1];
            const num2 = parts[2];
            const num3 = parts[3];
            const key = parts[4];

            const colonIndex = parts.findIndex(part => part.endsWith(':'));

            if (colonIndex === -1) continue;

            const mainTopic = parts.slice(5, colonIndex + 1).join(' ').replace(':', '').trim();

            const topicValuesStr = parts.slice(colonIndex + 1).join(' ');
            const keyValuePairs = topicValuesStr.split(';');

            const topicValues = {};

            keyValuePairs.forEach(pair => {
              const [topic, value] = pair.split('=').map(item => item.trim());

              // Remove spaces in topic and value
              const cleanedTopic = topic.replace(/\s+/g, '').replace(/\//g, '_');
              const cleanedValue = value.replace(/\s+/g, '');

              topicValues[cleanedTopic] = cleanedValue;
            });

            const array = {
              Key: key,
              MainTopic: mainTopic,
              Timestamp: timestamp,
              num1: num1,
              num2: num2,
              num3: num3,
              topicValues: topicValues,
            };

            // Update nmeaData
            setNmeaData(prevData => [...prevData, array]);
            
          }
        }
      } catch (error) {
        console.error('Error reading and processing the file:', error);
      }
    };

    readAndLogNMEA2000Data();
  }, []);

  useEffect(() => {
    const updateData = () => {
      if (currentIndex >= nmeaData.length) return;

      const array = nmeaData[currentIndex];
      const newArray = [...globalArray, array];
      setGlobalArray(newArray);

      const updatedValues = { ...lastKnownValues };
      for (const key in lastKnownValues) {
        const value = array?.topicValues?.[key];
        if (value !== undefined) {
          updatedValues[key] = value;
        }
      }

      // Update the Time attribute by one second
      const currentTimeStr = updatedValues.Time; // Assuming it's in "02:35:10" format
      const [hours, minutes, seconds] = currentTimeStr.split(':').map(Number);

      // Increment seconds and handle rollover to minutes and hours
      const newSeconds = (seconds + 1) % 60;
      const newMinutes = minutes + Math.floor((seconds + 1) / 60);
      const newHours = (hours + Math.floor(newMinutes / 60)) % 24;

      // Format the updated time back as a string
      updatedValues.Time = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;

      setLastKnownValues(updatedValues);

      // You can set guageValue here as well if needed
      setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const intervalId = setInterval(updateData, delay);

    return () => clearInterval(intervalId);
  }, [currentIndex, nmeaData, globalArray, lastKnownValues, delay]);

  useEffect(() => {
    console.log("nmea data", nmeaData);
  },[])

  return { lastKnownValues };
}
