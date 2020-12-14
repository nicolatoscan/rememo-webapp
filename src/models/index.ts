export * from './errors'
export * from './Auth'
export * from './Collection'
export * from './study/Test'
export * from './study/Learn'
export * from './Stats'
export * from './User'

export interface Id {
    _id: string;
}

export enum EAnswerStatus {
    None = -1,
    Wrong = 0,
    Correct = 1
}