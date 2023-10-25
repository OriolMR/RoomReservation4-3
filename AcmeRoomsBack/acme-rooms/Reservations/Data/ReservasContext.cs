using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reservations.Entities;

namespace Reservations.Data
{
    public class ReservasContext : DbContext
    {
        public ReservasContext (DbContextOptions<ReservasContext> options)
            : base(options)
        {
        }

        public DbSet<Reservations.Entities.Reservation> Reservations { get; set; } = default!;
    }
}
 