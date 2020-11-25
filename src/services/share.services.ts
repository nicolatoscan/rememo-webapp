import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function shareCollection(collectionId: string): Promise<string> {
    try {
        const url = (await apiHelpers.get(`/share/${collectionId}`)).data?.url as string | null;
        if (!url)
            throw new Models.ApiError(400, 'No url was generated')
        return url;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function importCollection(collectionId: string): Promise<void> {
    try {
        (await apiHelpers.get(`/share/import/${collectionId}`));
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}