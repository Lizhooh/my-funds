import React from 'react';

import useTimer from '../hooks/useTimer';

export default () => {
    const time = useTimer(1000);

    return (
        <div className='timer'>{time}</div>
    );
};