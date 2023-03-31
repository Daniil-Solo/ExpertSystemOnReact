function TextArea(props){
    const {value, changeValue, title} = props;

    return(
        <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", position: "relative", borderRadius: "4px", padding: "12px 16px 4px"}}>
            <textarea type="text" style={{width: "100%", outline: "none", borderWidth: "0", fontSize: "14px", resize: "vertical", fontFamily: "Arial"}} rows="3" value={value} onChange={e => changeValue(e.target.value)} placeholder="Начните писать здесь..."/>
            <p style={{position: "absolute", left: "24px", top: "-9px", margin: "0", backgroundColor: "#FFFFFF", color: "#797979", fontSize: "14px"}}>
                {title}
            </p>
        </div>
    )
}

export default TextArea;