function SimplePanel(props){
    const {title, children} = props;
    return (
        <div style={{borderWidth: "1px", borderStyle: "solid", backgroundColor: "#FFFFFF", borderColor: "#E6ECF4", position: "relative", borderRadius: "4px", padding: "16px 24px"}}>
            <p style={{position: "absolute", left: "24px", top: "-9px", margin: "0", backgroundColor: "#FFFFFF", color: "#797979", fontSize: "14px"}}>
                {title}
            </p>
            {children}
        </div>
    )
}

export default SimplePanel;