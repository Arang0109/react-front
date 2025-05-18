import { Modal } from 'react-bootstrap';
import { CustomButton } from 'shared/ui/buttons';

export default function ModalContainer({
  show,
  onClose,
  onSubmit,
  title,
  size="md",
  children
}) {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <CustomButton text="취소" onClick={onClose} />
        <CustomButton text="등록" onClick={onSubmit} />
      </Modal.Footer>
    </Modal>
  );
}