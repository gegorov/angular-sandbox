export interface Cast {
    castId: number;
    character: string;
    creditId: string;
    gender: number | null;
    id: number;
    name: string;
    order: number;
    profilePath: string | null;
}

export interface RawCast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number | null;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
}

export interface Crew {
    credit_id: string;
    department: string;
    gender: number | null;
    id: number;
    job: string;
    name: string;
    profile_path: string | null;
}

export interface MoviePersonnel {
    id: number;
    cast: Array<RawCast>;
    crew: Array<Crew>;
}
