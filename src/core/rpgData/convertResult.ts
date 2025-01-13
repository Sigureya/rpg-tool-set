export interface ConvertResult<ResultType, SrcType> {
  result: ResultType[];
  fileName: string;
  errors: ConvertError<SrcType>[];
}
interface ConvertError<T> {
  data: T;
  index: number;
  error: unknown;
}
