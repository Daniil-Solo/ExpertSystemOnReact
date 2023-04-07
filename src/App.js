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

  const getNextIdForItems = (items) => {
    let maxId = -1;
    items.forEach(item => {
      if (item.id !== undefined){
        maxId = item.id > maxId? item.id: maxId;
      }
    })
    const nextId = maxId + 1
    return nextId;
  }

  const setGoal = (newGoalId, newVariables) => {
    if (newVariables){ // добавление новой переменной как цели
      newVariables.forEach((newVariable, index) => {
        if (newVariable.id === undefined){
          newGoalId = getNextIdForItems(newVariables);
          newVariables[index].id = newGoalId;
        }
      });
      setExpertSystem({...expertSystem, goalId: newGoalId, variables: newVariables});
    } else{ // обновление при существующей переменной
      setExpertSystem({...expertSystem, goalId: newGoalId});
    }
  }
  const setRules = (newRules) => {
    setExpertSystem({...expertSystem, rules: newRules});
  }
  const setVariables = (newVariables) => {
    if (newVariables.length > expertSystem.variables.length){ // добавление новой переменной
      newVariables.forEach((newVariable, index) => {
        if (newVariable.id === undefined){
          newVariables[index].id = getNextIdForItems(newVariables);
        }
      });
      setExpertSystem({...expertSystem, variables: newVariables});
    }
  }
  const setDomains = (newDomains) => {
    // добавление нового домена
    newDomains.forEach((newDomain, index) => {
      if (newDomain.id === undefined){
        newDomains[index].id = getNextIdForItems(newDomains);
        newDomains[index].domainValues.forEach((newDomainValue, innerIndex) => {
          if (newDomainValue.id === undefined){
            newDomains[index].domainValues[innerIndex].id = newDomains[index].id + "_" + getNextIdForItems(newDomains[index].domainValues);
          }
        })
      }
    });
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
        <GeneralContent goal={expertSystem.goalId} setGoal={setGoal} setDomains={setDomains} variables={expertSystem.variables} variableCount={expertSystem.variables.length} domainCount={expertSystem.domains.length} ruleCount={expertSystem.rules.length} domains={expertSystem.domains}/>
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
