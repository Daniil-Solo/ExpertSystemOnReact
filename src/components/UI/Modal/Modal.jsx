import Button from "../Button";
import "./modal.css"
function Modal(props){
    const {isActive, setIsActive, addElement, title, children} = props;
    const closeModal = () => {
        setIsActive(false);
    }
    const addElementAndClose = () => {
        addElement();
        closeModal();
    }
    return (
        <div className={isActive? "modal active": "modal"} onClick={closeModal}>
            <div className={isActive? "modal__content active": "modal__content"} onClick={e => e.stopPropagation()}>
                <p className="modal__header">
                    {title}
                    <img src="close.svg" alt="" className="modal__close" onClick={closeModal}/>
                </p>
                <div className="modal__body">
                    {children}
                </div>
                <div className="modal__footer">
                    <Button title="Добавить" handleClick={addElementAndClose} buttonType="success"/>
                    <Button title="Отмена" handleClick={closeModal} buttonType="danger"/>
                </div>
            </div>
        </div>
        
    )
}

export default Modal;