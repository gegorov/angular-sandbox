import { ResponseMovie, Movie } from '../models';

export class Utils {
  static randomChar(): string {
    const dictionary: string = 'abcdefghijklmnopqrstuvwxyz';
    const index: number = Math.floor(Math.random() * (dictionary.length + 1));
    return dictionary[index];
  }

  static transformResponseFields(movie: ResponseMovie): void {
    console.log(movie);
  }
}

export const transformMovieData: (response: ResponseMovie) => Movie = ({
  poster_path: posterPath,
  release_date: releaseDate,
  genre_ids: genreIds,
  original_title: originalTitle,
  original_language: originalLanguage,
  backdrop_path: backdropPath,
  vote_count: voteCount,
  vote_average: voteAverage,
  ...rest
}: ResponseMovie): Movie => ({
  posterPath,
  releaseDate,
  genreIds,
  originalTitle,
  originalLanguage,
  backdropPath,
  voteCount,
  voteAverage,
  ...rest
});
