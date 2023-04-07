import SimplePanel from "../SimplePanel";
import Button from "../UI/Button";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import RuleOperation from "./RuleOperation"
import React from "react";
import { toast } from "react-toastify";
import ItemList from "../ItemList";
import RuleItem from "./RuleItem";

function RuleContent(props){
    const {rules, setRules, variables, setVariables, domains, setDomains} = props;
    const [name, setName] = React.useState("");
    const [reason, setReason] = React.useState("");
    const [conditions, setConditions] = React.useState([]);
    const [result, setResult] = React.useState(null);

    const [selectedItem, setSelectedItem] = React.useState(-1);
    const [createMode, setCreateMode] = React.useState(true);

    const clearFields = () => {
        setName("");
        setReason("");
        setConditions([]);
        setResult(null);
    }
    const createNewRule = () => {
        clearFields();
        setCreateMode(true);
    }
    const saveHandler = () => {
        if (createMode){
            if (!ruleIsValid()){
                return
            }
            const newRule = {name, reason, conditions, result}
            if (selectedItem === -1)
                setRules([...rules, newRule]);
            else
                setRules([...rules.slice(0, selectedItem+1), newRule, ...rules.slice(selectedItem+1)]);
            toast.success(`Правило ${name} было успешно добавлено!`);
            clearFields();
        } else {
            const newRule = {name, reason, conditions, result};
            const newRules = JSON.parse(JSON.stringify(rules));
            newRules[selectedItem] = {...newRules[selectedItem], ...newRule};
            setRules(newRules);
            toast.success(`Правило ${name} было успешно изменено!`);
        }
    }
    const deleteHandler = () => {
        setRules([...rules.slice(0, selectedItem), ...rules.slice(selectedItem+1)]);
        toast.success(`Правило ${name} было успешно удалено!`);
        clearFields();
        setCreateMode(true);
        setSelectedItem(-1);
    }
    const ruleIsValid = () => {
        if (!name){
            toast.error("Для сохранения правила необходимо заполнить поле Название");
            return false;
        } else if (!reason){
            toast.error("Для сохранения правила необходимо заполнить поле Пояснение");
            return false;
        } else if (!conditions.length){
            toast.error("Для сохранения правила необходимо добавить хотя бы одно условие");
            return false;
        } else if (!result){
            toast.error("Для сохранения правила необходимо установить заключение");
            return false;
        } else{
            return true;
        }
    }

    const setConditionVariable = (variableId, index) => {
        const newConditions = JSON.parse(JSON.stringify(conditions));
        newConditions[index].variableId = variableId;
        newConditions[index].valueId = null;
        setConditions(newConditions);
    }
    const setConditionValue = (domainValueId, index) => {
        const newConditions = JSON.parse(JSON.stringify(conditions));
        newConditions[index].valueId = domainValueId;
        setConditions(newConditions);
    }
    const deleteCondition = (conditionIndex) => {
        const newConditions = conditions.filter((_, index) => index !== conditionIndex)
        setConditions(newConditions);
    }
    const addCondition = () => {
        setConditions([...conditions, {variableId: null, valueId: null}]);
    }

    const setResultVariable = (variableId) => {
        setResult({variableId: variableId, valueId: null});
    }
    const setResultValue = (domainValueId) => {
        setResult({...result, valueId: domainValueId});
    }
    const deleteResult = () => {
        setResult(null);
    }
    const addResult = () => {
        setResult({variableId: null, valueId: null});
    }

    const selectRule = (rule) => {
        setName(rule.name);
        setReason(rule.reason);
        setConditions(rule.conditions);
        setResult(rule.result);
        setCreateMode(false);
    }

    return (
        <div style={{width: "878px", margin: "40px auto 0", display: "flex", justifyContent: "space-around", alignItems: "flex-start"}}>
            <div style={{width: "50%", paddingRight: "12px"}}>
                <SimplePanel title="Список правил">
                    <Button title="Создать новое правило" handleClick={createNewRule}/>
                    <ItemList items={rules} selectItem={item => selectRule(item)} SpecificItem={RuleItem} variables={variables} draggable={true} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </SimplePanel>
            </div>
            <div style={{width: "50%", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "24px"}}>
                <Input title="Название" value={name} changeValue={setName}/>
                <TextArea title="Пояснение" value={reason} changeValue={setReason}/>
                <SimplePanel title="Условия">
                    <Button title="Создать новое условие" handleClick={addCondition}/>
                    {
                        conditions.map(
                            (condition, index) => 
                            <RuleOperation key={index} activeVariable={condition.variableId} variables={variables} setVariable={variableId => setConditionVariable(variableId, index)} activeDomainValue={condition.valueId} domains={domains} setDomainValue={domainValueId => setConditionValue(domainValueId, index)} handleDelete={() => deleteCondition(index)} setVariables={setVariables} setDomains={setDomains}/>
                        )
                    }
                </SimplePanel>
                <SimplePanel title="Заключение">
                    {
                        result
                        ? <RuleOperation activeVariable={result.variableId} variables={variables} setVariable={variableId => setResultVariable(variableId)} activeDomainValue={result.valueId} domains={domains} setDomainValue={domainValueId => setResultValue(domainValueId)} handleDelete={deleteResult} setVariables={setVariables} setDomains={setDomains}/>
                        : <Button title="Создать заключение" handleClick={addResult}/>
                    }
                    
                </SimplePanel>
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

export default RuleContent;