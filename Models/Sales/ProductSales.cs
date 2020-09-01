using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Softwave_test.Models.Sales
{
    public class ProductSales
    {
        public int Id { get; set; }

        public int Year { get; set; }
        public string Product { get; set; }
        public int SaledCount { get; set; }
        
        // it shouldn't be here, but it's a test task
        public int MaxCount { get; set; }

        public ProductSales(int year, string product, int saledCount, int maxCount)
        {
            Year = year;
            Product = product;
            SaledCount = saledCount;
            MaxCount = maxCount;
        }
    }
}