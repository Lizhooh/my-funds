import React, { useRef, useEffect } from 'react';

import StocksHeld from '../containers/StocksHeld';

export default ({ match }) => {
    const ref = useRef(null);

    useEffect(() => {
        const { id } = match.params;
        if (ref.current) {
            ref.current.show(id);
        }
    }, []);

    return (
        <StocksHeld ref={ref} />
    );
};