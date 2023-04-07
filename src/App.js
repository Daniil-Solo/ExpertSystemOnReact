import TopMenu from "./components/TopMenu/TopMenu";
import React from "react";
import GeneralContent from "./components/ContentGeneral/GeneralContent";
import RuleContent from "./components/ContentRule/RuleContent";
import {ExpertSystem} from "./utils/classes/ExpertSystem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VariableContent from "./components/ContentVariable/VariableContent";
import DomainContent from "./components/ContentDomain/DomainContent";

function App() {
  const expertSystemInstance = new ExpertSystem();

  const [expertSystem, setExpertSystem] = React.useState(expertSystemInstance.getData());
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const createNewHandler = () => {
    expertSystemInstance.createKnowledgeBase();
    setExpertSystem(expertSystemInstance.getData());
  }
  const openHandler = () => {
    expertSystemInstance.openKnowledgeBase("");
    setExpertSystem(expertSystemInstance.getData());
  }
  const saveHandler = () => {
    expertSystemInstance.setData(expertSystem);
    expertSystemInstance.saveKnowledgeBase("");
  }

  const setGoal = (newGoal, updatedVariables) => {
    if (updatedVariables)
      setExpertSystem({...expertSystem, goal: newGoal, variables: updatedVariables});
    else
      setExpertSystem({...expertSystem, goal: newGoal});
  }
  const setRules = (newRules) => {
    setExpertSystem({...expertSystem, rules: newRules});
  }
  const setVariables = (newVariables) => {
    setExpertSystem({...expertSystem, variables: newVariables});
  }
  const setDomains = (newDomains) => {
    setExpertSystem({...expertSystem, domains: newDomains});
  }
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme='light'
      />
      <TopMenu currentTabIndex={currentTabIndex} changeCurrentTabIndex={setCurrentTabIndex} createNewHandler={createNewHandler} openHandler={openHandler} saveHandler={saveHandler}/>
      {
        currentTabIndex === 0 &&
        <GeneralContent goal={expertSystem.goal} setGoal={setGoal} setDomains={setDomains} variables={expertSystem.variables} variableCount={expertSystem.variables.length} domainCount={expertSystem.domains.length} ruleCount={expertSystem.rules.length} domains={expertSystem.domains}/>
      }
      {
        currentTabIndex === 1 &&
        <RuleContent rules={expertSystem.rules} setRules={setRules} variables={expertSystem.variables} domains={expertSystem.domains} setVariables={setVariables} setDomains={setDomains}/>
      }
      {
        currentTabIndex === 2 &&
        <VariableContent rules={expertSystem.rules} variables={expertSystem.variables} setVariables={setVariables} domains={expertSystem.domains} setDomains={setDomains}/>
      }
      {
        currentTabIndex === 3 &&
        <DomainContent domains={expertSystem.domains} setDomains={setDomains}/>
      }
    </>
  );
}

export default App;
