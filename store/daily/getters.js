import * as dateFns from 'date-fns';

export default {
  dailyPatientTotalDataSets(state) {
    return {
      labels: state.dailyPatientTotal.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: [
        {
          label: '感染者数',
          lineTension: 0,
          data: state.dailyPatientTotal.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
  },
  dailyPatientTotalOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '感染者数 (人)' },
            ticks: { beginAtZero: true, stepSize: 10 },
          },
        ],
      },
    };
  },
  dailyPatientRatioDataSets(state) {
     return {
      labels: state.dailyPatientRatio.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: [
        {
          label: '感染者率',
          lineTension: 0,
          data: state.dailyPatientRatio.map(
            x => Math.round(x.count * 10000) / 100
          ),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
  },
  dailyPatientRatioOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
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
  dailyInspectionTotalDataSets(state) {
    return {
      labels: state.dailyInspectionTotal.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: [
        {
          label: '検査人数',
          data: state.dailyInspectionTotal.map(x => x.count),
          backgroundColor: 'rgba(48, 128, 255, 1)',
          order: 2,
        },
        {
          label: '感染者数',
          type: 'line',
          lineTension: 0,
          data: state.dailyPatientTotal.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
          order: 1,
        },
      ],
    };
  },
  dailyInspectionTotalOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '検査人数 (人)' },
            ticks: { beginAtZero: true, stepSize: 100 },
          },
        ],
      },
    };
  },
  dailyPatientTotalComparisonDataSets(state) {
    return {
      labels: state.dailyPatientTotalComparison.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: [
        {
          label: '感染者数の増減',
          lineTension: 0,
          data: state.dailyPatientTotalComparison.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
  },
  dailyPatientTotalComparisonOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '感染者数の増減 (人)' },
            ticks: { beginAtZero: true, stepSize: 10 },
          },
        ],
      },
    };
  },
  dailyPatientRatioComparisonDataSets(state) {
    return {
      labels: state.dailyPatientRatioComparison.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: [
        {
          label: '感染者率の増減',
          lineTension: 0,
          data: state.dailyPatientRatioComparison.map(
            x => Math.round(x.count * 10000) / 100
          ),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };

  },
  dailyPatientRatioComparisonOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
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
  dailyInspectionTotalComparisonDataSets(state) {
    return {
      labels: state.dailyPatientTotalComparison.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: [
        {
          label: '検査数の増減',
          data: state.dailyInspectionTotalComparison.map(x => x.count),
          backgroundColor: 'rgba(48, 128, 255, 1)',
          order: 2,
        },
        {
          label: '感染者数の増減',
          type: 'line',
          lineTension: 0,
          data: state.dailyPatientTotalComparison.map(x => x.count),
          borderColor: 'rgba(255, 255, 255, 1)',
          order: 1,
        },
      ],
    };

  },
  dailyInspectionTotalComparisonOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
          }
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '検査数の増減 (人)' },
            ticks: { beginAtZero: true, stepSize: 100 },
          },
        ],
      },
    };
  },
};

