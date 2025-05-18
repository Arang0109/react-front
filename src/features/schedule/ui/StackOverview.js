import { Card } from 'react-bootstrap';
import { FaIndustry, FaBriefcaseMedical, FaHistory  } from 'react-icons/fa';
import { BsCardHeading } from "react-icons/bs";

import { formatters } from 'shared/utils/formatters';

export default function StackOverview({ stack }) {
  const stackInformationLabels = {
    diameter: stack.stackInformation?.stackShape === '사각형' ? '가로' : '직경',
    diameter2: '세로',
    quantity: '설계 유량(Q)',
    height: '굴뚝 높이(H)',
    stackShape: '굴뚝 모양',
    stackDirection: '굴뚝 방향',
  };

  const formatterMapping = {
    diameter: 'height',
    diameter2: 'height',
    height: 'height',
    quantity: 'quantity',
    stackSize: 'facilitySize',
  };

  const excludeKeys = ['stackId'];

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4 d-flex align-items-center gap-2 fs-5">
          <FaIndustry /> 배출시설 상세
        </Card.Title>

        <div className="mb-2">
          <strong>시설명:</strong> {stack.stackName ?? '-'}
        </div>
        <div className="mb-2">
          <strong>종류:</strong> {stack.stackType ?? '-'}
        </div>
        <div className="mb-2">
          <strong>종별:</strong> {stack.stackSize ? formatters.facilitySize.format(stack.stackSize) : '-'}
        </div>

        <hr />

        <div className="mb-2 d-flex align-items-center gap-2">
          <FaBriefcaseMedical />
          <div>
            <strong>방지시설:</strong> {stack.prevention ?? '-'}<br />
            <strong>용량:</strong> {stack.preventionCapacity ? formatters.quantity.format(stack.preventionCapacity) : '-'}
          </div>
        </div>

        <hr />

        <BsCardHeading /> <strong>배출시설 재원</strong>
        {stack.stackInformation &&
          Object.entries(stack.stackInformation)
          .filter(([key]) => {
            if (key === 'diameter2' && stack.stackInformation.stackShape !== '사각형') {
              return false;
            }
            return !excludeKeys.includes(key);
          })
          .map(([key, value]) => {
            const formatterKey = formatterMapping[key];
            const formattedValue = formatterKey && formatters[formatterKey]
              ? formatters[formatterKey].format(value)
              : value;
            
              return (
                <div key={key} className="mb-1">
                  <strong>{stackInformationLabels[key] ?? key}:</strong> {formattedValue}
                </div>
              );
          })}

          <hr />

          <div className="mb-2 align-items-center">
          <FaHistory /> History
        </div>
      </Card.Body>
    </Card>
  );
}
