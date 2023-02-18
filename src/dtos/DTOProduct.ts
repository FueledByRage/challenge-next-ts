export interface ILocation{
    id: string,
    name: string
}

export interface IFamily {
    id: string,
    name: string
}

export class DTOProduct{
    public id: number;
    public name: string;
    public cost: number;
    public quantity: number;
    public location : string ;
    public family: string;

    constructor( id : number, name : string, cost : number, quantity : number,  location : string, family : string ){
        this.id = id;
        this.name =name;
        this.cost = cost;
        this.quantity = quantity;
        this.location = location;
        this.family = family;
    }
}