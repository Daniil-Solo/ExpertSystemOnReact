function DomainItem(props){
    const {item: {name, domainValues}} = props;
    const domainValueLabels = domainValues.map(domainValue => domainValue.label);

    return (
        <>
            <p style={{margin: "0", padding: "0"}}>
                {name}
            </p>
            <p style={{margin: "0", padding: "0"}}>
                Значения: {domainValueLabels.join(", ")}
            </p>
        </>
    )
}

export default DomainItem;