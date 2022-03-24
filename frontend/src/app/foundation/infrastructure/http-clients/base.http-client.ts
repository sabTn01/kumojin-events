import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlSerializerUtil } from '../utils/url-serializer.util';

export abstract class BaseHttpClient {
  protected constructor(protected http: HttpClient) {
  }

  public post<TBody, TResult>(endpoint: string, body: TBody): Observable<TResult> {
    const url = this.buildCompleteUrl(endpoint);
    const headers = this.createBaseHeaders();

    return this.http.post<TResult>(url, body, {
      headers: headers
    });
  }

  public put<TBody, TResult>(endpoint: string, body: TBody): Observable<TResult> {
    const url = this.buildCompleteUrl(endpoint);
    const headers = this.createBaseHeaders();

    return this.http.put<TResult>(url, body, {
      headers: headers
    });
  }

  public get<TQuery, TResult>(endpoint: string, parametersToSerialize: TQuery | null = null): Observable<TResult> {
    const params = (parametersToSerialize) ? UrlSerializerUtil.serialize(parametersToSerialize) : '';

    const url = this.buildCompleteUrl(endpoint) + params;
    const headers = this.createBaseHeaders();

    return this.http.get<TResult>(url, {
      headers: headers
    });
  }

  public delete(endpoint: string): Observable<any> {
    const url = this.buildCompleteUrl(endpoint);
    const headers = this.createBaseHeaders();

    return this.http.delete(url, {
      headers: headers
    });
  }

  protected abstract getBaseUrl(): string;

  private buildCompleteUrl(endpoint: string): string {
    return this.getBaseUrl() + endpoint;
  }

  private createBaseHeaders(): HttpHeaders {
    let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzE2MjM5MDIyfQ.gFgwPdkGPEcQGjoy934vFv9pyjVO6e_18MAF7Fpf9kI';
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Headers', 'application/json');
    headers = headers.append('Access-Control-Allow-Methods', '*');
    headers = headers.append('Authorization', 'Bearer ' + accessToken);

    return headers;
  }
}
