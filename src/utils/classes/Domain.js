class Domain{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.domainValues = [];
    }

    createValue(value, label){
        const id = this.id + "_" + (this.domainValues.length? +this.domainValues[this.domainValues.length-1].getSelfId() + 1: 0); 
        return new DomainValue(id, value, label);
    }

    addValue(domainValue){
        this.domainValues.push(domainValue)
    }

    getDomainValueValues(){
        return this.domainValues.map(domainValue => domainValue.value);
    }

    getData(){
        return {
            id: this.id,
            name: this.name,
            domainValues: this.domainValues.map(domainValue => domainValue.getData())
        }
    }
}

class DomainValue{
    constructor(id, value, label){
        this.id = id;
        this.value = value;
        this.label = label;
    }
    updateLabel(newLabel){
        this.label = newLabel;
    }
    getDomainId(){
        return this.id.split("_")[0];
    }
    getSelfId(){
        return this.id.split("_")[1];
    }
    getData(){
        return {
            id: this.id,
            value: this.value,
            label: this.label
        }
    }
}

export {Domain, DomainValue};