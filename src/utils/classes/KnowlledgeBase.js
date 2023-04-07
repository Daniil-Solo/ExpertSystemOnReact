import {Variable, VariableType} from "./Variable";
import { Domain } from "./Domain";
import { Rule } from "./Rule";

class KnowledgeBase{
    constructor(){
        this.rules = [];
        this.domains = [];
        this.variables = [];
        this.goal = null;
    }

    // Rules
    createRule(name, reason, orderNumber){
        const r = new Rule(name, reason, orderNumber);
        return r;
    }
    addRule(rule){
        this.rules.push(rule);
    }

    // Domains
    createDomain(name){
        const id = this.domains.length? this.domains[this.domains.length-1].id + 1: 0; 
        const d = new Domain(id, name);
        return d;
    }
    addDomain(domain){
        this.domains.push(domain);
    }

    getDomainNames(){
        return this.domains.map(variable => variable.name);
    }

    // Variables
    createVariable(name, label, domain, type){
        const id = this.variables.length? this.variables[this.variables.length-1].id + 1: 0; 
        const v = new Variable(id, name, label, domain, type);
        return v;
    }
    addVariable(variable){
        this.variables.push(variable);
    }

    getVariableLabels(){
        return this.variables.map(variable => variable.label);
    }

    getVariableNames(){
        return this.variables.map(variable => variable.name);
    }

    // Goal
    setGoal(variable){
        this.goal = variable;
    }

    getGoalLabel(){
        return this.goal? this.goal.label: "Цель не определена"; 
    }

}

export {KnowledgeBase};