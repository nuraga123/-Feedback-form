interface IHttpClient {
  baseUrl: string;
  request(url: string, method: string, params?: { [key: string]: any }): Promise<any>;
}

export default class HttpClient implements IHttpClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  request(url: string, method: string, params?: { [key: string]: any }): Promise<any> {
    return new Promise((resolve, reject) => {
      const random = Math.random() * 100;
      if (random <= 70) {
        resolve({
          data: 'success'
        });
      } else {
        reject({
          error: new Error('some error')
        });
      }
    })
  }
}

