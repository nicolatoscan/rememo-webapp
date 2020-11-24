export interface Word {
    _id?: string;
    index: number;
    original: string;
    translation: string;
    languageFrom?: string;
    languageTo?: string;
}

export interface Collection {
    _id?: string,
    index: number;
    name: string;
    description: string;
    owner: string;
    languageFrom?: string;
    languageTo?: string;
    words: Word[];
}