export interface Test {
    _id?: string;
    ownerId?: string;
    createdOn?: Date;
    numberOfQuestions: number;
    collectionPollIds: string[];
    corrected?: boolean;
    questions: {
        collectionId: string;
        wordId: string;
        question: string;
        correct?: string;
        answer?: string;
        result?: boolean;
    }[];
}
