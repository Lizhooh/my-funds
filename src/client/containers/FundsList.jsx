import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import day from 'dayjs';

const initState = { list: [], sum: 0, estimateSum: 0 };

export default ({ onClickStocks }) => {
    // 基金表格
    const [loading, setLoading] = useState(true);
    const [funds, setDunds] = useState(initState);
    const { list, sum, estimateSum } = funds;
    const pavg = (list.reduce((s, v) => s + v.valuation[1] * 1, 0) || 0).toFixed(2);

    function get() {
        fetch('/api/funds/table').then(res => res.json())
            .then(res => {
                setDunds(res);
                setLoading(false);
            });
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

    const Item = ({ id, title, perc, valuation, isUp1, isUp2, estimate }) => (
        <div className='item'>
            <span className='id'>{id}</span>
            <span className='name'>
                <a href={`http://www.jjmmw.com/fund/${id}/`} target='_blank'>
                    {title}
                </a>
            </span>
            <span>
                <span style={{ fontSize: 13 }}>{(perc || 0) + '%'}</span>
                <div className='line' style={{ width: perc * 2 + '%' }} />
            </span>
            <span title='查看股票' onClick={e => onClickStocks(id)} style={{ cursor: 'pointer' }}>
                <span style={{ fontSize: 13 }}>
                    {valuation[0]}
                    {valuation[2] && day().hour() >= 19 &&
                        <span style={{ float: 'right', color: '#f56' }}>new</span>
                    }
                    {!valuation[2] &&
                        <span style={{ float: 'right' }}>
                            ({day().subtract(1, 'd').format('MM-DD')})
                        </span>
                    }
                </span>
                <div className='line line-ant' style={{
                    width: Math.abs(valuation[1] + Math.random() / 4) * 15 + '%',
                    backgroundColor: valuation[1] > 0 ? '#f45' : '#3c5',
                    marginTop: 1,
                    animationDelay: Math.random() + 's',
                }} />
            </span>
            <span className={isUp1}>
                {isUp2} {estimate > 0 ? '+' : ''}{estimate}
            </span>
        </div>
    );

    return (
        <div className='funds-list'>
            <header className='header'>
                <span className='id'>ID</span>
                <span>基金</span>
                <span>
                    <span>仓位</span>
                    <span className='min-text'>({sum})</span>
                </span>
                <span>
                    <span>估值</span>
                    <span className='min-text'>({((pavg / list.length) || 0).toFixed(2) + '%'})</span>
                </span>
                <span>
                    <span>预计盈利</span>
                    <span className='min-text'>({estimateSum})</span>
                </span>
            </header>

            {loading &&
                <div className='loading'>加载中...</div>
            }

            {list.map(i => {
                const isUp1 = i.valuation[1] >= 0 ? 'red' : 'green';
                const isUp2 = i.estimate >= 0 ? '↑' : '↓';
                return (
                    <Item key={i.id} {...i} {...{ isUp1, isUp2 }} />
                );
            })}

            <div className='estimate'>
                <span className={estimateSum > 0 ? 'red' : 'green'}>
                    {estimateSum > 0 ? '↑' : '↓'}
                    {(estimateSum / sum * 100 || 0).toFixed(2)}%
                </span>
                <span style={{ color: '#345', fontSize: 14.5 }}>
                    {estimateSum > 0 ? '+' : ''}{estimateSum} 元
                </span>
            </div>
        </div>
    );
};
