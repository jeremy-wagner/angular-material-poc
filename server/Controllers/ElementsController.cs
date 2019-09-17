using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Elements : ControllerBase
    {
        public ElementService elementService = new ElementService();

        // GET api/elements
        [HttpGet]
        public IActionResult GetElements()
        {
            var elements = elementService.GetAllElements().ToList();
            return Ok(elements);
        }

        [HttpGet]
        [Route("Filtered")]
        public IActionResult GetFilteredElements(int pageNumber, int pageSize, string sort="asc", string nameFilter = null)
        {
            List<Element> elements = elementService.GetAllElements();

            // Filter
            if(nameFilter != null)
            {
                elements = elements.Where(x => x.Name.ToLower().Contains(nameFilter.ToLower())).ToList();
            }
            
            // Calculate Total Count
            var totalCount = elements.Count();

            // Sort
            if(sort == "asc"){
                elements = elements
                    .OrderBy(x => x.AtomicNumber)
                    .ToList();
            } else {
                elements = elements
                    .OrderByDescending(x => x.AtomicNumber)
                    .ToList();
            }
            
            // Pagination
            elements = elements
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new {
                Elements = elements,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };

            return Ok(result);
        }


    }
}
