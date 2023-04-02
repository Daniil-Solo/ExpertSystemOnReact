import SimplePanel from "../SimplePanel";
import Button from "../UI/Button";
import Input from "../UI/Input";
import React from "react";
import { toast } from "react-toastify";
import ItemList from "../ItemList";
import VariableItem from "./VariableItem";
import Select from "../UI/Select";
import {VariableTypes} from "../../utils/constants/VariableTypes"

function VariableContent(props){
    const {variables, setVariables, rules, domains} = props;
    const [label, setLabel] = React.useState("");
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState(null);
    const [domain, setDomain] = React.useState(null);

    const [selectedItem, setSelectedItem] = React.useState(-1);
    const [createMode, setCreateMode] = React.useState(true);

    const clearFields = () => {
        setLabel("");
        setName("");
        setType(null);
        setDomain(null);
    }
    const createNewVariable = () => {
        clearFields();
        setCreateMode(true);
    }
    const saveHandler = () => {
        const newVariable = {label, name, type, domain}
        if (createMode){
            if (!variableIsValid()){
                return
            }
            if (selectedItem === -1)
                setVariables([...variables, newVariable]);
            else
                setVariables([...variables.slice(0, selectedItem+1), newVariable, ...variables.slice(selectedItem+1)]);
            toast.success(`Переменная ${label} была успешно добавлена!`);
            clearFields();
        } else {
            const newVariables = JSON.parse(JSON.stringify(variables));
            newVariables[selectedItem] = newVariable;
            setVariables(newVariables);
            toast.success(`Переменная ${label} была успешно изменена!`);
        }
    }
    const deleteHandler = () => {
        setVariables([...variables.slice(0, selectedItem), ...variables.slice(selectedItem+1)]);
        toast.success(`Переменная ${label} была успешно удалена!`);
        clearFields();
        setCreateMode(true);
        setSelectedItem(-1);
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

    const selectVariable = (variable) => {
        setLabel(variable.label);
        setName(variable.name);
        setType(variable.type);
        setDomain(variable.domain);
        setCreateMode(false);
    }

    const domainOptions = domains.map(domain => {
        return {
            label: domain.name,
            value: domain.name
        }
    })

    return (
        <div style={{width: "878px", margin: "40px auto 0", display: "flex", justifyContent: "space-around", alignItems: "flex-start"}}>
            <div style={{width: "50%", paddingRight: "12px"}}>
                <SimplePanel title="Список переменных">
                    <Button title="Создать новую переменную" handleClick={createNewVariable}/>
                    <ItemList items={variables} selectItem={item => selectVariable(item)} SpecificItem={VariableItem}  selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </SimplePanel>
            </div>
            <div style={{width: "50%", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "24px"}}>
                <Input title="Название" value={label} changeValue={setLabel}/>
                <Input title="Короткое название" value={name} changeValue={setName}/>
                <Select title="Тип" activeValue={type} setActiveValue={setType} options={VariableTypes}/>
                <Select title="Домен" activeValue={domain} setActiveValue={setDomain} options={domainOptions}/>

                <div style={{display: "flex", gap: "24px"}}>
                    <Button title={createMode? "Создать": "Сохранить"} buttonType="success" handleClick={saveHandler}/>
                    {
                        createMode ||
                        <Button title="Удалить" buttonType="danger" handleClick={deleteHandler}/>
                    }
                </div>
            </div>
        </div>
      );
}

export default VariableContent;