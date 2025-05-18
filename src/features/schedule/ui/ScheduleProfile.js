import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import { formatters } from 'shared/utils/formatters';

export default function ScheduleProfile({ subSchedules }) {
  const [readOnly, setReadOnly] = useState(true);

  const mainRegNumber = subSchedules?.[0]?.mainRegNumber ?? "";


  return(
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">접수번호 :</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={readOnly
              ? formatters.regNumber.format(mainRegNumber)
              : subSchedules?.[0]?.mainRegNumber ?? ''}
            readOnly={readOnly}
            placeholder="ex. 001" />
        </Col>
      </Form.Group>
    </Form>
  );
}