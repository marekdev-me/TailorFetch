"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
var TailorFetch = /** @class */ (function () {
    function TailorFetch() {
    }
    // private static async makeRequest(urlStr: string, method: string,  options: IRequestOptions): Promise<unknown> {
    //     const { headers, queryParams, timeout, parseJSON, transformResponse, data } = options;
    //
    //     // Parse URL
    //     const url= new URL(urlStr);
    //
    //     // Handle query parameters
    //     if (queryParams) {
    //         for (const key in queryParams) {
    //             url.searchParams.append(key, queryParams[key]);
    //         }
    //     }
    //
    //     // Handle request data
    //     const requestBody = data ? JSON.stringify(data) : undefined;
    //
    //     // Handle request headers
    //     const requestOptions: HttpRequestOptions = {
    //         method,
    //         headers: {
    //             ...(headers || {}),
    //             'Content-Type': requestBody ? 'application/json' : 'application/octet-stream',
    //             'Content-Length': requestBody ? Buffer.byteLength(requestBody) : 0,
    //         },
    //         timeout
    //     }
    //
    //     const httpModule = url.protocol === 'https:' ? https : http;
    //
    //     return new Promise((resolve, reject) => {
    //         const req = httpModule.request(url.toString(), requestOptions, (res: IncomingMessage) => {
    //             let responseData = "";
    //
    //             res.on('data', (chunk) => {
    //                responseData += chunk;
    //             });
    //
    //             res.on('end', () => {
    //                if (parseJSON) {
    //                    try {
    //                        const jsonData = JSON.parse(responseData);
    //
    //                        if (transformResponse) {
    //                            const transformedResponse = transformResponse.transform(jsonData);
    //                            resolve(transformedResponse);
    //                        }
    //
    //                        resolve(jsonData);
    //                    } catch (error) {
    //                        reject(error);
    //                    }
    //                }
    //
    //                if (transformResponse) {
    //                    const transformedResponse = transformResponse.transform(responseData);
    //                    resolve(transformedResponse);
    //                }
    //
    //                if (!parseJSON || !transformResponse) {
    //                    resolve(responseData);
    //                }
    //             });
    //         });
    //
    //         req.on('error', (error) => {
    //            reject(error);
    //         });
    //
    //         if (requestBody) {
    //             req.write(requestBody);
    //         }
    //
    //         if (timeout) {
    //             req.setTimeout(timeout, () => {
    //                req.destroy();
    //                reject(new Error('Request timed out'));
    //             });
    //         }
    //
    //         req.end();
    //     });
    // }
    /**
     * Make an HTTP GET request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    TailorFetch.GET = function (urlStr, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Request_1.default(urlStr, 'GET', options).execute()];
            });
        });
    };
    /**
     * Make an HTTP POST request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    TailorFetch.POST = function (urlStr, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Make an HTTP PUT request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    TailorFetch.PUT = function (urlStr, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Make an HTTP PATCH request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to make request to
     * @constructor
     */
    TailorFetch.PATCH = function (urlStr, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Make an HTTP DELETE request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to add to request
     */
    TailorFetch.DELETE = function (urlStr, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    TailorFetch.OPTIONS = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return TailorFetch;
}());
exports.default = TailorFetch;
