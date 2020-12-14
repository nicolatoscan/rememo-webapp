import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getClasses(): Promise<Models.StudyClass[]> {
    try {
        return (await apiHelpers.get('/class')).data as Models.StudyClass[];
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function createClass(className: string): Promise<void> {
    try {
        await apiHelpers.post('/class', { name: className });
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}