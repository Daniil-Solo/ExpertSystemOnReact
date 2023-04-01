import Select from "../UI/Select";
import React from "react";

function RuleOperation(props){
    const {variables, domains, activeVariable, setVariable, activeDomainValue, setDomainValue, handleDelete} = props;
    const variableOptions = variables.map(variable => {
        return {
          label: variable.label,
          value: variable.name
        }
    });
    const getDomainValueOptions = () => {
        const variable = variables.find(item => item.name === activeVariable);
        if (!variable)
            return []
        const domain = domains.find(item => item.name === variable.domain);
        if (!domain)
            return []
        return domain.domainValues.map(item => {
            return {
                label: item.label,
                value: item.value
            }
        })
    }
    const domainValueOptions = getDomainValueOptions();
    

    return (
        <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", borderRadius: "4px", padding: "12px 16px", display: "flex", flexDirection: "row", gap: "16px"}}>
            <div style={{flex: "1 1 auto", display: "flex", gap: "4px", alignItems: "center"}}>
                <Select activeValue={activeVariable} options={variableOptions} setActiveValue={setVariable}/>
                <p style={{width: "16px", height: "16px", borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", backgroundColor: "#1976D2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0", fontWeight: "bold", padding: "0 4px"}}>=</p>
                <Select activeValue={activeDomainValue} options={domainValueOptions} setActiveValue={setDomainValue}/>
            </div>
            <img style={{cursor: "pointer"}} src="delete.svg" alt="" onClick={handleDelete} />
        </div>
    )
}

export default RuleOperation;