using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //next means once the action is completed
            var resultsContext = await next();

            var userId = int.Parse(resultsContext.HttpContext.User.
                FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultsContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            
            var user = await repo.GetUser(userId);

            //updates last active row
            user.LastActive = DateTime.Now;
                        
            await repo.SaveAll();
        }
    }
}
