import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointEnvironmentResolver } from '../../../../../environments/endpoint.resolver.environment';
import { BaseHttpClient } from '../../../infrastructure/http-clients/base.http-client';

@Injectable({
  providedIn: 'root'
})
export class KumojinEventHttpClient extends BaseHttpClient {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    const resolver = new EndpointEnvironmentResolver();

    return resolver.getEndpointSafeUrl('5001') + 'api/';
  }
}
