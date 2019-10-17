import { Component } from '@angular/core';
import { MovieApiService } from '../../core/index';
import { BehaviorSubject } from 'rxjs';

interface LoaderConfig {
    color: string;
    mode: string;
    value: number;
}

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    private movieApiService: MovieApiService;

    /**
     * Variable that is used to track status of the loader
     */
    public loader$: BehaviorSubject<boolean>;

    /**
     * color, mode and value - are configuration parameters for Material Loader
     */
    public loaderConfig: LoaderConfig = {
        color: 'primary',
        mode: 'indeterminate',
        value: 50
    };

    constructor(moiveApiService: MovieApiService) {
        this.movieApiService = moiveApiService;
        this.loader$ = this.movieApiService.loader$;
    }
}
