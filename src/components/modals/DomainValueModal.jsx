import React from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal"
import Input from "../UI/Input";

function DomainValueModal(props){
    const {isActive, setIsActive, addDomainValue} = props;
    const [label, setLabel] = React.useState("");
    const [value, setValue] = React.useState("");

    const addElementInner = () => {
        if (!domainValueIsValid())
            return;
        const newDomainValue = {label, value};
        addDomainValue(newDomainValue);
        setIsActive(false);
        setLabel("");
        setValue("");
    }
    const domainValueIsValid = () => {
        if (!label){
            toast.error("Для сохранения значения домена необходимо заполнить поле Название");
            return false;
        } else if (!value){
            toast.error("Для сохранения значения домена необходимо заполнить поле Значение");
            return false;
        } else{
            return true;
        }
    }

    return (
        <Modal isActive={isActive} setIsActive={setIsActive} title="Создание значения домена" addElement={addElementInner} zIndex={3}>
            <Input title="Название" value={label} changeValue={setLabel}/>
            <Input title="Значение" value={value} changeValue={setValue} type="number"/>
        </Modal>
    )
}

export default DomainValueModal;