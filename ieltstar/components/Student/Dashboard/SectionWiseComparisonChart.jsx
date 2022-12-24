import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../Chart';

// ----------------------------------------------------------------------

SectionWiseComparisonChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function SectionWiseComparisonChart({ title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      {(typeof window !== 'undefined') &&<ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />}
      </Box>
    </Card>
  );
}
