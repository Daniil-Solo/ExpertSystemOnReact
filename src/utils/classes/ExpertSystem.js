import { KnowledgeBase } from "./KnowlledgeBase";

class ExpertSystem{
    constructor(){
        this.knowledgeBase = null;
        this.createKnowledgeBase();

    }

    createKnowledgeBase(){
        this.knowledgeBase = new KnowledgeBase();
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

    getSentData(expertSystemData){
        const data = JSON.parse(JSON.stringify(expertSystemData));
        const variableSet = {};
        data.variables.forEach(variable => {
            variableSet[variable.id] = variable.name;
        });
        const domainSet = {};
        data.domains.forEach(domain => {
            domainSet[domain.id] = domain.name;
        });
        const domainValueSet = {};
        data.domains.forEach(domain => {
            domain.domainValues.forEach(domainValue => {
                domainValueSet[domainValue.id] = domainValue.value;
            })
        });
        return {
            rules: data.rules.map(rule => {
                rule.conditions.forEach((condition, idx) => {
                    rule.conditions[idx].variable = variableSet[condition.variableId];
                    rule.conditions[idx].value = domainValueSet[condition.valueId];
                    delete condition.variableId;
                    delete condition.valueId;
                })
                rule.result.variable = variableSet[rule.result.variableId];
                rule.result.value = domainValueSet[rule.result.valueId];
                delete rule.result.variableId;
                delete rule.result.valueId;
                return rule;
            }),
            domains: data.domains.map(domain => {
                delete domain.id;
                domain.domainValues.forEach(domainValue => {
                    delete domainValue.id;
                })
                return domain;
            }),
            variables: data.variables.map(variable => {
                delete variable.id;
                variable.domain = domainSet[variable.domainId];
                delete variable.domainId;
                return variable;
            }),
            goal:  variableSet[data.goalId]
        }
    }
}

export {ExpertSystem};