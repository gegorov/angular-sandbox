import { FilmsToWatchActions } from '../actions/index';
import { MovieWithCast } from '../../models/index';
import { on, createReducer, ActionReducer, Action } from '@ngrx/store';

export type FilmsToWatchState = Array<MovieWithCast>;

export const initialState: FilmsToWatchState = [];

export const filmsToWatchReducer: ActionReducer<MovieWithCast[], Action> = createReducer(
    initialState,
    on(FilmsToWatchActions.addFilm, (state: FilmsToWatchState, { film }: { film: MovieWithCast }) => [...state, film]),
    on(FilmsToWatchActions.removeFilm, (state: FilmsToWatchState, { film }: { film: MovieWithCast }) =>
        state.filter((movie: MovieWithCast) => movie.id !== film.id)
    )
);
