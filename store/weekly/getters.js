import * as dateFns from 'date-fns';

export default {
  weeklyPatientRatioDataSets(state) {
    return {
      labels: state.weeklyPatientRatio.map(x => `${
          dateFns.format(x.firstDate, 'yyyy/MM/dd')
        } ~ ${
          dateFns.format(x.lastDate, 'yyyy/MM/dd')
        }`),
      datasets: [
        {
          label: '週平均の感染者率',
          lineTension: 0,
          data: state.weeklyPatientRatio.map(
            x => Math.round(x.count * 10000) / 100
          ),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
  },
  weeklyPatientRatioOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '期間' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '感染者率 (%)' },
            ticks: { beginAtZero: true, stepSize: 5 },
          },
        ],
      },
    };
  },
  weeklyPatientRatioComparisonDataSets(state) {
    return {
      labels: state.weeklyPatientRatioComparison.map(x => `${
          dateFns.format(x.firstDate, 'yyyy/MM/dd')
        } ~ ${
          dateFns.format(x.lastDate, 'yyyy/MM/dd')
        }`),
      datasets: [
        {
          label: '感染者率の増減',
          lineTension: 0,
          data: state.weeklyPatientRatioComparison.map(
            x => Math.round(x.count * 10000) / 100
          ),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
  },
  weeklyPatientRatioComparisonOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '期間' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '感染者率の増減 (%)' },
            ticks: { beginAtZero: true, stepSize: 10 },
          },
        ],
      },
    };
  },
  weeklyPatientTotalAverageDataSets(state) {
    return {
      labels: state.weeklyPatientTotalAverage.map(x => `${
          dateFns.format(x.firstDate, 'yyyy/MM/dd')
        } ~ ${
          dateFns.format(x.lastDate, 'yyyy/MM/dd')
        }`),
      datasets: [
        {
          label: '週平均の感染者数',
          lineTension: 0,
          data: state.weeklyPatientTotalAverage.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };

  },
  weeklyPatientTotalAverageOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '期間' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '平均の感染者数 (人)' },
            ticks: { beginAtZero: true, stepSize: 10 },
          },
        ],
      },
    };
  },
  weeklyInspectionTotalAverageDataSets(state) {
    return {
      labels: state.weeklyInspectionTotalAverage.map(x => `${
        dateFns.format(x.firstDate, 'yyyy/MM/dd')
      } ~ ${
        dateFns.format(x.lastDate, 'yyyy/MM/dd')
      }`),
      datasets: [
        {
          label: '週平均の検査数',
          data: state.weeklyInspectionTotalAverage.map(x => x.count),
          backgroundColor: 'rgba(48, 128, 255, 1)',
          order: 2,
        },
        {
          label: '週平均の感染者数',
          type: 'line',
          lineTension: 0,
          data: state.weeklyPatientTotalAverage.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
          order: 1,
        },
      ],
    };
  },
  weeklyInspectionTotalAverageOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '期間' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '平均の感染者数 (人)' },
            ticks: { beginAtZero: true, stepSize: 100 },
          },
        ],
      },
    };
  },
  weeklyPatientTotalAverageComparisonDataSets(state) {
    return {
      labels: state.weeklyPatientTotalAverageComparison.map(x => `${
        dateFns.format(x.firstDate, 'yyyy/MM/dd')
      } ~ ${
        dateFns.format(x.lastDate, 'yyyy/MM/dd')
      }`),
      datasets: [
        {
          label: '感染者数の増減',
          lineTension: 0,
          data: state.weeklyPatientTotalAverageComparison.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
  },
  weeklyPatientTotalAverageComparisonOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '期間' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '感染者数の増減 (人)' },
            ticks: { beginAtZero: true, stepSize: 100 },
          },
        ],
      },
    };
  },
  weeklyInspectionTotalAverageComparisonDataSets(state) {
    return {
      labels: state.weeklyInspectionTotalAverageComparison.map(x => `${
        dateFns.format(x.firstDate, 'yyyy/MM/dd')
      } ~ ${
        dateFns.format(x.lastDate, 'yyyy/MM/dd')
      }`),
      datasets: [
        {
          label: '週平均の検査数',
          data: state.weeklyInspectionTotalAverageComparison.map(x => x.count),
          backgroundColor: 'rgba(48, 128, 255, 1)',
          order: 2,
        },
        {
          label: '週平均の感染者数',
          type: 'line',
          lineTension: 0,
          data: state.weeklyPatientTotalAverageComparison.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
          order: 1,
        },
      ],
    };
  },
  weeklyInspectionTotalAverageComparisonOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '期間' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '平均の感染者数 (人)' },
            ticks: { beginAtZero: true, stepSize: 100 },
          },
        ],
      },
    };
  },
};
