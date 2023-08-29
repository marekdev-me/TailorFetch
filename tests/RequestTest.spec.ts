import {describe} from "node:test";
import TailorFetch, {TailorResponse} from "../src/index";

describe('make GET, POST, PUT, PATCH, DELETE requests', () => {
   it('should make a GET request and get data back', async () => {

      const response: TailorResponse = await TailorFetch.GET('', { parseJSON: true });

   });
});