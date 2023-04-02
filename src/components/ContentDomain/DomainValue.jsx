import Input from "../UI/Input";

function DomainValue(props){
    const {value, setValue, label, setLabel, handleDelete} = props;
    return (
        <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", borderRadius: "4px", padding: "12px 16px", display: "flex", flexDirection: "row", gap: "16px"}}>
            <div style={{flex: "1 1 auto", display: "flex", gap: "4px", alignItems: "center"}}>
                <Input title="Название" value={label} changeValue={setLabel}/>
                <Input title="Значение" value={value} changeValue={setValue}/>
            </div>
            <img style={{cursor: "pointer"}} src="delete.svg" alt="" onClick={handleDelete} />
        </div>
    )
}

export default DomainValue;