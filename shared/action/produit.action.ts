import { Produit } from "shared/model/produit";

export class AddPanier {
    static readonly type = '[Panier] Add Produit';
    constructor(public payload: Produit) {};

}

export class SubPanier {
    static readonly type = '[Panier] Substract Produit';
    constructor(public payload: Produit) {};
}