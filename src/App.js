import TopMenu from "./components/TopMenu";
import React from "react";

function App() {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  return (
    <>
      <TopMenu currentTabIndex={currentTabIndex} changeCurrentTabIndex={setCurrentTabIndex}/>
    </>
  );
}

export default App;
