using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LockedDates.Entities;

namespace LockedDates.Data
{
    public class LockedDatesContext : DbContext
    {
        public LockedDatesContext (DbContextOptions<LockedDatesContext> options)
            : base(options)
        {
        }

        public DbSet<LockedDates.Entities.LockedDate> LockedDates { get; set; } = default!;
    }
}
