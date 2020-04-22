import React, { useState, useEffect } from 'react';
import day from 'dayjs';

export default () => {
    // 新闻数据
    const [news, setNews] = useState([]);

    function get() {
        fetch('/api/24news').then(res => res.json()).then(setNews).catch();
    }

    useEffect(() => {
        get();
        const timer = setInterval(get, 5000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className='news-24time'>
            {news.length === 0 &&
                <div style={{
                    color: '#789',
                    fontSize: 14,
                    textAlign: 'center',
                    padding: 30
                }}>加载中...</div>
            }
            {news.map(i => (
                <li key={i.id} className='news-24time-item'>
                    <span>{day(i.time).format('HH:mm:ss')}</span>
                    <h4 className={(i.isVary || i.isHot) ? 'red' : ''}>
                        {i.isVary && <span className='yid'>异动</span>}
                        {i.url ? <a href={i.url} target='_blank'>{i.title}</a> : i.title}
                    </h4>
                    <div>{i.tags.map(i => <span key={i.id} className='tag'>{i.name}</span>)}</div>
                    <div className={(i.isVary || i.isHot) ? 'red' : ''}>{i.summary}</div>
                    <div style={{ marginTop: 4 }}>
                        {i.tagsInfo.map(i =>
                            <span key={i.id} className='tag-info'>
                                {i.name} {(i.score * 1).toFixed(2) + '%'}
                            </span>
                        )}
                    </div>
                </li>
            ))}
        </div>
    );
};