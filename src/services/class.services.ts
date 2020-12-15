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

export async function deleteClass(classId: string): Promise<void> {
    try {
        await apiHelpers.del(`/class/${classId}`);
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function getClassById(classId: string): Promise<Models.StudyClass> {
    try {
        return (await apiHelpers.get(`/class/${classId}`)).data as Models.StudyClass;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function getFullClassById(classId: string): Promise<Models.FullStudyClass> {
    try {
        return (await apiHelpers.get(`/class/${classId}/full`)).data as Models.FullStudyClass
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function addCollectionToClass(classId: string, collId: string): Promise<void> {
    try {
        await apiHelpers.put(`/class/${classId}/addCollection/${collId}`, {});
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function removeCollectionFromClass(classId: string, collId: string): Promise<void> {
    try {
        await apiHelpers.put(`/class/${classId}/removeCollection/${collId}`, {});
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function joinClass(classId: string): Promise<void> {
    try {
        await apiHelpers.put(`/class/${classId}/join`, {});
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function leaveClass(classId: string): Promise<void> {
    try {
        await apiHelpers.put(`/class/${classId}/leave`, {});
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function kickFromClass(classId: string, studentId: string): Promise<void> {
    try {
        await apiHelpers.put(`/class/${classId}/kick/${studentId}`, {});
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function renemaClass(classId: string, name: string): Promise<void> {
    try {
        await apiHelpers.put(`/class/${classId}`, { name: name });
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}
