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
    metrics: Array<IMetric>;
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
    weeklyEvaluation: string;
    processes: Array<IProcessReport>;
    tenant: string | null;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}

export interface IProcessReport {
    _id: Object | null;
    id: Object | null;
    group: string;
    name: string;
    description: string;
    files: Array<any>;
    weeklyReport: string | null;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
    
}

export interface weeklyReportMapping {

}


export interface IMetricGroup {
    id: string;
    metrics: Array<IMetric>;
}

export interface IProcessGroup {
    id: string;
    key: string;
    entities: Array<IProcessName>;
}

export interface IProcessName {
    id: string;
    key: string;
}
export interface IMetric {
    name: string;
    value: number;
}