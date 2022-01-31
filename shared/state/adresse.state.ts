import { Store, State, Selector, Action, StateContext } from '@ngxs/store';
import { Adresse } from "shared/model/adresse";
import { AddAdresse, SubAdresse } from '../action/adresse.action';
import { AdresseStateModel } from './adresse.state.model';



// user.state.ts
@State<AdresseStateModel>({
    name: 'adresse',
    defaults: {
        adresses: []
    }
})


export class AdresseState {
    
    @Selector()
    static getAdresses(state: AdresseStateModel) {
        return state.adresses;
    }
    @Selector() 
    static countAdresses(state: AdresseStateModel) {
        return state.adresses.length;
    }
    @Action(AddAdresse)
    AddAdresse(
        {getState, patchState}:StateContext<AdresseStateModel>, 
        {payload}: AddAdresse
    ){

        const state = getState()
        patchState({
            adresses: [...state.adresses, payload]
        })
        //console.log("gg");
    }

    @Action(SubAdresse)
    DeleteAdresse(
        {getState, patchState}:StateContext<AdresseStateModel>,
        {payload}: SubAdresse
    ){
        const state = getState()
        patchState({
            adresses: state.adresses.filter(adresse => adresse != payload)
        })
    } 
    
    
}
    