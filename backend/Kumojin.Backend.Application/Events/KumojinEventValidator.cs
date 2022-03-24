using FluentValidation;
using Kumojin.Backend.Domain.KumojinEvents;

namespace Kumojin.Backend.Application.Events
{
    /// <summary>
    /// A validation class for kumojin Event data
    /// </summary>
    public class KumojinEventValidator : AbstractValidator<KumojinEvent>
    {
        public KumojinEventValidator()
        {
            RuleFor(e => e.DisplayName).NotEmpty().MaximumLength(32);
            RuleFor(e => e.Description).NotEmpty().MaximumLength(500);
            RuleFor(e => e.StartAt).NotEmpty();
            RuleFor(e => e.EndAt).NotEmpty();
        }
    }
}