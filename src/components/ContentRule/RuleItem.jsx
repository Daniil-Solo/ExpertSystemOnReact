function RuleItem(props){
    const {item: {name, conditions, result}, variables} = props;
    const conditionLabels = [];
    conditions.forEach(condition => {
        const conditionVariable = variables.find(variable => variable.id === condition.variableId);
        conditionLabels.push(conditionVariable.label);
    });
    const resultLabel = variables.find(variable => variable.id === result.variableId).label;

    return (
        <>
            <p style={{margin: "0", padding: "0"}}>
                {name}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Требует: {conditionLabels.join(", ")}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Изменяет: {resultLabel}
            </p>
        </>
    )
}

export default RuleItem;