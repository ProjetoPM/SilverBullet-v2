export interface IProject {
    _id: Object | null;
    id: Object | null;
    project: Object | null;
    name: string;
    description: string;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}

export interface IWeeklyEvaluation {
    _id: Object | null;
    id: Object | null;
    name: string;
    type: string;
    startDate: Date | string;
    endDate: Date | string;
    metrics: Array<IMetricGroup>;
    tenant: string | null;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}

export interface IWeeklyReport {
    _id: Object | null;
    id: Object | null;
    name: string;
    endDate: Date | string;
    score?: IMetricGroup;
    weeklyEvaluation: string | null;
    tenant: string | null;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}

export interface IMetricGroup {
    name: string;
    value: number;
}