import * as React from 'react';
import { Pie } from "react-chartjs-2";
import './PieChart.css'
import { Card, Container } from 'react-bootstrap';



function getPieColors(numOfOptions) {
    let colors = {
        pieColors: [],
        pieColorsBorder: []
    }

    let colorsArray = [
        'rgba(255, 99, 132, ',
        'rgba(54, 162, 235, ',
        'rgba(10, 57, 173, ',
        'rgba(10, 84, 48, ',
        'rgba(2, 86, 86,',
        'rgba(3, 29, 8, ',
        'rgba(165, 85, 48, ',
        'rgba(97, 232, 249, ',
        'rgba(219, 186, 252, ',
        'rgba(183, 220, 23, ',
    ]

    for (let i = 0; i < numOfOptions; ++i) {
        // let red = Math.floor(Math.random() * 256).toString();
        // let green = Math.floor(Math.random() * 256).toString();
        // let blue = Math.floor(Math.random() * 256).toString();
        let pieColor = colorsArray[i % colorsArray.length] + `0.2)`;
        let pieColorBorder = colorsArray[i % colorsArray.length] + `1)`;
        // let pieColor = `rgba(${red},${green},${blue},0.2)`;
        // let pieColorBorder = `rgba(${red},${green},${blue},1)`;
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
        <Container className="chart-title">
            <Card.Title  >{title}</Card.Title>
            {Object.keys(vote.votesPieData).length === 0 ?
                <p style={{backgroundColor: "yellow"}}>No Votes Yet</p>
                :
                <Pie options={option} data={optionsChartData} />
            }
        </Container>
    )
}

export default PieChart;