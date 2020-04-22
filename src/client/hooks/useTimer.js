import { useState, useEffect } from 'react';
import day from 'dayjs';

export default ($time) => {
    const [time, setTime] = useState(day().format('HH:mm:ss'));
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(day().format('HH:mm:ss'));
        }, $time);
        return () => {
            setInterval(timer);
        };
    }, [$time]);

    return time;
};