import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import './PieChart.css'



export default class PieChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart className="test" data={chartData}>
                    <PieSeries valueField="area" argumentField="country" />
                    <Title text="Voting Precentage" />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}
