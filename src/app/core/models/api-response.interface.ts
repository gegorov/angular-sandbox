import { Movie } from './movie.interface';

export interface ApiResponse {
  page?: number;
  results: Array<Movie>;
  total_results?: number;
  total_pages?: number;
}
