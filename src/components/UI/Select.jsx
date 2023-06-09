import React from "react";

function Select(props){
    const {activeValue, setActiveValue, options, title, addNewElement} = props;
    const [isOpenedList, setIsOpenedList] = React.useState(false);
    const activeOption = options.find(option => option.value === activeValue);
    const activeLabel = activeOption? activeOption.label: "Выбрать";

    return (
        <div style={{backgroundColor: "#FFFFFF", color: "#000000", position: "relative", width: "100%", height: "24px", borderRadius: "4px", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6ECF4", fontSize: "14px", cursor: "pointer", maxWidth: "200px", position: "relative"}} onClick={() => setIsOpenedList(!isOpenedList)}>
            {
                title &&
                <p style={{position: "absolute", left: "16px", top: "-9px", margin: "0", backgroundColor: "#FFFFFF", color: "#797979", fontSize: "14px"}}>
                    {title}
                </p>
            }
            
            <p style={{margin: title? "8px 16px 4px": "4px 16px", overflow: "hidden", whiteSpace: "nowrap", padding: "0 16px 0 0"}}>
                {activeLabel}
            </p>
            {
                isOpenedList &&
                <div style={{position: "absolute", top: "24px", right: "-1px", width: "100%", backgroundColor: "#FFFFFF", color: "#000000", borderRadius: "4px", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6ECF4", display: "flex", flexDirection: "column", gap: "4px", zIndex: 3}} onMouseLeave={() => setIsOpenedList(false)}>
                    {
                        addNewElement && 
                        <p style={{margin: "4px 16px", padding: "0"}} onClick={addNewElement}>
                            Добавить новый
                        </p>
                    }
                    {
                        options.map(
                            option => 
                            <p key={option.value} style={{margin: "4px 16px", padding: "0"}} onClick={() => setActiveValue(option.value)}>
                                {option.label}
                            </p>
                        )
                    }
                </div>
            }
            <img src="triangle.svg" alt="" style={{position: "absolute", top: "8px", right: "12px", height: "8px", rotate: (isOpenedList? "180deg": "0deg")}}/>
        </div>
    )
}

export default Select;