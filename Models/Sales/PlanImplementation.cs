using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Softwave_test.Models.Sales
{
    public class PlanImplementation
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public float Persentage { get; set; }

        public PlanImplementation(int year, float persentage)
        {
            Year = year;
            Persentage = persentage;
        }
    }
}
