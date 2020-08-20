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

export default {
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
};

