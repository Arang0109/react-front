export default function convertCycleType(key) {
  const map = {
    monthly: "1회/월",
    twiceamonth: "2회/월",
    onceinfebruary: "1회/2월",
    quarterly: "1회/분기",
    semiannual: "1회/반기",
    annual: "1회/연",
    additional: "추가측정",
    nomeasure: "미측정",
    whole: "전체"
  };
  return map[key] || key;
}