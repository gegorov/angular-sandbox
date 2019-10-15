import { FilmsToWatchActionTypes, FilmsToWatchActions } from '../actions/films-to-watch.actions';
import { MovieWithCast } from '../../models';

export interface FilmsToWatchState {
    filmsToWatch: Array<MovieWithCast>;
}

export const initialState: FilmsToWatchState = {
    filmsToWatch: []
};

export function filmsToWatchReducer(
    state: FilmsToWatchState = initialState,
    action: FilmsToWatchActions
): FilmsToWatchState {
    switch (action.type) {
        case FilmsToWatchActionTypes.AddFilm:
            const newState: FilmsToWatchState = {
                ...state,
                filmsToWatch: [...state.filmsToWatch, action.payload]
            };
            console.log('newstate:', newState);
            return newState;

        case FilmsToWatchActionTypes.RemoveFilm:
            const newStatee: FilmsToWatchState = {
                ...state,
                filmsToWatch: state.filmsToWatch.filter((movie: MovieWithCast) => movie.id !== action.payload.id)
            };
            console.log('newstate:', newStatee);
            return newStatee;

        default:
            return state;
    }
}
