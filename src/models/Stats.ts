export interface CollectionStats {
    _id?: string,
    index: number;
    name: string;
    wrong: number;
    correct: number;
    words: WordStats[];
}

export interface WordStats {
    _id?: string;
    name: string;
    wrong: number;
    correct: number;
}

