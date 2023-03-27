import MenuTab from "./MenuTab";
import FileAction from "./FileAction";

function TopMenu(props) {
    const {currentTabIndex, changeCurrentTabIndex} = props;
    const tabTitles = ["Общая информация", "Правила", "Переменные", "Домены"]
    const actions = [
        {
            title: "Создать...",
            handler: () => alert("Создаю")
        },
        {
            title: "Открыть...",
            handler: () => alert("Открываю")
        },
        {
            title: "Сохранить...",
            handler: () => alert("Сохраняю")
        },
    ]
    return (
        <div style={{backgroundColor: "#64B5F6", height: "64px", margin: "0", padding: "0", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative"}}> 
            <div style={{width: "878px", margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "flex-end"}}>
                {
                    tabTitles.map(
                        (tabTitle, index) => <MenuTab title={tabTitle} value={index} isActive={currentTabIndex === index} changeCurrentTabIndex={changeCurrentTabIndex}/>
                    )
                }
            </div>
            <FileAction actions={actions}/>
        </div>
    );
  }
  
export default TopMenu;