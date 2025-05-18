import { Accordion } from 'react-bootstrap';

export default function CustomAccordion({ title, children }) {

	return(
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>{title}</Accordion.Header>
				<Accordion.Body>
					{children}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	)
}