import React, {Component} from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Get ApexChart for ScoreBoard
class ApexChart extends Component {
    constructor(props) {
      super(props);
      console.log(props.series)

      this.state = {
      
        series: props.series,
        options: {
          chart: {
            height: 390,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              },
              
            }
          },
          colors: ['#ffa726', '#f44336', '#66bb6a', '#93c4f0'],
          labels: ['Listening', 'Reading', 'Writing', 'Speaking'],
          legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'left',
            offsetX: 190,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + Math.round(((opts.w.globals.series[opts.seriesIndex])/11.11)*2)/2
            },
            itemMargin: {
              vertical: 3
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: false
              }
            }
          }]
        },
      
      
      };
    }

  

    render() {
      return (
        

    <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={390} />
            </div>


        );
        }
  }

  export default ApexChart;