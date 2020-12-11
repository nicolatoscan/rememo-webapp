import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getTrainStats(collectionId: string): Promise<Models.CollectionStats> {
    
    let res = {} as Models.CollectionStats

    try {
        const collStats = (await apiHelpers.get(`/stats/${collectionId}`)).data
        const coll = (await apiHelpers.get(`/collections/${collectionId}`)).data
        const wordsStats = collStats.words;
        const words = coll.words;

        res = {
            _id: collStats._id,
            index: coll.index,
            name: coll.name,
            wrong: collStats.wrongTrain,
            correct: collStats.correctTrain,
            words:[]
        } 

        for (let i = 0; i < words.length; i++) {
            res.words.push(
                {
                _id : words[i].wordId,
                name : words[i].original,
                wrong: wordsStats[i].correctTrain,
                correct:wordsStats[i].wrongTrain,
                }
            )
            
        }
        collStats.words.forEach((word:any) => {
            //let name = (await apiHelpers.get(`/collections/${collectionId}/words/${word.wordId}`)).data
            console.log(name)
            
        });
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
    
    return res
}

export async function getTestStats(collectionId: string): Promise<Models.CollectionStats> {
    
    let res = {} as Models.CollectionStats

    try {
        const collStats = (await apiHelpers.get(`/stats/${collectionId}`)).data
        const coll = (await apiHelpers.get(`/collections/${collectionId}`)).data
        const wordsStats = collStats.words;
        const words = coll.words;

        res = {
            _id: collStats._id,
            index: coll.index,
            name: coll.name,
            wrong: collStats.wrongTrain,
            correct: collStats.correctTrain,
            words:[]
        } 

        for (let i = 0; i < words.length; i++) {
            res.words.push(
                {
                _id : words[i].wordId,
                name : words[i].original,
                wrong: wordsStats[i].correctTrain,
                correct:wordsStats[i].wrongTrain,
                }
            )
            
        }
        collStats.words.forEach((word:any) => {
            //let name = (await apiHelpers.get(`/collections/${collectionId}/words/${word.wordId}`)).data
            console.log(name)
            
        });
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
    
    return res
}
