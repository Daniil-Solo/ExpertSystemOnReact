import Select from "../UI/Select";
import React from "react";
import VariableModal from "../modals/VariableModal";
import DomainValueModal from "../modals/DomainValueModal";

function RuleOperation(props){
    const {variables, setVariables, domains, setDomains, activeVariable, setVariable, activeDomainValue, setDomainValue, handleDelete} = props;
    const variableOptions = variables.map(variable => {
        return {
          label: variable.label,
          value: variable.id
        }
    });
    const getDomainValueOptions = () => {
        const variable = variables.find(item => item.id === activeVariable);
        if (!variable)
            return []
        const domain = domains.find(item => item.id === variable.domainId);
        if (!domain)
            return []
        return domain.domainValues.map(item => {
            return {
                label: item.label,
                value: item.id
            }
        })
    }
    const domainValueOptions = getDomainValueOptions();
    
    const [isVariableOpenModal, setIsVariableOpenModal] = React.useState(false);
    const addVariable = (newVariable) => {
        setVariables([...variables, newVariable]);
        setVariable(newVariable.id);
    }

    const [isDomainValueOpenModal, setIsDomainValueOpenModal] = React.useState(false);
    const addDomainValue = (newDomainValue) => {
        const variable = variables.find(item => item.id === activeVariable);
        const domainIndex = domains.findIndex(item => item.id === variable.domainId);
        const newDomains = JSON.parse(JSON.stringify(domains));
        newDomains[domainIndex].domainValues.push(newDomainValue)
        setDomains(newDomains)
        setDomainValue(newDomainValue.id);
    }

    return (
        <>
            <VariableModal domains={domains} setDomains={setDomains} isActive={isVariableOpenModal} setIsActive={setIsVariableOpenModal} addVariable={addVariable}/>
            <DomainValueModal isActive={isDomainValueOpenModal} setIsActive={setIsDomainValueOpenModal} addDomainValue={addDomainValue}/>
            <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", borderRadius: "4px", padding: "12px 16px", display: "flex", flexDirection: "row", gap: "16px"}}>
                <div style={{flex: "1 1 auto", display: "flex", gap: "4px", alignItems: "center"}}>
                    <Select title="Переменная" activeValue={activeVariable} options={variableOptions} setActiveValue={setVariable} addNewElement={() => setIsVariableOpenModal(true)}/>
                    <p style={{width: "16px", height: "16px", borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", backgroundColor: "#1976D2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0", fontWeight: "bold", padding: "0 4px"}}>=</p>
                    <Select title="Значение" activeValue={activeDomainValue} options={domainValueOptions} setActiveValue={activeVariable !== null? setDomainValue: null} addNewElement={() => setIsDomainValueOpenModal(true)}/>
                </div>
                <img style={{cursor: "pointer"}} src="delete.svg" alt="" onClick={handleDelete} />
            </div>            
        </>
        
    )
}

export default RuleOperation;