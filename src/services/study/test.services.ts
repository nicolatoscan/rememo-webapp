import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function generateTest(collectionPollIds: string[], numberOfQuestions: number): Promise<Models.Test> {
    try {
        return (await apiHelpers.post('/study/test/generate', {
            collectionPollIds: collectionPollIds,
            numberOfQuestions: numberOfQuestions
        })).data as Models.Test;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function checkTest(test: Models.Test): Promise<Models.Test> {
    try {
        return (await apiHelpers.post('/study/test/check', test)).data as Models.Test;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}