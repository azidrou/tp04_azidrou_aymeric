import { Adresse } from "shared/model/adresse";

export class AddAdresse {
    static readonly type = 'Add Adresse';
    constructor(public payload: Adresse) {};

}

export class SubAdresse {
    static readonly type = 'Substract Adresse';
    constructor(public payload: Adresse) {};
}