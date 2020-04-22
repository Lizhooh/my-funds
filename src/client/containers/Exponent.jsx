import React, { useState, useEffect } from 'react';
import day from 'dayjs';

import { chunk } from '../utils';

// 指数
export default () => {
    // 指数数据
    const [exponent, setExponent] = useState([]);

    function get() {
        fetch('/api/exponent').then(res => res.json()).then(setExponent);
    }

    useEffect(() => {
        get();
        let timer;
        const now = day();

        if (now.hour() >= 9 && now.hour() <= 15 && now.day() < 6) {
            timer = setInterval(get, 5000);
        }

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className='exponent'>
            {chunk(exponent, 4).map((list, index) => (
                <div key={index}>
                    {list.map((v, i) => (
                        <span key={i} className='exp'>
                            {v[0] + ' '}
                            <span className={v[1] >= 0 ? 'red' : 'green'}>
                                {v[1] >= 0 ? '↑' : '↓'}
                                {v[1].toFixed(2) + '%'}
                            </span>
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}