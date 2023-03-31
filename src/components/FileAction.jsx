import React from "react";

function FileAction(props){
    const {actions} = props;
    const [isOpenedActionList, setIsOpenedActionList] = React.useState(false);
    return(
        <>
            <div style={{backgroundColor: "#115293", width: "40px", height: "40px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", cursor: "pointer", position: "absolute", bottom: "0", right: "72px", display: "flex", alignItems: "center", justifyContent: "center"}} onMouseEnter={() => setIsOpenedActionList(true)} onMouseLeave={() => setIsOpenedActionList(false)}>
                <img src="document.svg" alt="Документ" />
            </div>
            {isOpenedActionList &&
                <div style={{position: "absolute", bottom: "-101px", right: "45px", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px", borderWidth: "1px", borderTopWidth: "0", borderStyle: "solid", backgroundColor: "#FFFFFF", height: "100px", width: "96px", borderColor: "#E6ECF4", display: "flex", flexDirection: "column", justifyContent: "space-around"}} onMouseEnter={() => setIsOpenedActionList(true)} onMouseLeave={() => setIsOpenedActionList(false)}>
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
        </>
    )
}

export default FileAction;