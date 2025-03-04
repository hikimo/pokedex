export type TResults = {
  name: string;
  url: string;
};

export interface ICommonResponse {
  count: number;
  next?: string;
  previous?: string;
  results: TResults[]
}