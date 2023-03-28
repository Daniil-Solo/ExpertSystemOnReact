import React from "react";

function Select(props){
    const {activeValue, values, handleValue} = props;
    const [isOpenedList, setIsOpenedList] = React.useState(false);

    return (
        <div style={{backgroundColor: "#FFFFFF", color: "#000000", position: "relative", width: "200px", height: "24px", borderRadius: "4px", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6ECF4", fontSize: "14px", cursor: "pointer"}} onClick={() => setIsOpenedList(!isOpenedList)}>
            <p style={{margin: "4px 16px"}}>{activeValue}</p>
            {
                isOpenedList &&
                <div style={{position: "absolute", top: "24px", right: "-1px", width: "200px", backgroundColor: "#FFFFFF", color: "#000000", borderRadius: "4px", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6ECF4", display: "flex", flexDirection: "column", gap: "4px"}} onMouseLeave={() => setIsOpenedList(false)}>
                    {
                        values.map(
                            value => 
                            <p style={{margin: "4px 16px", padding: "0"}} onClick={() => handleValue(value)}>
                                {value}
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