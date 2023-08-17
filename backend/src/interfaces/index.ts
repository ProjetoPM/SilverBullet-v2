export interface IProject {
  _id: Object;
  id: Object | null;
  project: Object | null;
  name: string;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IWeeklyEvaluation {
  name: string;
  type: string;
  startDate: Date | string;
  endDate: Date | string;
  metrics: IMetric[];
}

export interface IWeeklyReport {
  _id: Object | null;
  id: Object | null;
  name: string;
  endDate: Date | string;
  score?: IMetricGroup;
  weeklyEvaluation: string;
  processes: IProcessReport[];
  tenant: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IProcessReport {
  _id?: Object | string;
  id?: Object | string;
  __v: number;
  group: string;
  name: string;
  description: string;
  content: IContent;
  weeklyReport: string | null;
  createdBy?: Object | string;
  updatedBy?: Object | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type IContent = {
  id?: Object | string;
  _id?: Object | string;
  folder: string;
  files: IFile[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};


export interface IFile {
  name: string;
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
