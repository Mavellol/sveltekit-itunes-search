import axios, { AxiosInstance } from 'axios';

export class ApiService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({});

        this.api.interceptors.request.use(
            (req: any) => {
                console.log("-> request req", req)
                return req;
            },
            (error: any) => {
                console.log("-> request error", error)
                return error;
            },
        );
        this.api.interceptors.response.use(
            (res: any) => {
                console.log("-> response req", res)
                return res;
            },
            (error: any) => {
                console.log("-> response error", error)
                return error;
            },
        );
    }
}
