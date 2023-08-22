import BaseTransform from "./BaseTransform";
import {BufferSource} from "stream/web";
import {createClient} from 'redis';

type redisClient = ReturnType<typeof createClient>;

export default interface IRequestOptions {
    headers?: {[key: string]: string};
    queryParams?: {[key: string]: string};
    timeout?: number;
    transformResponse?: BaseTransform;
    body?: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string | null;
    parseJSON?: boolean;
    requestMode?: "navigate" | "same-origin" | "no-cors" | "cors",
    requestCache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached",
    requestCredentials?: "omit" | "same-origin" | "include",
    cache?: {
        expiresIn: number;
        redisClient?: redisClient
    },
    retry?: {
        maxRetries: number;
        retryDelay: number;
    },
    auth?: {
        type: 'basic' | 'digest',
        username: string,
        password: string,
    },
    onProgress?: (loaded: number, total: number) => void;
}