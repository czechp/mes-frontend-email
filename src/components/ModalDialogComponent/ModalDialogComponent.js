import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
const ModalDialogComponent = ({ visibility, header, body, acceptFunction, declineFunction }) => {
    const modalDialogComponentStyle = {
    }

    const modalDialogStyle = {
        color: "black",
    }

    const buttonStyle = {
        width: "30%"
    }
    return (
        <Modal style={modalDialogComponentStyle} show={visibility}>
            <Modal.Header style={modalDialogStyle}>{header}</Modal.Header>
            <Modal.Body style={{ fontSize: "small", ...modalDialogStyle }}>{body}</Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => acceptFunction()} style={buttonStyle} variant="outline-success">OK</Button>
                <Button onClick={() => declineFunction()} style={buttonStyle} variant="outline-danger">Anuluj</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDialogComponent