export default function(callback) {
  const arr = this;
  if (arr.length < 2) return [];
  const diffArr = [];
  for (let i = 1; i < arr.length; i++) {
    diffArr.push(callback(arr[i-1], arr[i]));
  }
  return diffArr;
};

