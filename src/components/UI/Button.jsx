

function Button(props){
    const {title, handleClick, buttonType} = props;
    let bgColor = "#1976D2";
    if (buttonType === "success"){
        bgColor = "#4CAF50"
    } else if (buttonType === "danger"){
        bgColor = "#F44336"
    }
    return(
       <button style={{backgroundColor: bgColor, padding: "4px 12px", borderRadius: "4px", color: "#FFFFFF", alignSelf: "center", textDecoration: "none", border: "none", cursor: "pointer"}} onClick={handleClick} href="">
            {title}
       </button>
    )
}

export default Button;