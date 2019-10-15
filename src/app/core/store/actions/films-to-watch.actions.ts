import { Action } from '@ngrx/store';
import { MovieWithCast } from '../../models';

export enum FilmsToWatchActionTypes {
    AddFilm = '[FilmsToWatch] Add Film',
    RemoveFilm = '[FilmsToWatch] Remove Film'
}

export class AddFilm implements Action {
    public payload: MovieWithCast;
    readonly type: string = FilmsToWatchActionTypes.AddFilm;

    constructor(payload: MovieWithCast) {
        this.payload = payload;
        console.log('Action fired: ', FilmsToWatchActionTypes.AddFilm, this.payload);
    }
}

export class RemoveFilm implements Action {
    public payload: MovieWithCast;
    readonly type: string = FilmsToWatchActionTypes.RemoveFilm;

    constructor(payload: MovieWithCast) {
        this.payload = payload;
        console.log('Action fired: ', FilmsToWatchActionTypes.RemoveFilm, this.payload);
    }
}

export type FilmsToWatchActions = AddFilm | RemoveFilm;
