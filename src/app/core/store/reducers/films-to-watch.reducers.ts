// import { FilmsToWatchActionTypes } from '../actions/films-to-watch.actions';
import { FilmsToWatchActions } from '../actions/index';
import { MovieWithCast } from '../../models';
import { on, createReducer } from '@ngrx/store';

export type FilmsToWatchState = Array<MovieWithCast>;

export const initialState: FilmsToWatchState = [];

// export function filmsToWatchReducer(
//     state: FilmsToWatchState = initialState,
//     action: FilmsToWatchActions
// ): FilmsToWatchState {
//     switch (action.type) {
//         case FilmsToWatchActionTypes.AddFilm:
//             const newState: FilmsToWatchState = {
//                 ...state,
//                 filmsToWatch: [...state.filmsToWatch, action.payload]
//             };
//             console.log('newstate:', newState);
//             return newState;

//         case FilmsToWatchActionTypes.RemoveFilm:
//             const newStatee: FilmsToWatchState = {
//                 ...state,
//                 filmsToWatch: state.filmsToWatch.filter((movie: MovieWithCast) => movie.id !== action.payload.id)
//             };
//             console.log('newstate:', newStatee);
//             return newStatee;

//         default:
//             return state;
//     }
// }

export const filmsToWatchReducer = createReducer(
    initialState,
    on(FilmsToWatchActions.addFilm, (state: FilmsToWatchState, { film }) => [...state, film]),
    on(FilmsToWatchActions.removeFilm, (state: FilmsToWatchState, { film }) =>
        state.filter((movie: MovieWithCast) => movie.id !== film.id)
    )
);
