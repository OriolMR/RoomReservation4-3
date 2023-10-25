using Microsoft.AspNetCore.Authorization;
using RoomsApiCrudIdentity.Policies.Requirements;
using RoomsApiCrudIdentity.Entities;

namespace RoomsApiCrudIdentity.Policies.Handlers;

public class ReservationSameCreatorHandler
    : AuthorizationHandler<ReservationAccessRequirement, Reservation>
{
    public ReservationSameCreatorHandler() { }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ReservationAccessRequirement requirement,
        Reservation resource
    )
    {
        if (
            context.User.Claims.FirstOrDefault(claim =>
            {
                return (claim.Type == "UserId") && claim.Value == resource.UserId;
            })
            is not null
        )
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
