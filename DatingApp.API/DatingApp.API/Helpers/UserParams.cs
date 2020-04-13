using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class UserParams
    {
		private const int MaxPageSize = 20; //max page size
		public int PageNumber { get; set; } = 1; // return always  the first page

		private int pageSize = 10; //default page size
		public int PageSize
		{
			get { return pageSize; }
			set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; } 
		}

		public int UserId { get; set; }

		public string Gender { get; set; }

		public int MinAge { get; set; } = 18;

		public int MaxAge { get; set; } = 99;

		public string OrderBy { get; set; }

		public bool Likees { get; set; } = false;

		public bool Likers { get; set; } = false;

	}
}
