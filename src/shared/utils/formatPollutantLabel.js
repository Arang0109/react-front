const formatPollutantLabel = (item) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontWeight: "bold" }}>
        {item.method === "중금속" ? item.pollutantNameEN : item.pollutantNameKR}
      </span>
      <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "#6c757d" }}>
        {item.allowValue != null && (
          <span>허용기준치 : {item.allowValue} ppm</span>
        )}
        {item.oxygenConcentration != null && (
          <span>표준산소농도 : {item.oxygenConcentration} %</span>
        )}
      </div>
    </div>
  );
};


export default formatPollutantLabel;
