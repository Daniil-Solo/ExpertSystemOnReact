import React from "react";
import SimplePanel from "../SimplePanel";
import NoEditableProperty from "../UI/NoEditableProperty";
import Select from "../UI/Select";
import VariableModal from "../modals/VariableModal";

function GeneralContent(props) {
  const {goal, setGoal, setDomains, variables, variableCount, ruleCount, domainCount, domains} = props;
  const [isVariableOpenModal, setIsVariableOpenModal] = React.useState(false);
  const getGoalOptions = variables.map(variable => {
      return {
        label: variable.label,
        value: variable.id
      }
  });
  const addVariable = (newVariable) => {
    setGoal(newVariable.id, [...variables, newVariable]);
  }

  return (
    <>
      <VariableModal domains={domains} setDomains={setDomains} isActive={isVariableOpenModal} setIsActive={setIsVariableOpenModal} addVariable={addVariable}/>
      <div style={{width: "878px", margin: "40px auto 0", display: "flex", justifyContent: "space-around", alignItems: "flex-start"}}>
        <div style={{width: "50%", paddingRight: "12px"}}>
            <SimplePanel title="Текущий проект">
                <Select title="Цель" activeValue={goal} options={getGoalOptions} setActiveValue={setGoal} addNewElement={() => setIsVariableOpenModal(true)}/>
                <NoEditableProperty title="Количество правил:" value={ruleCount}/>
                <NoEditableProperty title="Количество переменных:" value={variableCount}/>
                <NoEditableProperty title="Количество доменов:" value={domainCount}/>
            </SimplePanel>
        </div>
        <div style={{width: "50%", paddingLeft: "12px"}}>
        </div>
      </div>
    </>
    
  );
}

export default GeneralContent;