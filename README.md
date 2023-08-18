# TailorFetch

TailorFetch is a lightweight Node.js library for making HTTP requests with customizable options and response transformations.

## Installation

```bash
npm install tailorfetch 
```

## Features
 - Simplified HTTP GET, POST, PUT, PATCH, DELETE requests
 - Flexible options for headers, query parameters, timeouts, and more
 - Ability to transform response data using custom transformers
 - Easy-to-use interface for handling common use cases
 - Enables use of Redis caching

## Usage
### Making GET Request
```typescript
import TailorFetch from 'tailorfetch';

const url = 'https://api.example.com/data';
const options = {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
  queryParams: { 'param1': 'value1' },
  timeout: 5000,
  parseJSON: true,
};

TailorFetch.GET(url, options)
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Making POST Request
```typescript
import TailorFetch from 'tailorfetch';

const url = 'https://api.example.com/post';
const options = {
    headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
    data: {
        key: 'value'
    },
    timeout: 5000,
    parseJSON: true,
};

TailorFetch.POST(url, options)
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });

```

## Options:
 - `headers`: An object containing request headers.
 - `queryParams`: An object containing query parameters for the URL.
 - `timeout`: The request timeout in milliseconds.
 - `parseJSON`: Set to `true` to parse the response as JSON.
 - `body`: Data to be sent to remote server
 - `transformResponse`: A custom response transformer.
 - `requestMode`
 - `requestCache`
 - `requestCredentials`
 - -`onProgress`: Callback function for progress reporting
 - `cache`:
   - `expiresIn`: How long should cache be valid for (milliseconds)
   - `redisClient`: Redis client
 - `retry`:
   - `maxRetries`: Maximum number of times to attempt to make an HTTP request
   - `retryDelay`: Number of milliseconds to wait between attempts

## Redis Cache
You can use Redis cache with GET requests by supplying Redis client to request cache options as follows

```typescript
import TailorFetch from 'tailorfetch';
import { createClient } from 'redis';

const client = createClient();

client.on('error', (error) => console.log(error));

client.connect();

const response = await TailorFetch.GET('https://dummyjson.com/products/1', {
    parseJSON: true, 
    transformResponse: new ProductTransformer(), 
    cache: {
      expiresIn: 600000,
      redisClient: client
    }
});
```

## Custom Transformers

You can define a custom response transformer by extending the `BaseTransform` class and overriding the `transform` method.

```typescript
import {BaseTransform, IRequestOptions} from 'tailorfetch';

class MyTransformer extends BaseTransform {
   transform(responseData: string | ReadableStream<any>, requestOptions: IRequestOptions) {
      // Custom transformation logic
      return transformedData;
   }
}

const options = {
   transformResponse: new MyTransformer(),
};

TailorFetch.GET(url, options)
        .then(response => {
           console.log('Transformed Response:', response);
        })
        .catch(error => {
           console.error('Error:', error);
        });

```