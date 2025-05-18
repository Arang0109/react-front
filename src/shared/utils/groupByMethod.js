const groupByMethod = (items) => {
  return items.reduce((acc, item) => {
    const key = item.method? item.method : "기타";
    if (!acc[key]) acc[key] = [];
    acc[key] = [...acc[key], item];
    return acc;
  }, {});
};

export default groupByMethod;