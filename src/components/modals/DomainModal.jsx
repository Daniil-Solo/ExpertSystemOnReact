import React from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal"
import Input from "../UI/Input";
import SimplePanel from "../SimplePanel";
import Button from "../UI/Button";
import DomainValue from "../ContentDomain/DomainValue";

function DomainModal(props){
    const {isActive, setIsActive, addDomain} = props;
    const [name, setName] = React.useState("");
    const [domainValues, setDomainValues] = React.useState([]);

    const addDomainValue = () => {
        setDomainValues([...domainValues, {label: "", value: ""}]);
    }
    const setDomainValueValue = (newValue, index) => {
        const newDomainValues = JSON.parse(JSON.stringify(domainValues));
        newDomainValues[index].value = newValue;
        setDomainValues(newDomainValues);
    }
    const setDomainValueLabel = (newLabel, index) => {
        const newDomainValues = JSON.parse(JSON.stringify(domainValues));
        newDomainValues[index].label = newLabel;
        setDomainValues(newDomainValues);
    }
    const deleteDomainValue = (domainValueIndex) => {
        const newDomainValues = domainValues.filter((_, index) => index !== domainValueIndex)
        setDomainValues(newDomainValues);
    }

    const addElementInner = () => {
        if (!domainIsValid())
            return;
        const newDomain = {name, domainValues};
        addDomain(newDomain);
        setIsActive(false);
        setName("");
        setDomainValues([]);
    }
    const domainIsValid = () => {
        if (!name){
            toast.error("Для сохранения домена необходимо заполнить поле Название");
            return false;
        } else if (!domainValues.length){
            toast.error("Для сохранения домена необходимо добавить хотя бы одно значение");
            return false;
        } else{
            return true;
        }
    }

    return (
        <Modal isActive={isActive} setIsActive={setIsActive} title="Создание домена" addElement={addElementInner} zIndex={3}>
            <Input title="Название" value={name} changeValue={setName}/>
            <SimplePanel title="Список значений">
                <Button title="Создать новое значение" handleClick={addDomainValue}/>
                {
                    domainValues.map(
                        (domainValue, index) => 
                        <DomainValue key={index} value={domainValue.value} setValue={value => setDomainValueValue(value, index)} label={domainValue.label} setLabel={label => setDomainValueLabel(label, index)} handleDelete={() => deleteDomainValue(index)}/>
                    )
                }
            </SimplePanel>
        </Modal>
    )
}

export default DomainModal;