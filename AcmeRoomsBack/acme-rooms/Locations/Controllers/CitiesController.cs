using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Locations.Data;
using Locations.Entities;

namespace Locations.Controllers;
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]

public class CitiesController : Controller
{
    private readonly LocationsContext _context;

    public CitiesController(LocationsContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetAllCities")]
    public async Task<IActionResult> GetAllCities() =>
            Ok(await _context.Cities.ToListAsync());

    [HttpGet]
    [Route("GetCityById")]
    public async Task<IActionResult> GetCityById(int id) =>
        Ok(await _context.Cities.FindAsync(id));

    [HttpGet]
    [Route("GetCitiesByCountryId")]
    public async Task<IActionResult> GetCitiesByCountryId(int countryId)
    {
        var result = await _context.Cities.Where(city => city.CountryId == countryId).ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("CreateCity")]
    public async Task<IActionResult> CreateCity(City city)
    {
        _context.Cities.Add(city);
        await _context.SaveChangesAsync();
        return Created($"/GetCityById?id={city.Id}", city);
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    [Route("UpdateCity")]
    public async Task<IActionResult> UpdateCity(City cityToUpdate)
    {
        _context.Cities.Update(cityToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    [Route("DeleteCity")]
    public async Task<IActionResult> DeleteCity(int id)
    {
        var cityToDelete = await _context.Cities.FindAsync(id);
        if (cityToDelete == null)
        {
            return NotFound();
        }
        _context.Cities.Remove(cityToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool CityExists(int id)
    {
        return (_context.Cities?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
