function NoEditableProperty(props){
    const {title, value} = props;
    return (
        <div style={{fontSize: "14px", display: "flex", gap: "16px"}}>
            <p style={{color: "#797979", margin: "0"}}>{title}</p>
            <p style={{color: "#00000", margin: "0"}}>{value}</p>
        </div>
    )
}   

export default NoEditableProperty;