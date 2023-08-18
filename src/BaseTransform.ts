import IRequestOptions from "./IRequestOptions";

export default abstract class BaseTransform {
    abstract transform(responseData: string | ReadableStream, requestOptions: IRequestOptions): any;
}