using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            //creates a instance of the pagiantion header class             
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
           
            //creating camel case setup for the response
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();

            //serialises the object
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            //removes cors error
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");  
        }

        /// <summary>
        ///  Calculates Age
        /// </summary>
        /// <param name="theDateTime">Users DOB</param>
        /// <returns>Age</returns>
        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year; //get age
            if (theDateTime.AddYears(age) > DateTime.Today)  //check if they had their bd
                age--; //reduce age by an year
            return age;
        }

    }
}
