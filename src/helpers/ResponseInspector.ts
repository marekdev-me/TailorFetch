import TailorResponse from "../Response";

export default class ResponseInspector {

    constructor() {
        // Maybe later
    }

    private static output = (response: TailorResponse) => {
        console.log('----------------------BEGIN RESPONSE INSPECTOR--------------------------');

        if (response.successful()) {
            console.log(`  Request Name: ${response.requestOptions.name ?? 'Unknown'}`);
            console.log(`  Status: ${response.status}`);
            console.log(`  Headers: ${JSON.stringify(response.headers, null, 2)}`);
            console.log(`  Data: ${JSON.stringify(response.data, null, 2)}`);
        }

        if (response.failed()) {
            console.error(`  Request Name: ${response.requestOptions.name ?? 'Unknown'}`);
            console.error(`  Error: Response failed`);
            console.error(`  Status: ${response.status}`);
            console.error(`  Headers: ${JSON.stringify(response.headers, null, 2)}`);
            console.error(`  Data: ${JSON.stringify(response.data, null, 2)}`);
        }

        console.log('----------------------END RESPONSE INSPECTOR-----------------------------')
    }

    static inspectSingle = (response: TailorResponse) => {
        ResponseInspector.output(response);
    }

    static inspectMultiple = (responses: TailorResponse[])=> {
        responses.forEach((response: TailorResponse) => {
            ResponseInspector.output(response);
        })
    }
}