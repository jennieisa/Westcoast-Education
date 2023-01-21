import ReactDOM from 'react-dom';

import AddNewForm from '../Admin/AddNewForm/AddNewForm';
import classes from './Modal.module.css';

const Overlay = () => {
    return <div className={classes["overlay"]}></div>
};

const ModalOverlay = (props) => {

    return(
        <AddNewForm >

        </AddNewForm>
    )
};

const Modal = (props) => {

    return (
        <div>
            {ReactDOM.createPortal(
                <Overlay />,
                document.querySelector("#overlay-root"),
            )}

            {ReactDOM.createPortal(
                <ModalOverlay 
                     
                />,
                document.querySelector("#modal-root"),
            )}
        </div>
    );
};

export default Modal;

