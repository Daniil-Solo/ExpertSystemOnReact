class Variable{
    constructor(id, name, label, domain, type){
        this.id = id;
        this.name = name;
        this.label = label;
        this.domain = domain;
        this.type = type;
    }

    getData(){
        return {
            id: this.id,
            name: this.name,
            label: this.label,
            domain: this.domain.id,
            type: this.type
        }
    }
}


export {Variable}