import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const SecondsToHMS: React.FC<{ seconds: number }> = ({ seconds }) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  const timeFmt = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return seconds <= 60 * 20 ? (
    <span style={{ color: 'red' }}> {seconds <= 0 ? '超时' : timeFmt}</span>
  ) : (
    timeFmt
  );
};

const CustomDaydiff: React.FC<{
  now: dayjs.Dayjs;
  targetTime: string;
}> = ({ now, targetTime }) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const second = dayjs(targetTime).diff(now, 'second');
    setTime(second);
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return isNaN(time) ? '-' : <SecondsToHMS seconds={time} />;
};
export default CustomDaydiff;
