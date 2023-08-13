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
  metrics: Array<IMetric>;
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
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IProcessReport {
  _id?: Object | string;
  id?: Object | string;
  group: string;
  name: string;
  description: string;
  files: Array<any>;
  weeklyReport: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IFile {
  name: string;
  path: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: object;
  webkitRelativePath: string;
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
