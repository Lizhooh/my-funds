import React from 'react';

import Timer from '../containers/Timer';
import News24Time from '../containers/News24Time';
import Funds from './Funds';

export default () => {
    return (
        <div className='main'>
            <Funds />
            <News24Time />
            <Timer />

            {/* <iframe src='https://data.hexin.cn/market/rsi/'
                style={{
                    width: 360, height: 800, border: 0, margin: 30,
                    boxShadow: '1px 1px 12px rgba(1, 1, 1, 0.03)',
                }}
            /> */}
        </div>
    );
};