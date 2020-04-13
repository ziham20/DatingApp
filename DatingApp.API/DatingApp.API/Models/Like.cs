using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; } // users likes a another user
        public int LikeeId { get; set; } // being liked by another user

        public User Liker { get; set; }

        public User Likee { get; set; }
    }
}
