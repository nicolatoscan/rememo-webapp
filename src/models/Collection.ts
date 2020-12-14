
export interface Word {
    _id?: string;
    index: number;
    original: string;
    translation: string;
    languageFrom?: string;
    languageTo?: string;
}

export interface FullWord extends Word {
    collectionId: string;
}

export interface CollectionMin {
    _id?: string,
    name: string;
    description: string;
    languageFrom?: string;
    languageTo?: string;
}

export interface Collection extends CollectionMin {
    index: number;
    owner: string;
    words: Word[];
}