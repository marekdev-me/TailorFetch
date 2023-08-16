import IRequestOptions from "./IRequestOptions";

export default abstract class BaseTransform {
    abstract transform(responseData: any, requestOptions: IRequestOptions): any;
}