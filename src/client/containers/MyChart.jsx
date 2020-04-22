import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import day from 'dayjs';

let chart;

export default ({ sum }) => {
    // 图表数据
    const [data, setData] = useState({ all: [], dap: [] });

    function get() {
        fetch('/api/funds/chart').then(res => res.json()).then(setData);
    }

    useEffect(() => {
        get();
        let timer;
        const now = day();

        if (now.day() < 6 && now.hour() >= 9 && now.hour() <= 15) {
            timer = setInterval(get, 5000);
        }

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (data.all.length === 0) return;
        const sum = data.sum;

        const cdata = data.all.map((v, i) => ({
            '大盘走势': data.dap[i],
            '今日收益': v.income,
            time: v.time,
        }));

        if (chart) {
            chart.changeData(cdata);
            console.log('更新图表...');
            return;
        }

        chart = new G2.Chart({
            container: 'funds-line-view',
            forceFit: true,
            height: 458,
            padding: [30, 48, 40, 50]
        });
        chart.axis('time', {
            grid: {
                type: 'line',
                lineStyle: {
                    stroke: '#dfdfdf',
                    lineWidth: 1,
                    lineDash: [4, 4]
                },
                align: 'center'
            }
        });
        chart.axis('大盘走势', {
            grid: false,
        });
        chart.tooltip({
            crosshairs: 'y',
            position: 'top',
            'g2-tooltip': { fontSize: 16 },
        });
        chart.legend({
            position: 'top-center',
            textStyle: { fontSize: 15 },
        });
        chart.source(cdata, {
            time: {
                formatter: val => day(val).format('HH:mm'),
                type: 'timeCat',
                tickCount: 16,
            },
        });

        chart.line().position('time*今日收益').color('rgba(255, 45, 45, 0.6)')
            .tooltip('今日收益', v => ({ name: '今日收益', value: v + '%' }))
            .style({ lineWidth: 1.5 });

        chart.line().position('time*大盘走势').color('rgba(30, 150, 255, 0.58)')
            .tooltip('大盘走势', v => ({ name: '大盘走势', value: v + '%' }))
            .style({ lineWidth: 1 });

        chart.line().position('time*盈利').color('rgba(30, 155, 255, 0.32)')
            .tooltip('今日收益', v => ({ name: '盈利', value: (v / 100 * sum).toFixed(2) + '元' }))
            .style({ lineWidth: 1 });

        chart.render();
    }, [data]);

    const len = data.all.length;

    return (
        <div className='my-chart'>
            <div id='funds-line-view'></div>
            <div className='last-update' style={{ marginTop: 0 }}>
                最后更新：{len > 0 ? data.all[len - 1].time : day().format('YYYY-MM-DD hh:mm:ss')}
            </div>
        </div>
    );
};