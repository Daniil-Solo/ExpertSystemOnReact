function Input(props){
    const {value, changeValue, title, type="text"} = props;

    return(
        <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", position: "relative", borderRadius: "4px", padding: "12px 16px 4px"}}>
            <input type={type} style={{width: "100%", outline: "none", borderWidth: "0", fontSize: "14px"}} value={value} onChange={e => changeValue(e.target.value)} placeholder={type==="text"? "Начните писать здесь..." : "Введите число"}/>
            <p style={{position: "absolute", left: "24px", top: "-9px", margin: "0", backgroundColor: "#FFFFFF", color: "#797979", fontSize: "14px"}}>
                {title}
            </p>
        </div>
    )
}

export default Input;