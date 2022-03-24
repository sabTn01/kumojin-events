using System;
using System.Net;
using System.Threading.Tasks;
using Kumojin.Backend.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Kumojin.Backend.Web.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BaseException ex)
            {
                _logger.LogError(ex, "Kumojin Event error {ExceptionStatusCode}: {ExceptionMessage}", ex.StatusCode,
                    ex.Message);

                await HandleExceptionAsync(context, ex, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error 500: {ExceptionMessage}", ex.Message);

                await HandleExceptionAsync(context, ex, HttpStatusCode.InternalServerError);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception, HttpStatusCode statusCode)
        {
            var exceptionWrapper = new ApiExceptionWrapper
            {
                ExceptionName = exception.GetType().FullName ?? string.Empty,
                ExceptionMessage = exception.Message
            };

            var result = JsonConvert.SerializeObject(exceptionWrapper);

            if (!context.Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(result);
        }
    }
}