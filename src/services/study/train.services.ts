import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function nextWord(collectionPollIds: string[]): Promise<Models.FullWord> {
    try {
        return (await apiHelpers.post('/study/train/next', { collectionPollIds: collectionPollIds })).data as Models.FullWord;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function saveWord(collectionId: string, wordId: string, correct: boolean): Promise<void> {
    try {
        await apiHelpers.post('/study/train/result', {
            collectionId: collectionId,
            wordId: wordId,
            correct: correct
        });
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}