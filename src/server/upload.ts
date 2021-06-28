import axios, { Method } from "axios";
const host = `http://127.0.0.1:7001`

export function upload(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const formdata = new FormData();
        formdata.append("file", file);
        axios.post(`${host}/upload/static/file`, formdata).then(({data}) => resolve(data)).catch((err) => reject(err))
    })


}
