import React from "react";
import SimplePanel from "../SimplePanel";
import NoEditableProperty from "../UI/NoEditableProperty";
import Select from "../UI/Select";

function GeneralContent(props) {
  const {goal, setGoal, variables, variableCount, ruleCount, domainCount} = props;

  const getGoalOptions = variables.map(variable => {
      return {
        label: variable.label,
        value: variable.name
      }
  });

  return (
    <div style={{width: "878px", margin: "40px auto 0", display: "flex", justifyContent: "space-around", alignItems: "flex-start"}}>
        <div style={{width: "50%", paddingRight: "12px"}}>
            <SimplePanel title="Текущий проект">
                <NoEditableProperty title="Название:" value="RESUME.RSS"/>
                <Select title="Цель" activeValue={goal} options={getGoalOptions} setActiveValue={setGoal}/>
                <NoEditableProperty title="Количество правил:" value={ruleCount}/>
                <NoEditableProperty title="Количество переменных:" value={variableCount}/>
                <NoEditableProperty title="Количество доменов:" value={domainCount}/>
            </SimplePanel>
        </div>
        <div style={{width: "50%", paddingLeft: "12px"}}>
        </div>
    </div>
  );
}

export default GeneralContent;