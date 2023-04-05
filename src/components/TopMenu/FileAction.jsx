import React from "react";

function FileAction(props){
    const {actions} = props;
    const [isOpenedActionList, setIsOpenedActionList] = React.useState(false);
    return(
        <>
            <div style={{backgroundColor: "#115293", width: "40px", height: "40px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginRight: "32px"}} onMouseEnter={() => setIsOpenedActionList(true)} onMouseLeave={() => setIsOpenedActionList(false)}>
                <img src="document.svg" alt="Документ" />
                {isOpenedActionList &&
                    <div style={{position: "absolute", top: "40px", right: "-30px", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px", borderWidth: "1px", borderTopWidth: "0", borderStyle: "solid", backgroundColor: "#FFFFFF", height: "100px", width: "96px", borderColor: "#E6ECF4", display: "flex", flexDirection: "column", justifyContent: "space-around", zIndex: 3}} onMouseEnter={() => setIsOpenedActionList(true)} onMouseLeave={() => setIsOpenedActionList(false)}>
                        {
                            actions.map(
                                action => 
                                <p key={action.title} style={{color: "#000", margin: "0", paddingLeft: "8px", fontSize: "16px", cursor: "pointer"}} onClick={action.handler}>
                                    {action.title}
                                </p>
                            )
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default FileAction;