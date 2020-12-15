import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';



export async function getStats(collectionId: string, type: Models.EStatsType) {
    try {
        const collStatsCall = apiHelpers.get(`/stats/${collectionId}`);
        const collCall = apiHelpers.get(`/collections/${collectionId}`);
        const collStats = (await collStatsCall).data as Models.APICollectionStats;
        const coll = (await collCall).data as Models.Collection;
        return {
            _id: collStats.collectionId,
            correct: type === Models.EStatsType.Train ? collStats.correctTrain : collStats.correctTest,
            wrong: type === Models.EStatsType.Train ? collStats.wrongTrain : collStats.wrongTest,
            name: coll.name,
            words: collStats.words.map(wS => {
                return {
                    _id: wS.wordId,
                    correct: type === Models.EStatsType.Train ? wS.correctTrain : wS.correctTest,
                    wrong: type === Models.EStatsType.Train ? wS.wrongTrain : wS.wrongTest,
                    name: coll.words.find(w => wS.wordId === w._id)?.original ?? '',
                } as Models.WordStats;
            })
        };
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data);
    }
}

export async function getClassStats(classId: string): Promise<Models.ClassStats> {
    try {
        return (await apiHelpers.get(`/stats/class/${classId}`)).data as Models.ClassStats;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}
