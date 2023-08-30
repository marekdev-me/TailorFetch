export default abstract class BaseRequestInterceptor {
    intercept(requestOptions: RequestInit): RequestInit {
        return requestOptions;
    }
}