import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getCollectionLearnState(collectionId: string): Promise<Models.LearnStatus[]> {
    try {
        return (await apiHelpers.get(`/study/learn/${collectionId}/status`)).data as Models.LearnStatus[];
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function resetCollectionLearnState(collectionId: string) {
    try {
        (await apiHelpers.put(`/study/learn/${collectionId}/reset`, {}));
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function updateWordLearnState(collectionId: string, wordId: string, status: number) {
    try {
        (await apiHelpers.put(`/study/learn/${collectionId}/learned?wordId=${wordId}&status=${status}`, {}));
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

