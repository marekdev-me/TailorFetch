<p align="center">
  <img src="https://i.ibb.co/W6MBLYg/logo-removebg-preview.png"  alt=""/>
</p>

# TailorFetch

TailorFetch is a lightweight Node.js library for making HTTP requests with customizable options and response transformations.

> **Warning**
> WIP! Documentation might be outdated or incomplete

## Installation

```bash
npm install tailorfetch 
```

## Features
 - Simplified HTTP GET, POST, PUT, PATCH, DELETE requests
 - Flexible options for headers, query parameters, timeouts, and more
 - Ability to transform response data using custom transformers
 - Ability to intercept request with custom intercept logic
 - Easy-to-use interface for handling common use cases
 - Enables use of Redis or built-in caching

## Usage
### Making GET Request
```typescript
import TailorFetch from 'tailorfetch';

await TailorFetch.GET('https://dummyjson.com/products');
```

### Making POST Request
```typescript
import TailorFetch from 'tailorfetch';

const url = 'https://dummyjson.com/products/add';
const options = {
    body: JSON.stringify({
      title: 'BMW Pencil'
    }),
};

await TailorFetch.POST(url, options);
```

## Options:
 - `headers`: An object containing request headers.
 - `queryParams`: An object containing query parameters for the URL.
 - `timeout`: The request timeout in milliseconds.
 - `parseJSON`: Set to `true` to parse the response as JSON.
 - `body`: Data to be sent to remote server
 - `transformResponse`: A custom response transformer.
 - `requestInterceptor`: A custom request interceptor
 - `requestMode`
 - `requestCache`
 - `requestCredentials`
 - `onProgress`: Callback function for progress reporting
 - `cache`:
   - `expiresIn`: How long should cache be valid for (milliseconds)
   - `redisClient`: Redis client
 - `retry`:
   - `maxRetries`: Maximum number of times to attempt to make an HTTP request
   - `retryDelay`: Number of milliseconds to wait between attempts

## Cache

### Built-in cache

> **Warning**
> Built-in cache might be unstable and might return live results at all times

By default when cache option is specified with only expiry time and no redis client option has been specified then internal cache will be used.

### Redis Cache
You can use Redis cache with GET requests by supplying Redis client to request cache options as follows.

```typescript
import TailorFetch, { TailorResponse } from 'tailorfetch';
import {createClient} from 'redis';

// Setup redis
const client = createClient();
client.on('error', (error) => console.log(error));
client.connect();

// Request options
const options = {
   cache: {
      expiresIn: 600000,
      redisClient: client
   }
};

await TailorFetch.GET('https://dummyjson.com/products/1', options);
```

## Custom Request Interceptor

You can define a custom request transformer by extending the `BaseRequestInterceptor` class and overriding the `intercept` method.
Modify headers, add authentication, or enhance the request before it's sent.

```typescript
import {BaseRequestInterceptor, IRequestOptions} from 'tailorfetch';

class MyInterceptor extends BaseRequestInterceptor {
   intercept(requestOptions: RequestInit) {
      // Custom intercept logic
      
      return requestOptions;
   }
}

const options = {
   requestInterceptor: new MyInterceptor(),
};

await TailorFetch.GET(url, options);
```

## Custom Response Transformer

You can define a custom response transformer by extending the `BaseTransform` class and overriding the `transform` method.

```typescript
import TailorFetch, {BaseTransform, IRequestOptions} from 'tailorfetch';

class MyTransformer extends BaseTransform {
   transform(responseData: string | ReadableStream<any>, requestOptions: IRequestOptions) {
      // Custom transformation logic
      return transformedData;
   }
}

const options = {
   transformResponse: new MyTransformer(),
};

await TailorFetch.GET(url, options);
```

## Helper Functions

### `TailorResponse`
Following helper functions are awailable on `TailorResponse` returned when request is made

   - `json()` - Returns parsed JSON data, only if `parseJSON` request option is false
   - `successful()` - Returns boolean wether request was successful
   - `failed()` - Returns boolean whether request has failed
   - `clientError()` - Returns boolean whether an error was client error
   - `serverError()` - Returns boolean whether an error was server error