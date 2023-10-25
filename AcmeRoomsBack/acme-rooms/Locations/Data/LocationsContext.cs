using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Locations.Entities;

namespace Locations.Data
{
    public class LocationsContext : DbContext
    {
        public LocationsContext (DbContextOptions<LocationsContext> options)
            : base(options)
        {
        }

        public DbSet<Locations.Entities.Country> Countries { get; set; } = default!;

        public DbSet<Locations.Entities.City> Cities { get; set; } = default!;

        public DbSet<Locations.Entities.Office> Offices { get; set; } = default!;

        public DbSet<Locations.Entities.Room> Rooms { get; set; } = default!;
    }
}
