import axios from "axios";
let baseURL = "http://localhost:3000/"
if (process.env.NODE_ENV === 'production') {
    baseURL = "https://email-server-8ncp.onrender.com"
}
export const myAxios = axios.create(
    {
        baseURL
    }
)