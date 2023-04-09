import MenuTab from "./MenuTab";
import FileAction from "./FileAction";

function TopMenu(props) {
    const {currentTabIndex, changeCurrentTabIndex, createNewHandler, openHandler, saveHandler} = props;
    const tabTitles = ["Общая информация", "Правила", "Переменные", "Домены"]

    return (
        <div style={{backgroundColor: "#64B5F6", height: "64px", margin: "0", padding: "0", display: "flex", justifyContent: "space-around", alignItems: "end", margin: "0"}}> 
            <div style={{margin: "0 auto", display: "flex", justifyContent: "space-between"}}>
                {
                    tabTitles.map(
                        (tabTitle, index) => <MenuTab key={index} title={tabTitle} value={index} isActive={currentTabIndex === index} changeCurrentTabIndex={changeCurrentTabIndex}/>
                    )
                }
            </div>
            <FileAction createNewHandler={createNewHandler} openHandler={openHandler} saveHandler={saveHandler}/>
        </div>
    );
  }
  
export default TopMenu;