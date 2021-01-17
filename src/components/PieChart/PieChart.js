import * as React from 'react';


import { Pie } from "react-chartjs-2";
import './PieChart.css'
import { Card, Container } from 'react-bootstrap';



// export default class PieChart extends React.PureComponent {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data: this.props.data,
//         };
//     }

//     render() {
//         const { data: chartData } = this.state;

//         return (
//             <Paper>
//                 <Chart className="pieChart" data={chartData}>
//                     <PieSeries valueField="nVotes" argumentField="voteSubject" />
//                     <Title text={this.props.title} />
//                     <Animation />
//                 </Chart>
//             </Paper>
//         );
//     }
// }

function getPieColors(numOfOptions) {
    let colors = {
        pieColors: [],
        pieColorsBorder: []
    }
    for (let i = 0; i < numOfOptions; ++i) {
        let red = Math.floor(Math.random() * 256).toString();
        let green = Math.floor(Math.random() * 256).toString();
        let blue = Math.floor(Math.random() * 256).toString();
        let pieColor = `rgba(${red},${green},${blue},0.2)`;
        let pieColorBorder = `rgba(${red},${green},${blue},1)`;
        colors.pieColors.push(pieColor);
        colors.pieColorsBorder.push(pieColorBorder);
    }

    return colors;
}

function PieChart(props) {

    const { title, vote } = props;

    const optionsChartData = React.useMemo(getVoteOptionsChartData, [vote]);

    function getVoteOptionsChartData() {
        console.log("calculating chart data");

        let colors = getPieColors(vote.options.length);

        let voteCount = [];

        for (const option of vote.options) {
            let count = 0;
            for (const single_vote of Object.values(vote.votesPieData)) {
                if (single_vote === option) {
                    count++;
                }
            }
            voteCount.push(count);
        }

        return {
            labels: vote.options,
            datasets: [
                {
                    label: '# of Votes',
                    data: voteCount,
                    backgroundColor: colors.pieColors,
                    borderColor: colors.pieColorsBorder,
                    borderWidth: 1,
                },
            ],


        }
    }
    const option = { legend: { display: false } };
    return (

        <Container>
            <Card.Title className="chart-title" >{title}</Card.Title>
            <Pie options={option} data={optionsChartData} />
        </Container>
    )
}

export default PieChart;