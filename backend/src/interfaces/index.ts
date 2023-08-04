export interface IProject {
    _id: Object | null;
    id: Object | null;
    project: Object | null;
    name: string;
    description: string;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}