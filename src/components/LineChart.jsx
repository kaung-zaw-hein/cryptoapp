
import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  if (!coinHistory) return ("loading");
  for (let i = 0; i < coinHistory.data.history.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString("en-US"));
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#3d3d3d',
        borderColor: '#3d3d3d',
      },
    ],
  };

  var options = {
    title: {text: "This is a test"},
    scales: {
      scales: {
        xAxes: [{
            type: 'time',
            time: { parser: 'DD/MM/YYYY' },
          }],
        }
    }
}
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory.data.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Chart type='line' data={data} options={options} />
    </>
  );
};

export default LineChart;