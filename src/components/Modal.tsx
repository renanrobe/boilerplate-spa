import { Button, Modal } from "react-bootstrap"

export const CustomModal = (props: any) => {
  return (
    <>
      <Modal as={Modal.Dialog} centered show={props.show} onHide={props.close}>
        <Modal.Header>
          <Modal.Title className="h6">{props.Title}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={props.close} />
        </Modal.Header>
        <Modal.Body>{props.Message}</Modal.Body>
        <Modal.Footer>
          {props.children}
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={props.close}
          >
            {props.cancel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
