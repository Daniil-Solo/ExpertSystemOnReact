import MenuTab from "./MenuTab";
import FileAction from "./FileAction";

function TopMenu(props) {
    const {currentTabIndex, changeCurrentTabIndex, createNewHandler, openHandler, saveHandler} = props;
    const tabTitles = ["Общая информация", "Правила", "Переменные", "Домены"]
    const actions = [
        {
            title: "Создать...",
            handler: createNewHandler
        },
        {
            title: "Открыть...",
            handler: openHandler
        },
        {
            title: "Сохранить...",
            handler: saveHandler
        },
    ]
    return (
        <div style={{backgroundColor: "#64B5F6", height: "64px", margin: "0", padding: "0", display: "flex", justifyContent: "space-around", alignItems: "end", margin: "0"}}> 
            <div style={{width: "788", margin: "0 auto", display: "flex", justifyContent: "space-between"}}>
                {
                    tabTitles.map(
                        (tabTitle, index) => <MenuTab key={index} title={tabTitle} value={index} isActive={currentTabIndex === index} changeCurrentTabIndex={changeCurrentTabIndex}/>
                    )
                }
            </div>
            <FileAction actions={actions}/>
        </div>
    );
  }
  
export default TopMenu;