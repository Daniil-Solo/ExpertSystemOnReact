class Rule{
    constructor(name, reason){
        this.name = name;
        this.reason = reason;
        this.conditions = [];
        this.result = null;
    }

    // Conditions
    createCondition(variable, value){
        return new RuleOperation(variable, value);
    }
    
    addCondition(condition){
        this.conditions.push(condition);
    }

    // Result
    createResult(variable, value){
        return new RuleOperation(variable, value);
    }

    setResult(result){
        this.result = result;
    }

    getData(){
        return {
            name: this.name,
            reason: this.reason,
            conditions: this.conditions.map(condition => condition.getData()),
            result: this.result? this.result.getData(): this.result
        }
    }
}

class RuleOperation{
    constructor(variable, value){
        this.variable = variable;
        this.value = value;
    }

    getData(){
        return {
            variable: this.variable.id,
            value: this.value.id
        }
    }

}

export {Rule, RuleOperation};