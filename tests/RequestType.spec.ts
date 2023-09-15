import { expect } from 'chai';
import TailorFetch, { TailorResponse } from '../src/index';

describe('Perform HTTP requests with corresponding HTTP methods', () => {

    it('it should make a GET request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.GET('https://dummyjson.com/test', { json: true });

        expect(response?.data?.status).equal('ok');
        expect(response?.data?.method).equal('GET', 'GET request failed');
    });

    it('it should make a POST request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.POST('https://dummyjson.com/test', { json: true });

        expect(response?.data?.status).equal('ok');
        expect(response?.data?.method).equal('POST', 'POST request failed');
    });

    it('it should make a PUT request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.PUT('https://dummyjson.com/test', { json: true });

        expect(response?.data?.status).equal('ok');
        expect(response?.data?.method).equal('PUT', 'PUT request failed');
    });

    it('it should make a PATCH request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.PATCH('https://dummyjson.com/test', { json: true });

        expect(response?.data?.status).equal('ok');
        expect(response?.data?.method).equal('PATCH', 'PATCH request failed');
    });

    it('it should make a DELETE request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.DELETE('https://dummyjson.com/test', { json: true });

        expect(response?.data?.status).equal('ok');
        expect(response?.data?.method).equal('DELETE', 'DELETE request failed');
    });


    it('it should make a OPTIONS request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.OPTIONS('https://dummyjson.com/test', { json: true });

        expect(response?.status).equal(204, 'OPTIONS request failed');
        expect(response?.statusText).equal('No Content', 'OPTIONS request failed');
    });

    it('it should make a HEAD request', async () => {
        const response: TailorResponse | undefined = await TailorFetch.HEAD('https://dummyjson.com/test', { json: true });

        expect(response?.status).equal(200, 'OPTIONS request failed');
        expect(response?.statusText).equal('OK', 'OPTIONS request failed');
    });
});