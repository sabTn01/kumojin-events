export class EndpointEnvironmentResolver {
  public getEndpointSafeUrl(runningPort: string, basePath: string = ''): string {
    if (this.isLocalhost()) {
      return 'https://' + window.location.hostname + ':' + runningPort + '/';
    }

    return 'https://' + window.location.hostname + '/' + basePath + '/';
  }

  public isLocalhost(): boolean {
    return window.location.hostname.indexOf('localhost') !== -1 || window.location.hostname.indexOf('192.168') !== -1;
  }
}
