import React from "react";
import "./itemlist.css"

function ItemList(props){
    const {items, setItems, SpecificItem, selectItem, variables, domains, selectedItem, setSelectedItem, draggable=false} = props;
    const [currentItem, setCurrentItem] = React.useState(null);

    const selectItemWrapper = (item, index) => {
        selectItem(item);
        setSelectedItem(index);
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        if (e.target.closest('.item')){
            e.target.closest('.item').style.boxShadow = '0 -4px 0 gray';
        }
        
    }
    const dragLeaveHandler = (e) => {
        e.target.closest('.item').style.boxShadow = 'none';

    }
    const dragStartHandler = (e, item) => {
        setSelectedItem(-1);
        selectItem(null);
        setCurrentItem(item);
    }
    const dragEndHandler = (e) => {
        e.target.closest('.item').style.boxShadow = 'none';

    }
    const dropHandler = (e, item) => {
        e.preventDefault();
        if (item !== currentItem){
            const currentItemIndex = items.indexOf(currentItem);
            items.splice(currentItemIndex, 1);
            const dropIndex = items.indexOf(item);
            items.splice(dropIndex, 0, currentItem);
            setItems(items);
        }
        e.target.closest('.item').style.boxShadow = 'none';
        
    }
    const pushBackHandler = (e) => {
        const currentItemIndex = items.indexOf(currentItem);
        items.splice(currentItemIndex, 1);
        setItems([...items, currentItem]);
        e.target.closest('.item').style.boxShadow = 'none';
    }
    return (
        <div className="list">
            {
                items.map(
                    (item, index) => 
                    <div key={index} className={selectedItem === index? "item selected": "item"} draggable={Boolean(draggable)} onClick={() => selectItemWrapper(item, index)}
                        onDragOver={e => draggable? dragOverHandler(e): null}
                        onDragLeave={e => draggable? dragLeaveHandler(e): null}
                        onDragStart={e => draggable? dragStartHandler(e, item): null}
                        onDragEnd={e => draggable? dragEndHandler(e): null}
                        onDrop={e => draggable? dropHandler(e, item): null}
                    >
                        <div className="item__content">
                            <SpecificItem item={item} domains={domains} variables={variables}/>
                        </div>
                        {
                            draggable &&
                            <div className="drag_icon">
                                <img src="drag.svg" alt=""/>
                                <div className="drag_icon__foreground"></div>
                            </div>
                        }
                    </div>
                )
            }
            {
                draggable &&
                <div className="item last-drag-item"
                    onDragOver={e => dragOverHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragEnd={e => dragEndHandler(e)}
                    onDrop={e => pushBackHandler(e)}
                ></div>
            }   
        </div>
    )
}

export default ItemList;