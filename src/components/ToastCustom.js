import { Toast, ToastContainer } from "react-bootstrap";

const ToastCustom = ({active, setActive}) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  const toggleShowA = () => setActive(!active);
  return (
    <div>
      <ToastContainer className="p-3 text-white" position={'bottom-end'}>
        <Toast bg={'dark'} show={active} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Alerta</strong>
            <small>{currentDate}</small>
          </Toast.Header>
          <Toast.Body>Seleccione todos los campos de periodo</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ToastCustom;
