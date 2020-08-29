/**
 * generate an array for pie chart background color
 * @param {Number} length of the array
 * @return {Array} the array of color
 */
function getPieChartBackGroundColors(length)
{
  const colors = [];
  for (let i = 0; i < length; i++) {
    const color = 0xa0 * (i % 2)
    const rgb = new Uint8Array(3);
   switch (i % 6) {
      case 0:
      case 1:
        rgb[0] = 0xc8 - (0x40 * Math.floor(i / 6));
        rgb[1] = color;
        rgb[2] = 0x00 + (0x20 * Math.floor(i / 6));
        break;
      case 2:
      case 3:
        rgb[0] = 0x00 + (0x20 * Math.floor(i / 6));
        rgb[1] = 0xc8 - (0x40 * Math.floor(i / 6));
        rgb[2] = color;
        break;
     case 4:
     case 5:
        rgb[0] = color;
        rgb[1] = 0x00 + (0x20 * Math.floor(i / 6));
        rgb[2] = 0xc8 - (0x40 * Math.floor(i / 6));
        break;
    }
    colors.push(`rgb(${rgb.join()})`);
  }
  return colors;
}

import * as dateFns from 'date-fns';

export default {
  ageLabels(state) {
    return _.chain(state.agePatientsCount)
      .filter(x => x.age >= 0)
      .map(x => ({
        age: x.age,
        label: (x.age > 0) ? `${x.age}代` : '10代未満',
      }))
      .value();
  },
  agePatientsCountDataSets(state) {
    const ageRangeLength = _.chain(state.agePatientsCount)
      .filter(x => x.age >= 0)
      .keys()
      .value()
      .length;
    return {
      labels: state.agePatientsCount
        .map(x => x.age > 0 ? `${x.age}代` : '10代未満'),
      datasets: [
        {
          data: state.agePatientsCount.map(x => x.count),
          backgroundColor: getPieChartBackGroundColors(ageRangeLength),
        },
      ],
    };
  },
  agePatientsCountOptions(state) {
    return {
      title: {
        display: true,
        text: '年代',
      },
    };
  },
  dailyAgePatientsTotalDatasets(state, getters) {
    const dailyAgeData = getters.ageLabels.map((ageLabel, index) => ({
      label: ageLabel.label,
      lineTension: 0,
      data: state.dailyAgePatientsTotal.map(
        data => data.ageCounts.find(x => x.age === ageLabel.age).count ?? 0
      ),
      borderColor: getPieChartBackGroundColors(getters.ageLabels.length)[index],
    }));
    return {
      labels: state.dailyAgePatientsTotal.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: dailyAgeData,
    };
  },
  dailyAgePatientsTotalOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
          },
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '陽性者数 (人)' },
            ticks: { beginAtZero: true, stepSize: 5 },
          },
        ],
      },
    };
  },
  dailyAgePatientsTotalWithInspectationDatasets(state, getters) {
    const dailyAgeData = getters.ageLabels.map((ageLabel, index) => ({
      label: ageLabel.label,
      type: 'line',
      lineTension: 0,
      data: state.dailyAgePatientsTotal.map(
        data => data.ageCounts.find(x => x.age === ageLabel.age).count ?? 0
      ),
      borderColor: getPieChartBackGroundColors(getters.ageLabels.length)[index],
      order: 1,
    }));
    return {
      labels: state.dailyAgePatientsTotal.map(
        x => dateFns.format(x.date, 'yyyy/MM/dd')
      ),
      datasets: _.union(dailyAgeData, [
        {
          label: '検査人数',
          data: state.dailyAgePatientsTotal.map(x => x.count),
          backgroundColor: 'rgb(96, 96, 96)',
          order: 2,
        },
      ]),
    };
  },
  dailyAgePatientsTotalWithInspectationOptions(state) {
    return {
      scales: {
        xAxes: [
          {
            scaleLabel: { display: true, labelString: '日付' },
          },
        ],
        yAxes: [
          {
            scaleLabel: { display: true, labelString: '検査数 (人)' },
            ticks: { beginAtZero: true, stepSize: 100 },
          },
        ],
      },
    };
  },
};

