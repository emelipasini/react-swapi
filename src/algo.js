function Detail() {
    const [show, setShow] = useState(false);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Custom Modal Styling
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Texto del modal</p>
            </Modal.Body>
        </Modal>
    );
}