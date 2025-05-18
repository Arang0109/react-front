import { useState, useEffect } from "react";
import { Tabs, Tab, Form } from "react-bootstrap";

import formatPollutantLabel from "shared/utils/formatPollutantLabel";
import groupByMethod from "shared/utils/groupByMethod";
import convertCycleType from "shared/utils/convertCycleType";

export default function StackMeasurementsList({ stackMeasurements, setSelectedMeasurements }) {
  const [checkedMap, setCheckedMap] = useState({});

  const methodOrder = ["먼지", "현장측정", "흡수액", "카트리지", "흡착관(T)", "흡착관(A)", "중금속", "비소", "수은"];

  const groupedByCycleType = stackMeasurements.reduce((acc, item) => {
    const key = item.cycleType || "nomeasure";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const handleCheckChange = (id) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const selectedIds = Object.entries(checkedMap)
      .filter(([_, checked]) => checked)
      .map(([id]) => Number(id));
  
    setSelectedMeasurements(selectedIds);
  }, [checkedMap, setSelectedMeasurements]);

  const allItems = Object.values(stackMeasurements)
    .flat()
    .filter(item => item.cycleType !== 'nomeasure');

  return (
    <Tabs
      defaultActiveKey="whole"
      id="stack-measurement-tabs"
      className="mb-3 custom-tab"
    >
      <Tab eventKey="whole" title={convertCycleType("whole")}>
        <Form>
          {(() => {
            const grouped = groupByMethod(allItems);
            return methodOrder
              .filter((method) => grouped[method])
              .map((method) => (
                <div key={method} style={{ marginBottom: "1rem" }}>
                  <h6 style={{ fontWeight: "bold", marginTop: "1rem" }}>{method}</h6>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    {grouped[method].map((item) => (
                      <Form.Check
                        style={{ minWidth: "240px" }}
                        type="checkbox"
                        label={formatPollutantLabel(item)}
                        key={item.stackMeasurementId}
                        id={`whole-${item.stackMeasurementId}`}
                        checked={!!checkedMap[item.stackMeasurementId]}
                        onChange={() => handleCheckChange(item.stackMeasurementId)}
                      />
                    ))}
                  </div>
                </div>
              ));
          })()}
        </Form>
      </Tab>
      {Object.entries(groupedByCycleType)
        .filter(([_, items]) => items.length > 0)
        .map(([key, items]) => {
          const groupedByMethod = groupByMethod(items);

        return (
          <Tab eventKey={key} title={convertCycleType(key)} key={key}>
            {methodOrder
              .filter((method) => groupedByMethod[method])
              .map((method) => {
                const methodItems = groupedByMethod[method];
                return (
                  <div key={method} style={{ marginBottom: "1rem" }}>
                    <h6 style={{ fontWeight: "bold", marginTop: "1rem" }}>{method}</h6>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                      {methodItems.map((item) => (
                        <Form.Check
                          style={{ minWidth: "240px" }}
                          type="checkbox"
                          label={formatPollutantLabel(item)}
                          key={item.stackMeasurementId}
                          id={`${key}-${item.stackMeasurementId}`}
                          checked={!!checkedMap[item.stackMeasurementId]}
                          onChange={() => handleCheckChange(item.stackMeasurementId)}
                          disabled={item.cycleType === 'nomeasure'}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </Tab>
        );
      })}
    </Tabs>
  );
}
