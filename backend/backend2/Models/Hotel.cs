using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend2.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Amenities { get; set; } // Change type to List<string>
    }
}
