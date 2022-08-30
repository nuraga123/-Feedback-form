import HttpClient from "../httpClient";

const httpClient = new HttpClient('https://some-api.com');

export function sendApiForm({ name, email, phone, date, message }: {
    name: string,
    email: string,
    phone: string,
    date: string,
    message: string
}) {
    return httpClient.request('/form', 'post', {
        name, email, phone, date, message
    })
}

