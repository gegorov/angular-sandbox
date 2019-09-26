import { Cast } from './movie-personnel.interface';

export interface MovieWithCast {
  posterPath: string | null;
  adult: boolean;
  cast: Array<Cast>;
  overview: string;
  releaseDate: string;
  genreIds: Array<string>;
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string | null;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
}
