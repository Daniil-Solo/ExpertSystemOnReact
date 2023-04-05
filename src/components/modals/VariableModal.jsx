import React from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal"
import Input from "../UI/Input";
import Select from "../UI/Select";
import {VariableTypes} from "../../utils/constants/VariableTypes";
import DomainModal from "./DomainModal";


function VariableModal(props){
    const {domains, setDomains, isActive, setIsActive, addVariable} = props;
    const [label, setLabel] = React.useState("");
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState(null);
    const [domain, setDomain] = React.useState(null);

    const [isDomainOpenModal, setIsDomainOpenModal] = React.useState(false);

    const domainOptions = domains.map(domain => {
        return {
            label: domain.name,
            value: domain.name
        }
    })
    const addElementInner = () => {
        if (!variableIsValid())
            return;
        const newVariable = {label, name, type, domain};
        addVariable(newVariable);
        setIsActive(false);
        setName("");
        setLabel("");
        setDomain(null);
        setType(null);
    }

    const variableIsValid = () => {
        if (!label){
            toast.error("Для сохранения переменной необходимо заполнить поле Название");
            return false;
        } else if (!name){
            toast.error("Для сохранения переменной необходимо заполнить поле Короткое название");
            return false;
        } else if (!type){
            toast.error("Для сохранения переменной необходимо заполнить поле Тип переменной");
            return false;
        } else if (!domain){
            toast.error("Для сохранения переменной необходимо заполнить поле Домен");
            return false;
        } else{
            return true;
        }
    }

    const addDomain = (newDomain) => {
        setDomains([...domains, newDomain]);
        setDomain(newDomain.name);
    }

    return (
        <>
            <DomainModal isActive={isDomainOpenModal} setIsActive={setIsDomainOpenModal} addDomain={addDomain}/>
            <Modal isActive={isActive} setIsActive={setIsActive} title="Создание переменной" addElement={addElementInner}>
                <Input title="Название" value={label} changeValue={setLabel}/>
                <Input title="Короткое название" value={name} changeValue={setName}/>
                <Select title="Тип" activeValue={type} setActiveValue={setType} options={VariableTypes}/>
                <Select title="Домен" activeValue={domain} setActiveValue={setDomain} options={domainOptions} addNewElement={() => setIsDomainOpenModal(true)}/>
            </Modal>
        </>
        
    )
}

export default VariableModal;