using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }

        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }


        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            this.TotalCount = count;
            this.CurrentPage = pageNumber;         
            this.PageSize = pageSize ;
            this.TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize) 
        {
            var count = await source.CountAsync(); //aggregate method is used to get the count of items in the source
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(); //new list of items
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
