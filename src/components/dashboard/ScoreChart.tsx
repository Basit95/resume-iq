'use client'

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

type ScoreChartItem = {
    name: string
    score: number
    atsScore: number
}

export default function ScoreChart({ data }: { data: ScoreChartItem[] }) {
    return (
        <div className='card-ui p-6'>
            <h2 className='text-xl font-semibold text-white'>Score Trend</h2>
            <div className='mt-6 h-[320px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={data}>
                        <CartesianGrid stroke='rgba(255,255,255,0.08)' />
                        <XAxis dataKey='name' stroke='#94a3b8' />
                        <YAxis stroke='#94a3b8' domain={[0, 100]} />
                        <Tooltip />
                        <Line type='monotone' dataKey='score' stroke='#818cf8' strokeWidth={3} />
                        <Line type='monotone' dataKey='atsScore' stroke='#38bdf8' strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}