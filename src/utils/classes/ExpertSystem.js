import { KnowledgeBase } from "./KnowlledgeBase";

class ExpertSystem{
    constructor(){
        this.knowledgeBase = null;
        this.createKnowledgeBase();

    }

    createKnowledgeBase(){
        this.knowledgeBase = new KnowledgeBase();
    }

    openKnowledgeBase(filename=""){
        // api
        const data = {
            rules: [
                {
                    name: "R1_2",
                    reason: "Quality of resume's head is low because real name is specified, real contacts are not specified, job is not relevant",
                    conditions: [
                        {
                            variable: "REALNAME",
                            value: 1
                        },
                        {
                            variable: "JS",
                            value: 1
                        }
                    ],
                    result: {
                        variable: "RESUMELVL",
                        value: 2
                    }
                }
            ],
            domains: [
                {
                    name: "YesNo",
                    domainValues: [
                        {
                            value: 1,
                            label: "Yes"
                        },
                        {
                            value: 2,
                            label: "No"
                        }
                    ]
                },
                {
                    name: "Level",
                    domainValues: [
                        {
                            value: 1,
                            label: "Low"
                        },
                        {
                            value: 2,
                            label: "Middle"
                        },
                        {
                            value: 3,
                            label: "High"
                        },
                    ]
                },
            ],
            variables: [
                {
                    name: "REALNAME",
                    label: "Real name",
                    domain: "YesNo",
                    type: "requested"
                },
                {
                    name: "JS",
                    label: "JavaScript",
                    domain: "YesNo",
                    type: "requested"
                },
                {
                    name: "RESUMELVL",
                    label: "Quality of resume",
                    domain: "Level",
                    type: "derived"
                }
            ],
            goal: "REALNAME"
        }
        this.setData(data);
    }

    saveKnowledgeBase(filename=""){
        alert("Сохраняю");
        console.log(this.knowledgeBase);
    }

    setData(data){
        this.knowledgeBase = new KnowledgeBase();
        data.domains.forEach(domain => {
            const kbDomain = this.knowledgeBase.createDomain(domain.name);
            domain.domainValues.forEach(domainValue => {
                const kbDomainValue = kbDomain.createValue(domainValue.value, domainValue.label);
                kbDomain.addValue(kbDomainValue);
            });
            this.knowledgeBase.addDomain(kbDomain);
        });
        data.variables.forEach(variable => {
            const kbDomainIndex = this.knowledgeBase.getDomainNames().indexOf(variable.domain);
            const kbDomain = this.knowledgeBase.domains[kbDomainIndex];
            const kbVariable = this.knowledgeBase.createVariable(variable.name, variable.label, kbDomain, variable.type);
            this.knowledgeBase.addVariable(kbVariable);
        });
        data.rules.forEach(rule => {
            const kbRule = this.knowledgeBase.createRule(rule.name, rule.reason);
            rule.conditions.forEach(condition => {
                const kbVariableIndex = this.knowledgeBase.getVariableNames().indexOf(condition.variable);
                const kbVariable = this.knowledgeBase.variables[kbVariableIndex];
                const kbDomainValueIndex = kbVariable.domain.getDomainValueValues().indexOf(condition.value);
                const kbDomainValue = kbVariable.domain.domainValues[kbDomainValueIndex];
                const kbRuleCondition = kbRule.createCondition(kbVariable, kbDomainValue);
                kbRule.addCondition(kbRuleCondition);
            });
            if (rule.result){
                const kbVariableIndex = this.knowledgeBase.getVariableNames().indexOf(rule.result.variable);
                const kbVariable = this.knowledgeBase.variables[kbVariableIndex];
                const kbDomainValueIndex = kbVariable.domain.getDomainValueValues().indexOf(rule.result.value);
                const kbDomainValue = kbVariable.domain.domainValues[kbDomainValueIndex];
                const kbRuleResult = kbRule.createResult(kbVariable, kbDomainValue);
                kbRule.setResult(kbRuleResult);
            }
            this.knowledgeBase.addRule(kbRule);
        });
        if (data.goal){
            const kbVariableIndex = this.knowledgeBase.getVariableNames().indexOf(data.goal);
            const kbVariable = this.knowledgeBase.variables[kbVariableIndex];
            this.knowledgeBase.setGoal(kbVariable);
        }
    }

    getData(){
        return this.knowledgeBase.getData();
    }
}

export {ExpertSystem};