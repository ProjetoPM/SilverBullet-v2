export interface IProject {
  _id: Object;
  id: Object | null;
  project: any | null;
  name: string;
  tenant: Object | string;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IWeeklyEvaluation {
  name: string;
  type: string;
  startDate: Date | string;
  endDate: Date | string;
  metricGroup: IMetricGroup;
}

export interface IWeeklyReport {
  _id: Object | null;
  id?: Object | string;
  name: string;
  endDate: Date | string;
  score?: IMetric;
  weeklyEvaluation: string | object;
  processes: IProcessReport[];
  tenant: string | null;
  project: string | null;
  createdBy: string | object;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IProcessReport {
  _id?: Object | string;
  id?: Object | string;
  __v?: number;
  group: string;
  name: string;
  description?: string;
  filesFolder: string;
  weeklyReport?: string | null;
  createdBy?: Object | string;
  updatedBy?: Object | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
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

export interface IMetricGroup {
  metricGroupId: string;
  metrics: IMetric[];
}
