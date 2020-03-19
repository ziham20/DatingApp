using Microsoft.AspNetCore.Http;
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
