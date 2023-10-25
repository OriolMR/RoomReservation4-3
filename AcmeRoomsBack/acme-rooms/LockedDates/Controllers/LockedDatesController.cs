using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using LockedDates.Data;
using LockedDates.Entities;

namespace LockedDates.Controllers;

public class LockedDatesController : Controller
{
    private readonly LockedDatesContext _context;

    public LockedDatesController(LockedDatesContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetAllLockedDates")]
    public async Task<IActionResult> GetAllLockedDates() =>
        Ok(await _context.LockedDates.ToListAsync());

    [HttpGet]
    [Route("GetLockedDateById")]
    public async Task<IActionResult> GetLockedDateById(int id) =>
        Ok(await _context.LockedDates.FindAsync(id));

    [HttpGet]
    [Route("GetLockedDateByYear")]
    public async Task<IActionResult> GetLockedDatesByYear(string year) =>
        Ok(await _context.LockedDates.Where(date => date.Year == year).ToListAsync());

    [HttpGet]
    [Route("GetLockedDatesByMonth")]
    public async Task<IActionResult> GetLockedDatesByMonth(string month) =>
        Ok(await _context.LockedDates.Where(date => date.Month == month).ToListAsync());

    [HttpGet]
    [Route("GetLockedDatesByDay")]
    public async Task<IActionResult> GetLockedDatesByDay(string day) =>
        Ok(await _context.LockedDates.Where(date => date.Day == day).ToListAsync());

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("CreateLockedDate")]
    public async Task<IActionResult> CreateLockedDates(LockedDate lockedDate)
    {
        _context.LockedDates.Add(lockedDate);
        await _context.SaveChangesAsync();
        return Created($"/GetLockedDateById?id={lockedDate.Id}", lockedDate);
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    [Route("UpdateLockedDate")]
    public async Task<IActionResult> UpdateLockedDate(LockedDate lockedDateToUpdate)
    {
        _context.LockedDates.Update(lockedDateToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    [Route("DeleteLockedDate")]
    public async Task<IActionResult> DeleteLockedDate(int id)
    {
        var lockedDateToDelete = await _context.LockedDates.FindAsync(id);
        if (lockedDateToDelete == null)
        {
            return NotFound();
        }
        _context.LockedDates.Remove(lockedDateToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
