using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Softwave_test.Models.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Softwave_test.Models
{
    public class AppDbContext: IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<PlanImplementation> PlanImplementations { get; set; }
        public DbSet<ProductSales> ProductSales { get; set; }
    }
}
