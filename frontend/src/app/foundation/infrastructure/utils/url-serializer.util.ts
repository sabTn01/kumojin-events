export class UrlSerializerUtil {
  public static serialize(obj: any): string {
    let parts: string[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const encodedParameterName = encodeURIComponent(key);
        const parameterValue = UrlSerializerUtil.formatValue(key, obj[key]);

        if (parameterValue instanceof Array) {
          parts = parts.concat(parameterValue);
        } else {
          parts.push(`${encodedParameterName}=${parameterValue}`);
        }
      }
    }

    return '?' + parts.join('&');
  }

  private static formatValue(parameterName: any, object: any): string | string[] {
    if (object instanceof Date) {
      return object.toISOString();
    }

    if (object instanceof Array) {
      const returnArray: string[] = [];

      for (const innerArrayKey in object) {
        if (object.hasOwnProperty(innerArrayKey)) {
          const encodedParameterName = encodeURIComponent(parameterName);
          const encodedParameterValue = UrlSerializerUtil.formatValue(innerArrayKey, object[innerArrayKey]);

          returnArray.push(`${encodedParameterName}=${encodedParameterValue}`);
        }
      }

      return returnArray;
    }

    return encodeURIComponent(object);
  }
}
