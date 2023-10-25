using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Locations.Data;
using Locations.Entities;
using Microsoft.AspNetCore.Cors;

namespace Locations.Controllers;
    //[Authorize]
    [EnableCors("MyCorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]

public class CountriesController : Controller
{
    private readonly LocationsContext _context;

    public CountriesController(LocationsContext context)
    {
        _context = context;
    }

    // GET: Countries
    [HttpGet]
    [Route("GetAllCountries")]
    public async Task<IActionResult> GetAllCountries() =>
        Ok(await _context.Countries.ToListAsync());

    [HttpGet]
    [Route("GetCountryById")]
    public async Task<IActionResult> GetCountryById(int id) =>
    Ok(await _context.Countries.FindAsync(id));

    // CREATE: Countries
    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("CreateCountry")]
    public async Task<IActionResult> CreateCountry(Country country)
    {
        _context.Countries.Add(country);
        await _context.SaveChangesAsync();
        return Created($"/GetCountryById?id={country.Id}", country);
    }

    //UPDATE: Countries
    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    [Route("UpdateCountry")]
    public async Task<IActionResult> UpdateCountry(Country countryToUpdate)
    {
        _context.Countries.Update(countryToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    //DELETE: Countries
    // [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    [Route("DeleteCountry")]
    public async Task<IActionResult> DeleteCountry(int id)
    {
        var countryToDelete = await _context.Countries.FindAsync(id);
        if (countryToDelete == null)
        {
            return NotFound();
        }
        _context.Countries.Remove(countryToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
