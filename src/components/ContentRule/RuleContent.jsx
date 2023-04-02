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
    const {rules, setRules, variables, domains} = props;
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
            newRules[selectedItem] = newRule;
            setRules(newRules);
            toast.success(`Правило ${name} было успешно изменено!`);
        }
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

    const setConditionVariable = (variableName, index) => {
        const newConditions = JSON.parse(JSON.stringify(conditions));
        newConditions[index].variable = variableName;
        newConditions[index].value = null;
        setConditions(newConditions);
    }
    const setConditionValue = (domainValue, index) => {
        const newConditions = JSON.parse(JSON.stringify(conditions));
        newConditions[index].value = domainValue;
        setConditions(newConditions);
    }
    const deleteCondition = (conditionIndex) => {
        const newConditions = conditions.filter((_, index) => index !== conditionIndex)
        setConditions(newConditions);
    }
    const addCondition = () => {
        setConditions([...conditions, {variable: null, value: null}]);
    }

    const setResultVariable = (variableName) => {
        setResult({variable: variableName, value: null});
    }
    const setResultValue = (domainValue) => {
        setResult({...result, value: domainValue});
    }
    const deleteResult = () => {
        setResult(null);
    }
    const addResult = () => {
        setResult({variable: null, value: null});
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
                            <RuleOperation key={index} activeVariable={condition.variable} variables={variables} setVariable={variableName => setConditionVariable(variableName, index)} activeDomainValue={condition.value} domains={domains} setDomainValue={domainValue => setConditionValue(domainValue, index)} handleDelete={() => deleteCondition(index)}/>
                        )
                    }
                </SimplePanel>
                <SimplePanel title="Заключение">
                    {
                        result
                        ? <RuleOperation activeVariable={result.variable} variables={variables} setVariable={variableName => setResultVariable(variableName)} activeDomainValue={result.value} domains={domains} setDomainValue={domainValue => setResultValue(domainValue)} handleDelete={deleteResult}/>
                        : <Button title="Создать заключение" handleClick={addResult}/>
                    }
                    
                </SimplePanel>
                <div style={{display: "flex", gap: "24px"}}>
                    <Button title={createMode? "Создать": "Сохранить"} buttonType="success" handleClick={saveHandler}/>
                    {
                        createMode ||
                        <Button title="Удалить" buttonType="danger" handleClick={() => alert("Удалить")}/>
                    }
                </div>
            </div>
        </div>
      );
}

export default RuleContent;