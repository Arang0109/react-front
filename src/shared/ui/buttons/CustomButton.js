import { Button } from 'react-bootstrap';

export default function CustomButton({ text, onClick }) {
	return(
    <Button 
        className="m-1"
        style={{
          color: 'var(--btn-variant)',
          borderColor: 'var(--btn-variant)'
        }}
        variant='outline'
        size="sm" onClick={onClick}>{text}</Button>
	);
}