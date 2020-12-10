export interface WordTrainStats {
    _id?: string;
    original: string;
    wrongTrain: number;
    correctTrain: number;
}

export interface CollectionTrainStats {
    _id?: string,
    index: number;
    name: string;
    wrongTrain: number;
    correctTrain: number;
    words: WordTrainStats[];
}

export interface WordTestStats {
    _id?: string;
    original: string;
    wrongTest: number;
    correctTest: number;
}

export interface CollectionTestStats {
    _id?: string,
    index: number;
    name: string;
    wrongTest: number;
    correctTest: number;
    words: WordTrainStats[];
}