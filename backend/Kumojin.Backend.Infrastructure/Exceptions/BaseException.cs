using System;
using System.Collections.Generic;
using System.Net;

namespace Kumojin.Backend.Infrastructure.Exceptions
{
    public class BaseException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }

        public ICollection<string> Errors { get; set; } = new List<string>();

        protected BaseException(string message, HttpStatusCode statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}