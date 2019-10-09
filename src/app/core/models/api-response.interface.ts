import { ResponseMovie } from './response-movie.interface';

export interface ApiResponse {
    page?: number;
    results: Array<ResponseMovie>;
    total_results?: number;
    total_pages?: number;
}
