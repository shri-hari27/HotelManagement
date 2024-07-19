using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend2.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int HotelId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int NumRooms { get; set; }
        public decimal TotalPrice { get; set; }
        public string Name { get; set; }
    }
}