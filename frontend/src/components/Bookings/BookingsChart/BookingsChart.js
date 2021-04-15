import React from "react";
import { Bar as BarChart } from "react-chartjs";

function BookingsChart(props) {
  const CHART_X_AXIS = {
    Cheap: {
      min: 0,
      max: 30,
    },
    Standard: {
      min: 30,
      max: 100,
    },
    Expensive: {
      min: 100,
      max: 9999,
    },
  };

  let values = [];

  const chartData = { labels: [], datasets: [] };
  for (const level in CHART_X_AXIS) {
    const filteredBookings = props.bookings.reduce((previous, current) => {
      if (
        current.event.price > CHART_X_AXIS[level].min &&
        current.event.price < CHART_X_AXIS[level].max
      ) {
        return previous + 1;
      } else {
        return previous;
      }
    }, 0);
    values.push(filteredBookings);
    chartData.labels.push(level);
    chartData.datasets.push({
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: values,
    });
    values = [...values];
    values[values.length - 1] = 0;
  }
  return <BarChart data={chartData} />;
}

export default BookingsChart;
