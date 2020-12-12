export enum EStatsType {
    Train, Test
}

export interface APICollectionStats {
    collectionId: string,
    userId: string,
    correctTrain: number,
    wrongTrain: number,
    correctTest: number,
    wrongTest: number,
    words: APIWordStats[]
}
export interface APIWordStats {
    wordId:  string,
    correctTrain: number,
    wrongTrain: number,
    correctTest: number,
    wrongTest: number
}

export interface CollectionStats {
    _id?: string,
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

export interface DataChart {
    label: string,
    right: number,
    wrong: number
}

