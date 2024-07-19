using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using backend2.Models;
using System.Configuration;

namespace backend2.Controllers
{
    [RoutePrefix("api/Test")]
    public class TestController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        //signup

        [HttpPost]
        [Route("signup")]
        public IHttpActionResult Signup(emp emp)
        {
            try
            {
                conn.Open();
                SqlCommand checkUsernameCmd = new SqlCommand("SELECT COUNT(*) FROM UserAccount WHERE Name = @Name", conn);
                checkUsernameCmd.Parameters.AddWithValue("@Name", emp.Name);
                int usernameCount = (int)checkUsernameCmd.ExecuteScalar();
                if (usernameCount > 0)
                {
                    conn.Close();
                    return BadRequest("Username already exists.");
                }
                SqlCommand cmd = new SqlCommand("user_signup", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", emp.Name);
                cmd.Parameters.AddWithValue("@Email", emp.Email);
                cmd.Parameters.AddWithValue("@Password", emp.Password);
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();
                if (rowsAffected > 0)
                {
                    return Ok("Registration successful.");
                }
                else
                {
                    return BadRequest("Failed to register user.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // signin

        [HttpPost]
        [Route("signin")]
        public string Signin(emp emp)
        {
            string msg = string.Empty;
            try
            {
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("user_signin", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Name", emp.Name);
                        object result = cmd.ExecuteScalar();
                        if (result != null && result != DBNull.Value && (int)result > 0)
                        {
                            msg = "User is Valid";
                        }
                        else
                        {
                            msg = "User is Invalid";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                msg = "Error occurred: " + ex.Message;
            }
            return msg;
        }
        //get
        [HttpGet]
        [Route("gethotel")]
        public IHttpActionResult GetHotels()
        {
            try
            {
                conn.Open();
                cmd = new SqlCommand("SELECT Id, Name, Description, Amenities FROM Hotels", conn);
                SqlDataReader reader = cmd.ExecuteReader();

                List<Hotel> hotels = new List<Hotel>();
                while (reader.Read())
                {
                    int id = Convert.ToInt32(reader["Id"]);
                    string name = reader["Name"].ToString();
                    string description = reader["Description"].ToString();
                    string amenities = reader["Amenities"].ToString();
                    string[] amenitiesArray = amenities.Split(new string[] { "  " }, StringSplitOptions.RemoveEmptyEntries);

                    List<string> amenitiesList = new List<string>(amenitiesArray);

                    Hotel hotel = new Hotel
                    {
                        Id = id,
                        Name = name,
                        Description = description,
                        Amenities = amenitiesList
                    };
                    hotels.Add(hotel);
                }
                conn.Close();

                return Ok(hotels);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }

       
        //add
        [HttpPost]
        [Route("addhotel")]
        public IHttpActionResult AddHotel(Hotel hotels)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Hotels (Name, Description, Amenities) VALUES (@Name, @Description, @Amenities)", conn))
                    {
                        cmd.Parameters.AddWithValue("@Name", hotels.Name);
                        cmd.Parameters.AddWithValue("@Description", hotels.Description);

                        // Convert the list of amenities to a comma-separated string
                        string amenities = string.Join(",", hotels.Amenities);
                        cmd.Parameters.AddWithValue("@Amenities", amenities);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Hotel added successfully.");
                        }
                        else
                        {
                            return InternalServerError(new Exception("Failed to add hotel."));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }

        //delete
        [HttpDelete]
        [Route("deletehotel/{hotelId}")]
        public IHttpActionResult DeleteHotel(int hotelId)
        {
            try
            {
                conn.Open();
                cmd = new SqlCommand("DELETE FROM Hotels WHERE Id = @hotelId", conn);
                cmd.Parameters.AddWithValue("@hotelId", hotelId);
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    return Ok("Hotel deleted successfully.");
                }
                else
                {
                    return NotFound(); 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }
        //update
        [HttpPut]
        [Route("edit-hotel/{hotelId}")]
        public IHttpActionResult EditHotel(int hotelId, HotelDTO updatedHotel)
        {
            try
            {
                if (updatedHotel == null)
                {
                    return BadRequest("Updated hotel data is null.");
                }

                conn.Open();
                SqlCommand cmd = new SqlCommand("UPDATE Hotels SET Name = @Name, Description = @Description, Amenities = @Amenities WHERE Id = @hotelId", conn);
                cmd.Parameters.AddWithValue("@hotelId", hotelId);
                cmd.Parameters.AddWithValue("@Name", updatedHotel.Name);
                cmd.Parameters.AddWithValue("@Description", updatedHotel.Description);
                cmd.Parameters.AddWithValue("@Amenities", updatedHotel.Amenities);
                

                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    return Ok("Hotel updated successfully.");
                }
                else
                {
                    return NotFound(); 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }


        //filter
        [HttpGet]
        [Route("gethotel/amenities/{selectedAmenities}")]
        public IHttpActionResult GetHotelsByAmenities(string selectedAmenities)
        {
            try
            {
                conn.Open();
                // Split the selected amenities into an array
                string[] selectedAmenitiesArray = selectedAmenities.Split(',');

                // Create the SQL parameter placeholders for each amenity
                List<string> parameterNames = new List<string>();
                for (int i = 0; i < selectedAmenitiesArray.Length; i++)
                {
                    string paramName = "@amenity" + i;
                    parameterNames.Add(paramName);
                }
                string parameters = string.Join(",", parameterNames);

                // Construct the SQL command with dynamic parameters
                string sqlCommandText = "SELECT Id, Name, Description, Amenities FROM Hotels WHERE ";
                for (int i = 0; i < selectedAmenitiesArray.Length; i++)
                {
                    if (i > 0)
                    {
                        sqlCommandText += " AND ";
                    }
                    sqlCommandText += "Amenities LIKE " + parameterNames[i];
                }

                SqlCommand cmd = new SqlCommand(sqlCommandText, conn);

                // Add parameter values to the command
                for (int i = 0; i < selectedAmenitiesArray.Length; i++)
                {
                    cmd.Parameters.AddWithValue(parameterNames[i], "%" + selectedAmenitiesArray[i] + "%");
                }

                SqlDataReader reader = cmd.ExecuteReader();

                List<Hotel> hotels = new List<Hotel>();
                while (reader.Read())
                {
                    int id = Convert.ToInt32(reader["Id"]);
                    string name = reader["Name"].ToString();
                    string description = reader["Description"].ToString();
                    string amenitiesList = reader["Amenities"].ToString();
                    string[] amenitiesArray = amenitiesList.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    List<string> amenities = new List<string>(amenitiesArray);

                    Hotel hotel = new Hotel
                    {
                        Id = id,
                        Name = name,
                        Description = description,
                        Amenities = amenities
                    };
                    hotels.Add(hotel);
                }
                conn.Close();

                return Ok(hotels);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }

        //getting ID
        [HttpGet]
        [Route("gethotel/{hotelId}")]
        public IHttpActionResult GetHotel(int hotelId)
        {
            try
            {
                conn.Open();
                cmd = new SqlCommand("SELECT Id, Name, Description, Amenities FROM Hotels WHERE Id = @hotelId", conn);
                cmd.Parameters.AddWithValue("@hotelId", hotelId); // Correct parameter name
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    int id = Convert.ToInt32(reader["Id"]);
                    string name = reader["Name"].ToString();
                    string description = reader["Description"].ToString();
                    string amenities = reader["Amenities"].ToString();
                    string[] amenitiesArray = amenities.Split(new string[] { "  " }, StringSplitOptions.RemoveEmptyEntries);

                    List<string> amenitiesList = new List<string>(amenitiesArray);

                    Hotel hotel = new Hotel
                    {
                        Id = id,
                        Name = name,
                        Description = description,
                        Amenities = amenitiesList
                    };
                    conn.Close();

                    return Ok(hotel);
                }
                else
                {
                    conn.Close();
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }

        //Booking 

        [HttpPost]
        [Route("Booking")]
        public IHttpActionResult Booking(Booking booking)
        {
            try
            {
                // Validate booking data (e.g., check for null values)
                if (booking == null)
                {
                    return BadRequest("Invalid booking data.");
                }

                // Save booking data to the database
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Bookings (HotelId, CheckInDate, CheckOutDate, NumRooms, TotalPrice, Name) VALUES (@HotelId, @CheckInDate, @CheckOutDate, @NumRooms, @TotalPrice, @Name); SELECT SCOPE_IDENTITY();", conn))
                    {
                        cmd.Parameters.AddWithValue("@HotelId", booking.HotelId);
                        cmd.Parameters.AddWithValue("@CheckInDate", booking.CheckInDate);
                        cmd.Parameters.AddWithValue("@CheckOutDate", booking.CheckOutDate);
                        cmd.Parameters.AddWithValue("@NumRooms", booking.NumRooms);
                        cmd.Parameters.AddWithValue("@TotalPrice", booking.TotalPrice);
                        cmd.Parameters.AddWithValue("@Name", booking.Name);

                        int bookingId = Convert.ToInt32(cmd.ExecuteScalar());

                        if (bookingId > 0)
                        {
                            // Return the BookingId to the frontend
                            return Ok(new { BookingId = bookingId, Message = "Booking successful." });
                        }
                        else
                        {
                            return BadRequest("Failed to book hotel.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log detailed error message
                Console.WriteLine("Error occurred: " + ex.Message);
                return InternalServerError(ex);
            }
        }


        //fetchbooking to frontend
        [HttpGet]
        [Route("GetAllBookingDetails")]
        public IHttpActionResult GetAllBookingDetails()
        {
            try
            {
                List<BookingDetails> bookingDetailsList = new List<BookingDetails>();

                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand("SELECT * FROM Bookings", conn))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            BookingDetails bookingDetails = new BookingDetails
                            {
                                BookingId = Convert.ToInt32(reader["BookingId"]),
                                HotelId = Convert.ToInt32(reader["HotelId"]),
                                CheckInDate = Convert.ToDateTime(reader["CheckInDate"]),
                                CheckOutDate = Convert.ToDateTime(reader["CheckOutDate"]),
                                NumRooms = Convert.ToInt32(reader["NumRooms"]),
                                TotalPrice = Convert.ToDecimal(reader["TotalPrice"]),
                                Name = reader["Name"].ToString()
                            };

                            bookingDetailsList.Add(bookingDetails);
                        }
                    }
                }

                return Ok(bookingDetailsList);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occurred: " + ex.Message);
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("feedback")]
        public IHttpActionResult SubmitFeedback(Feedback feedback)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Feedback (Name, Email, Message) VALUES (@Name, @Email, @Message)", conn))
                    {
                        cmd.Parameters.AddWithValue("@Name", feedback.Name);
                        cmd.Parameters.AddWithValue("@Email", feedback.Email);
                        cmd.Parameters.AddWithValue("@Message", feedback.Message);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Feedback submitted successfully.");
                        }
                        else
                        {
                            return InternalServerError(new Exception("Failed to submit feedback."));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return InternalServerError(ex);
            }
        }

        //fetch feedback
        [HttpGet]
        [Route("feedback")]
        public IHttpActionResult GetFeedback()
        {
            try
            {
                List<Feedback> feedbackList = new List<Feedback>();

                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand("SELECT * FROM Feedback", conn))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            Feedback feedback = new Feedback
                            {
                                Name = reader["Name"].ToString(),
                                Email = reader["Email"].ToString(),
                                Message = reader["Message"].ToString()
                            };

                            feedbackList.Add(feedback);
                        }
                    }
                }

                return Ok(feedbackList);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occurred: " + ex.Message);
                return InternalServerError(ex);
            }
        }



    }
}
