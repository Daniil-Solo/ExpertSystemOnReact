import React from "react";

function ItemList(props){
    const {items, SpecificItem, selectItem, variables, selectedItem, setSelectedItem, draggable=false} = props;

    const selectItemWrapper = (item, index) => {
        selectItem(item);
        setSelectedItem(index);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            {
                items.map(
                    (item, index) => 
                    <div key={index} style={{display: "flex", gap: "4px", fontSize: "12px", borderWidth: selectedItem === index? "2px": "1px", borderStyle: "solid", borderColor: selectedItem === index? "#88A8C9": "#E6ECF4", borderRadius: "4px", padding: "4px 16px", cursor: "pointer"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", flex: "1 1 auto"}} onClick={() => selectItemWrapper(item, index)}>
                            <SpecificItem item={item} variables={variables}/>
                        </div>
                        {
                            draggable &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <img src="drag.svg" alt="" />
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ItemList;