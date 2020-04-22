import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import fetch from 'isomorphic-fetch';

export default forwardRef((props, ref) => {
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ fund: {}, list: [], percs: [] });
    const [show, setShow] = useState(false);
    const [select, setSelect] = useState(null);
    const { list, fund, percs } = data;

    const get = (id, show) => {
        fetch('/api/funds/stocks/' + id).then(res => res.json()).then(res => {
            if (show) {
                setData(res);
                setLoading(false);
            }
            if (!show) setId(null);
        });
    }

    useImperativeHandle(ref, () => ({
        show: (id) => {
            setShow(true);
            setId(id);
            get(id, true);
        },
    }), [id]);

    const Item = ({ name, increase, summary, concepts, perc }) => (
        <div className='stocks-held-item'>
            <div className='title'>
                <span>
                    <a href={`http://www.iwencai.com/unifiedwap/result?w=${name}`} target='_blank'>{name}</a>
                    <span style={{ fontSize: 13, marginLeft: 4, color: '#777' }}>
                        (比例：{perc.toFixed(2) + '%'})
                    </span>
                </span>
                <span className={increase > 0 ? 'red' : 'green'}>
                    {increase > 0 ? '↑' : '↓'}{increase.toFixed(2) + '%'}
                </span>
            </div>
            <div className='concept'>{summary}。</div>
            <div>{
                concepts.map((v, i) => (
                    <span className='tag' key={i} style={select === v.id ? {
                        backgroundColor: '#f54',
                        color: '#fff',
                        borderRadius: 2,
                        boxShadow: '1px 2px 3px rgba(1, 1, 1, 0.08)',
                    } : null}>
                        {v.title} {v.score.toFixed(2) + '%'}
                    </span>
                ))}
            </div>
        </div>
    );

    const onClick = e => {
        if (e.target === e.currentTarget) {
            setShow(false);
            setLoading(true);
            setSelect(null);
        }
    };
    const onSelectClick = id => {
        setSelect(select === id ? null : id);
    };

    if (!show || id === null) return;

    return (
        <div className='stocks-held' onClick={onClick}>
            <div className='stocks-held-panel'>
                <div className='stocks-held-close' onClick={onClick}>关闭</div>
                <div className='stocks-held-list'>
                    <header className='stocks-held-title'>
                        {list.length > 0 && id}
                        <a href={`http://www.iwencai.com/unifiedwap/result?w=${id}&querytype=fund&issugs`} target='_blank'>
                            {fund.title}
                        </a>
                    </header>
                    <div>
                        {list.map((v, i) => <Item key={v.id} {...v} />)}
                    </div>
                    <div className='stocks-held-info'>
                        {percs.length > 0 && <h4>概念比例</h4>}
                        {percs.slice(0, 12).map((v, i) => (
                            <div key={i} onClick={e => onSelectClick(v.id)}>
                                {v.name} {v.perc + '%'}
                            </div>
                        ))}
                    </div>
                </div>
                {loading &&
                    <div className='stocks-held-loading'>
                        加载中...
                    </div>
                }
            </div>
        </div>
    );
});