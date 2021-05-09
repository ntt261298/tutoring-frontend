import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Label,
} from 'recharts';
import Title from '../Commons/Title';

export default function Revenue({ data }) {
  const reverseArr = (input) => {
    if (!input) return [];
    const ret = [];
    for (let i = input.length - 1; i >= 0; i -= 1) {
      ret.push(input[i]);
    }
    return ret;
  };

  return (
    <React.Fragment>
      <Title>Revenue</Title>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={reverseArr(data)}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis>
            <Label
              angle={270}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
