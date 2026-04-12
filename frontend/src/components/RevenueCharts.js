import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';

const RevenueCharts = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis domain={[0, "dataMax"]} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueCharts;