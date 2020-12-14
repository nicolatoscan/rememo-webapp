export interface StudyClass {
    _id: string,
    name: string,
    collections: string[],
    mine?: boolean
}

export interface UserMin {
    _id?: string,
    username: string;
    displayName: string;
}

export interface User extends UserMin {
    email: string;
    createdClasses: StudyClass[],
    joinedClasses: string[],
    settings?: { [id: string]: string };
}