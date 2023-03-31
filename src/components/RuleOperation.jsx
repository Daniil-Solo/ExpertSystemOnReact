import Select from "./Select";

function RuleOption(props){
    const {activeValue1, values1, handleValue1, activeValue2, values2, handleValue2, handleDelete} = props;
    return (
        <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", borderRadius: "4px", padding: "12px 16px", display: "flex", flexDirection: "row", gap: "8px"}}>
            <div style={{flex: "1 1 auto", display: "flex", gap: "4px", alignItems: "center"}}>
                <Select activeValue={activeValue1} values={values1} handleValue={handleValue1}/>
                <p style={{width: "16px", height: "16px", borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", backgroundColor: "#1976D2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0", fontWeight: "bold", padding: "0 4px"}}>=</p>
                <Select activeValue={activeValue2} values={values2} handleValue={handleValue2}/>
            </div>
            <img style={{cursor: "pointer"}} src="delete.svg" alt="" onClick={handleDelete} />
        </div>
    )
}

export default RuleOption;