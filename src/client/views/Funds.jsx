import React, { useRef } from 'react';

import MyChart from '../containers/MyChart';
import FundsList from '../containers/FundsList';
import StocksHeld from '../containers/StocksHeld';
import Exponent from '../containers/Exponent';

export default () => {
    const ref = useRef(null);

    return (
        <div>
            <div className='funds'>
                <MyChart />
                <section className='section'>
                    <Exponent />
                    <FundsList onClickStocks={id => ref.current.show(id)} />
                </section>
            </div>
            <StocksHeld ref={ref} />
        </div>
    );
};