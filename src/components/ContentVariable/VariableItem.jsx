import {VariableTypes} from "../../utils/constants/VariableTypes"

function VariableItem(props){
    const {item: {label, domain, type}} = props;
    const variableType = VariableTypes.find(varType => varType.value === type);
    const variableTypeLabel = variableType? variableType.label: "";

    return (
        <>
            <p style={{margin: "0", padding: "0"}}>
                {label}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Домен: {domain}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Тип: {variableTypeLabel}
            </p>
        </>
    )
}

export default VariableItem;