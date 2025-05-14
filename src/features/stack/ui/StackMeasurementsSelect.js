import { useState, useEffect } from 'react';
import Select from 'react-select';

import { fetchPollutantList } from 'features/pollutant/api/PollutantApi';
import groupByMethod from 'shared/utils/groupByMethod';
import customSelectStyle from 'shared/utils/customSelectStyle';

const { singleStyle } = customSelectStyle(); 

export default function StackMeasurementsSelect({ onChange, excludedIds = [] }) {
  const [pollutants, setPollutants] = useState([]);

  useEffect(() => {
    fetchPollutantList().then((res) => {
      const grouped = groupByMethod(res.data)

      setPollutants(grouped);
    });
  }, []);

  const groupedOptions = Object.entries(pollutants).map(([method, list]) => ({
    label: method,
    options: list
    .filter(p => !excludedIds.includes(p.pollutantId))
    .map(p => ({
      value: p.pollutantId,
      label: p.pollutantNameEN? `${p.pollutantNameKR}(${p.pollutantNameEN})` : p.pollutantNameKR,
      searchableNames: [p.pollutantNameKR, p.pollutantNameEN]
    }))
  }));
  
  const customFilterOption = (option, rawInput) => {
    const input = rawInput.toLowerCase();
    return option.data.searchableNames.some(name =>
      name?.toLowerCase().includes(input)
    );
  };

  return(
    <Select
      closeMenuOnSelect={false}
      options={groupedOptions}
      filterOption={customFilterOption}
      placeholder="항목을 선택하세요"
      styles={singleStyle}
      onChange={onChange}
    />
  );
}