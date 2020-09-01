using Softwave_test.Models.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Softwave_test.Models
{
    public static class DbInitializer
    {
        private static AppDbContext _db;

        public static void Initialize(this AppDbContext db)
        {
            _db = db;
            _db.Database.EnsureCreated();

            CheckPlanImplementations();
            CheckSales();

            _db.SaveChanges();
        }

        static void CheckPlanImplementations()
        {
            if (!_db.PlanImplementations.Any())
            {
                var planImps = new List<PlanImplementation>()
                {
                    new PlanImplementation(2017, 60),
                    new PlanImplementation(2018, 90)
                };

                _db.PlanImplementations.AddRange(planImps);
            }
        }

        static void CheckSales()
        {
            if(!_db.ProductSales.Any())
            {
                var sales = new List<ProductSales>()
                {
                    new ProductSales(2017, "cat1", 4, 10),
                    new ProductSales(2017, "cat2", 2, 10),
                    new ProductSales(2017, "cat3", 7, 12),
                    new ProductSales(2017, "cat4", 4, 10),
                    new ProductSales(2017, "cat5", 8, 10),
                    new ProductSales(2017, "cat6", 3, 10),
                    new ProductSales(2017, "cat7", 4, 10),
                    new ProductSales(2017, "cat8", 4, 10),

                    new ProductSales(2018, "cat1", 2, 10),
                    new ProductSales(2018, "cat2", 8, 10),
                    new ProductSales(2018, "cat3", 1, 12),
                    new ProductSales(2018, "cat4", 6, 10),
                    new ProductSales(2018, "cat5", 8, 10),
                    new ProductSales(2018, "cat6", 3, 10),
                    new ProductSales(2018, "cat7", 9, 10),
                    new ProductSales(2018, "cat8", 10, 10),
                };

                _db.ProductSales.AddRange(sales);
            }
        }
    }
}
