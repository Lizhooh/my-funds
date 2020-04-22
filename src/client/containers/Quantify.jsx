import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

import DownIcon from '../assets/down.svg';

const Summary = ({ text }) => {
    const [show, setShow] = useState(false);
    const len = text.length;

    if (show) return (
        <section>
            <img src={DownIcon} alt='' className='up'
                onClick={e => setShow(false)} />
            {text}
        </section>
    );

    return (
        <section>
            <img src={DownIcon} alt='' onClick={e => setShow(true)} />
            {text.slice(0, 20) + (len > 20 ? '...' : '')}
        </section>
    );
};

export default () => {
    const [list, setList] = useState([]);
    const [type, setType] = useState('全部');
    const types = ['全部', '空仓', '持仓', '买入', '卖出', '无操作'];
    const arr = type === '全部' ?
        list.sort((a, b) => b.rate.q - a.rate.q) :
        list.filter(i => i.action.indexOf(type) > -1)
            .sort((a, b) => b.rate.q - a.rate.q);

    useEffect(() => {
        fetch('/api/quantify').then(res => res.json()).then(setList);
    }, []);


    return (
        <div className='quantify'>
            <nav className='nav'>
                {types.map((item, index) => (
                    <span
                        key={index}
                        className={type === item ? 'active' : ''}
                        onClick={e => setType(item)}>
                        {item}
                    </span>
                ))}
            </nav>
            <div>{arr.map(({ name, summary, url, rate, action, image }) => (
                <div key={name} className='item'>
                    <a className='title' href={url} target='_blank'>{name}</a>
                    <div className='data'>
                        <span className={rate.year[0] === '-' && 'green'}>
                            {rate.year}
                        </span>
                        <span className={rate.quarter[0] === '-' && 'green'}>
                            {rate.quarter}
                        </span>

                        <span className='action' style={{
                            color: ({
                                '继续持仓': '#78f',
                                '继续空仓': '#da0',
                                '空仓': '#da0',
                                '开盘价买入：1股': '#f56',
                                '开盘价买入：2股': '#f56',
                                '开盘价买入：3股': '#f56',
                                '开盘价买入：4股': '#f56',
                                '开盘价买入：5股': '#f56',
                                '开盘价卖出': '#39f',
                            })[action] || '#789',
                        }}>
                            {action}
                        </span>
                    </div>
                    <Summary text={summary} />
                    <footer>
                        <img src={image} alt='' />
                    </footer>
                </div>
            ))}</div>

            <Link to='/' className='goHome'>主页</Link>
        </div>
    );
};