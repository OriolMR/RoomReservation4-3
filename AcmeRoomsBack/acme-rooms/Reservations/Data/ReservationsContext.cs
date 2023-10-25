using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reservation.Entities;

namespace Reservations.Data
{
    public class ReservationsContext : DbContext
    {
        public ReservationsContext (DbContextOptions<ReservationsContext> options)
            : base(options)
        {
        }

        public DbSet<Reservation.Entities.Reservation> Reservation { get; set; } = default!;
    }
}
