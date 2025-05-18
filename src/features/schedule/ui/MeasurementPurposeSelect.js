import Select from 'react-select'
import { Form } from 'react-bootstrap';

import customSelectStyle from 'shared/utils/customSelectStyle'; 

const { singleStyle } = customSelectStyle();

const purpose = [
  { value: '자가측정용', label: '자가측정용' },
  { value: '기타참고용', label: '기타참고용' },
]

export default function MeasurementPurposeSelect() {
  return(
    <Form.Group className="mb-3" controlId="measurementPurpose">
      <Form.Label className='common-label'>측정 용도</Form.Label>
      <Select
        options={purpose}
        styles={singleStyle}
        defaultValue={purpose[0]}
      />
    </Form.Group>
    
  );
}