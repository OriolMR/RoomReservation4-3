using Microsoft.AspNetCore.Authorization;
using Reservations.Policies.Requirements;
using Reservations.Entities;

namespace Reservations.Policies.Handlers;

public class AdminHandler : AuthorizationHandler<ReservationAccessRequirement, Reservation>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ReservationAccessRequirement requirement,
        Reservation resource
    )
    {
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
