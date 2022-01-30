import { Store, State, Selector, Action, StateContext } from '@ngxs/store';
import { Produit } from 'shared/model/produit';
import { AddPanier, SubPanier } from '../action/produit.action';
import { ProduitStateModel } from './produit.state.model';



// user.state.ts
@State<ProduitStateModel>({
    name: 'produit',
    defaults: {
        produits: []
    }
})


export class PanierState {
    
    @Selector()
    static getProduits(state: ProduitStateModel) {
        return state.produits;
    }
    @Selector() 
    static countProduits(state: ProduitStateModel) {
        return state.produits.length;
    }
    @Action(AddPanier)
    add({getState, patchState }: StateContext<ProduitStateModel>, 
        { payload }: AddPanier) {
            const state = getState();
            //console.log('state');
            /*
            patchState({
                produits: [...state.produits, payload]
        });
        */
            if(state.produits.find(elem => elem.libelle == payload.libelle)){
                patchState({ 
                    produits: state.produits.map((p : Produit) => p.libelle !== payload.libelle ? p : {...p, qteCommande : p.qteCommande+1})

                })  
                //console.log("+1");
            }
            else{
                patchState({
                    produits: [...state.produits, {...payload, qteCommande: 1}]
                    
                })
                //console.log("set 1");
            }
    }

        

    @Action(SubPanier)
    sub({getState, patchState }: StateContext<ProduitStateModel>, 
        { payload }: SubPanier) {
            const state = getState();
            //console.log('state');
            if(state.produits.find(elem => elem.libelle == payload.libelle)?.qteCommande > 1){
                patchState({
                    produits: state.produits.map((p : Produit) => p.libelle !== payload.libelle ? p : {...p, qteCommande : p.qteCommande -1})
                })
            }
            else{
                patchState({
                    produits: state.produits.filter(produit => produit.libelle !== payload.libelle)
                })
            }

            /*
            patchState({
                produits: state.produits.filter(produit => produit.libelle !== payload.libelle)
            })
            */
    }
    
    
}
    