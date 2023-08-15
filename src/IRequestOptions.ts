import BaseTransform from "./BaseTransform";

export default interface IRequestOptions {
    headers?: {[key: string]: string | number};
    queryParams?: {[key: string]: string};
    timeout?: number;
    transformResponse?: BaseTransform;
    data: any;
    parseJSON?: boolean;
}