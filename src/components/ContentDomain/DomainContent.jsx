import SimplePanel from "../SimplePanel";
import Button from "../UI/Button";
import Input from "../UI/Input";
import NoEditableProperty from "../UI/NoEditableProperty";
import React from "react";
import { toast } from "react-toastify";
import ItemList from "../ItemList/ItemList";
import DomainItem from "./DomainItem";
import DomainValue from "./DomainValue";

function DomainContent(props){
    const {domains, setDomains, variables, rules} = props;
    const [name, setName] = React.useState("");
    const [domainValues, setDomainValues] = React.useState([]);

    const [selectedItem, setSelectedItem] = React.useState(-1);
    const [createMode, setCreateMode] = React.useState(true);

    const clearFields = () => {
        setName("");
        setDomainValues([]);
    }
    const createNewDomain = () => {
        clearFields();
        setCreateMode(true);
    }
    const saveHandler = () => {
        const newDomain = {name, domainValues}
        if (createMode){
            if (!domainIsValid()){
                return
            }
            if (selectedItem === -1)
                setDomains([...domains, newDomain]);
            else
                setDomains([...domains.slice(0, selectedItem+1), newDomain, ...domains.slice(selectedItem+1)]);
            toast.success(`Домен ${name} был успешно добавлен!`);
            clearFields();
        } else {
            const newDomains = JSON.parse(JSON.stringify(domains));
            newDomains[selectedItem] = {...newDomains[selectedItem], ...newDomain};
            setDomains(newDomains);
            toast.success(`Домен ${name} был успешно изменен!`);
        }
    }
    const deleteHandler = () => {
        if (variables.map(variable => variable.label).length){
            toast.error("Домен используется для переменной!");
        } else {
            setDomains([...domains.slice(0, selectedItem), ...domains.slice(selectedItem+1)]);
            toast.success(`Домен ${name} был успешно удален!`);
            clearFields();
            setCreateMode(true);
            setSelectedItem(-1);
        }
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
    const selectDomain = (domain) => {
        setName(domain.name);
        domain.domainValues.forEach((domainValue, index) => {
            domain.domainValues[index].rules = rules.map(rule => {
                const ruleVariables = [rule.result, ...rule.conditions];
                const ruleVariableDomainValues = ruleVariables.map(ruleVariable => ruleVariable.valueId);
                if (ruleVariableDomainValues.includes(domainValue.id)){
                    return rule.name;
                } else {
                    return null;
                }
            }).filter(item => item !== null);
        })
        setDomainValues(domain.domainValues);
        setCreateMode(false);
    }

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
        if (domainValues[domainValueIndex].rules !== undefined && domainValues[domainValueIndex].rules.length){
            toast.error("Значение домена участвует в правиле!");
        } else {
            const newDomainValues = domainValues.filter((_, index) => index !== domainValueIndex)
            setDomainValues(newDomainValues);
        }
    }

    return (
        <div style={{width: "878px", margin: "40px auto 0", display: "flex", justifyContent: "space-around", alignItems: "flex-start"}}>
            <div style={{width: "50%", paddingRight: "12px"}}>
                <SimplePanel title="Список доменов">
                    <Button title="Создать новый домен" handleClick={createNewDomain}/>
                    <ItemList items={domains} selectItem={item => selectDomain(item)} SpecificItem={DomainItem}  selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </SimplePanel>
            </div>
            <div style={{width: "50%", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "24px"}}>
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
                {
                    createMode ||
                    <SimplePanel title="Где используется">
                        <NoEditableProperty title="Переменные:" value={variables.map(variable => variable.label).join(", ")}/>
                        {
                            domainValues.map((domainValue, index) => (
                                <NoEditableProperty key={index} title={"Значение \"" + domainValue.label + "\":"} value={domainValue.rules !== undefined && domainValue.rules.length? domainValue.rules.join(", "): "не используется"}/>
                            ))
                        }
                    </SimplePanel>
                }
                
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

export default DomainContent;