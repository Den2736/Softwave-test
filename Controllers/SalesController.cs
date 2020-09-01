using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Softwave_test.Models;

namespace Softwave_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext db;

        public SalesController(AppDbContext db) => this.db = db;

        [HttpGet]
        public object Get()
        {
            var data = new List<object>();

            var sales = db.ProductSales.AsEnumerable();
            var plansImps = db.PlanImplementations.AsEnumerable();

            var years = sales.Select(s => s.Year)
                .Union(plansImps.Select(p => p.Year));

            foreach (var year in years)
            {
                var plan = plansImps.First(p => p.Year == year);
                var yearSales = sales.Where(s => s.Year == year).ToList();

                var circle1 = new
                {
                    value = plan.Persentage,
                    maxValue = 100
                };
                var circle2 = new
                {
                    value = yearSales.Sum(s => s.SaledCount),
                    maxValue = yearSales.Sum(s => s.MaxCount)
                };

                var categories = yearSales.Select(s =>
                    new
                    {
                        title = s.Product,
                        value = s.SaledCount,
                        maxValue = s.MaxCount
                    });

                data.Add(new
                {
                    year,
                    circle1,
                    circle2,
                    categories
                });
            }

            return new { data };
        }
    }
}
