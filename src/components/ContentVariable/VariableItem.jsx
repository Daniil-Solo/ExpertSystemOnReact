import {VariableTypes} from "../../utils/constants/VariableTypes"

function VariableItem(props){
    const {item: {label, domainId, type}, domains} = props;
    const variableType = VariableTypes.find(varType => varType.value === type);
    const variableTypeLabel = variableType? variableType.label: "";

    const domain = domains.find(domain => domain.id === domainId);
    const domainName = domain.name;

    return (
        <>
            <p style={{margin: "0", padding: "0"}}>
                {label}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Домен: {domainName}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Тип: {variableTypeLabel}
            </p>
        </>
    )
}

export default VariableItem;