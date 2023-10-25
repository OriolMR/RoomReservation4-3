using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Entities;
using Reservations.Models;

namespace Reservations.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ReservationController : Controller
{
    private readonly ReservasContext _context;
    private readonly IAuthorizationService _authorizationService;

    public ReservationController(ReservasContext context, IAuthorizationService authorizationService)
    {
        _context = context;
        _authorizationService = authorizationService;
    }

    // GET: Reservations
    // [Authorize(Roles = "Admin")]
    [HttpGet]
    [Route("GetAllReservations")]
    public async Task<IActionResult> GetAllReservations() =>
        Ok(await _context.Reservations.ToListAsync());

    [HttpGet]
    [Route("GetReservationById")]
    public async Task<IActionResult> GetReservationById(int id) =>
        Ok(await _context.Reservations.FindAsync(id));

    //[HttpGet]
    //[Route("GetReservationsByRoomId")]
    //public async Task<IActionResult> GetReservationsByRoomId(int roomId)
    //{
    //    var result = await _context.Reservations
    //        .Where(reservation => reservation.RoomId == roomId)
    //        .ToListAsync();
    //    if (!result.Any())
    //    {
    //        return NotFound();
    //    }
    //    return Ok(result);
    //}

    //[HttpGet]
    //[Route("GetReservationsByOfficeId")]
    //public async Task<IActionResult> GetReservationsByOfficeId(int officeId)
    //{
    //    var result = await _context.Reservations
    //        .Join(
    //            _context.Rooms,
    //            reservation => reservation.RoomId,
    //            room => room.Id,
    //            (reservation, room) => new { Reservation = reservation, Room = room }
    //        )
    //        .Join(
    //            _context.Offices,
    //            roomReservation => roomReservation.Room.OfficeId,
    //            office => office.Id,
    //            (roomReservation, office) =>
    //                new
    //                {
    //                    roomReservation.Reservation,
    //                    Room = roomReservation.Room,
    //                    Office = office
    //                }
    //        )
    //        .Where(officeRoomReservation => officeRoomReservation.Office.Id == officeId)
    //        .Select(officeRoomReservation => officeRoomReservation.Reservation)
    //        .ToListAsync();
    //    if (!result.Any())
    //    {
    //        return NotFound();
    //    }
    //    return Ok(result);
    //}

    //[HttpGet]
    //[Route("GetReservationsByCityId")]
    //public async Task<IActionResult> GetReservationsByCityId(int cityId)
    //{
    //    var result = await _context.Reservations
    //        .Join(
    //            _context.Rooms,
    //            reservation => reservation.RoomId,
    //            room => room.Id,
    //            (reservation, room) => new { Reservation = reservation, Room = room }
    //        )
    //        .Join(
    //            _context.Offices,
    //            roomReservation => roomReservation.Room.OfficeId,
    //            office => office.Id,
    //            (roomReservation, office) =>
    //                new
    //                {
    //                    Reservation = roomReservation.Reservation,
    //                    Room = roomReservation.Room,
    //                    Office = office
    //                }
    //        )
    //        .Join(
    //            _context.Cities,
    //            officeRoomReservation => officeRoomReservation.Office.CityId,
    //            city => city.Id,
    //            (officeRoomReservation, city) =>
    //                new
    //                {
    //                    Reservation = officeRoomReservation.Reservation,
    //                    Room = officeRoomReservation.Room,
    //                    Office = officeRoomReservation.Office,
    //                    City = city
    //                }
    //        )
    //        .Where(cityOfficeRoomReservation => cityOfficeRoomReservation.City.Id == cityId)
    //        .Select(cityOfficeRoomReservation => cityOfficeRoomReservation.Reservation)
    //        .ToListAsync();
    //    if (!result.Any())
    //    {
    //        return NotFound();
    //    }
    //    return Ok(result);
    //}

    //[HttpGet]
    //[Route("GetReservationsByCountryId")]
    //public async Task<IActionResult> GetReservationsByCountryId(int countryId)
    //{
    //    var result = await _context.Reservations
    //        .Join(
    //            _context.Rooms,
    //            reservation => reservation.RoomId,
    //            room => room.Id,
    //            (reservation, room) => new { Reservation = reservation, Room = room }
    //        )
    //        .Join(
    //            _context.Offices,
    //            roomReservation => roomReservation.Room.OfficeId,
    //            office => office.Id,
    //            (roomReservation, office) =>
    //                new
    //                {
    //                    Reservation = roomReservation.Reservation,
    //                    Room = roomReservation.Room,
    //                    Office = office
    //                }
    //        )
    //        .Join(
    //            _context.Cities,
    //            officeRoomReservation => officeRoomReservation.Office.CityId,
    //            city => city.Id,
    //            (officeRoomReservation, city) =>
    //                new
    //                {
    //                    Reservation = officeRoomReservation.Reservation,
    //                    Room = officeRoomReservation.Room,
    //                    Office = officeRoomReservation.Office,
    //                    City = city
    //                }
    //        )
    //        .Join(
    //            _context.Countries,
    //            cityOfficeRoomReservation => cityOfficeRoomReservation.City.CountryId,
    //            country => country.Id,
    //            (cityOfficeRoomReservation, country) =>
    //                new
    //                {
    //                    Reservation = cityOfficeRoomReservation.Reservation,
    //                    Room = cityOfficeRoomReservation.Room,
    //                    Office = cityOfficeRoomReservation.Office,
    //                    City = cityOfficeRoomReservation.City,
    //                    Country = country
    //                }
    //        )
    //        .Where(
    //            countryCityOfficeRoomReservation =>
    //                countryCityOfficeRoomReservation.Country.Id == countryId
    //        )
    //        .Select(
    //            countryCityOfficeRoomReservation => countryCityOfficeRoomReservation.Reservation
    //        )
    //        .ToListAsync();
    //    if (!result.Any())
    //    {
    //        return NotFound();
    //    }

    //    return Ok(result);
    //}

    //[HttpGet]
    //[Route("GetReservationsByUserId")]
    //public async Task<IActionResult> GetReservationsByUserId(string userId)
    //{
    //    var result = await _context.Reservations
    //        .Join(
    //            _context.Rooms,
    //            reservation => reservation.RoomId,
    //            room => room.Id,
    //            (reservation, room) => new { Reservation = reservation, Room = room }
    //        )
    //        .Join(
    //            _context.Offices,
    //            roomReservation => roomReservation.Room.OfficeId,
    //            office => office.Id,
    //            (roomReservation, office) =>
    //                new
    //                {
    //                    Reservation = roomReservation.Reservation,
    //                    Room = roomReservation.Room,
    //                    Office = office
    //                }
    //        )
    //        .Join(
    //            _context.Cities,
    //            officeRoomReservation => officeRoomReservation.Office.CityId,
    //            city => city.Id,
    //            (officeRoomReservation, city) =>
    //                new
    //                {
    //                    Reservation = officeRoomReservation.Reservation,
    //                    Room = officeRoomReservation.Room,
    //                    Office = officeRoomReservation.Office,
    //                    City = city
    //                }
    //        )
    //        .Join(
    //            _context.Countries,
    //            cityOfficeRoomReservation => cityOfficeRoomReservation.City.CountryId,
    //            country => country.Id,
    //            (cityOfficeRoomReservation, country) =>
    //                new
    //                {
    //                    Reservation = cityOfficeRoomReservation.Reservation,
    //                    Room = cityOfficeRoomReservation.Room,
    //                    Office = cityOfficeRoomReservation.Office,
    //                    City = cityOfficeRoomReservation.City,
    //                    Country = country
    //                }
    //        )
    //        .Where(
    //            countryCityOfficeRoomReservation =>
    //                countryCityOfficeRoomReservation.Reservation.UserId == userId
    //        )
    //        .ToListAsync();
    //    if (!result.Any())
    //    {
    //        return NotFound();
    //    }
    //    if (
    //        (
    //            await _authorizationService.AuthorizeAsync(
    //                User,
    //                result.Select(tuple => tuple.Reservation).FirstOrDefault(),
    //                "ReservationPolicy"
    //            )
    //        ).Succeeded
    //    )
    //    {
    //        return Ok(
    //            result.Select(
    //                countryCityOfficeRoomReservation =>
    //                    new ReservationExtendedDTOModel
    //                    {
    //                        Id = countryCityOfficeRoomReservation.Reservation.Id,
    //                        Date = countryCityOfficeRoomReservation.Reservation.Date,
    //                        StartTime = countryCityOfficeRoomReservation.Reservation.StartTime,
    //                        EndTime = countryCityOfficeRoomReservation.Reservation.EndTime,
    //                        RoomName = countryCityOfficeRoomReservation.Room.Name,
    //                        RoomId = countryCityOfficeRoomReservation.Room.Id,
    //                        OfficeName = countryCityOfficeRoomReservation.Office.Name,
    //                        CityName = countryCityOfficeRoomReservation.City.Name,
    //                        CountryName = countryCityOfficeRoomReservation.Country.Name,
    //                        UserId = countryCityOfficeRoomReservation.Reservation.UserId
    //                    }
    //            )
    //        );
    //    }
    //    return Forbid();
    //}

    //[HttpGet]
    //[Route("GetReducedReservationsByRoomId")]
    //public async Task<IActionResult> GetReducedReservationsByRoomId(int roomId)
    //{
    //    var result = await _context.Reservations
    //        .Join(
    //            _context.Rooms,
    //            reservation => reservation.RoomId,
    //            room => room.Id,
    //            (reservation, room) => new { Reservation = reservation, Room = room }
    //        )
    //        .Join(
    //            _context.Offices,
    //            roomReservation => roomReservation.Room.OfficeId,
    //            office => office.Id,
    //            (roomReservation, office) =>
    //                new
    //                {
    //                    Reservation = roomReservation.Reservation,
    //                    Room = roomReservation.Room,
    //                    Office = office
    //                }
    //        )
    //        .Join(
    //            _context.Cities,
    //            officeRoomReservation => officeRoomReservation.Office.CityId,
    //            city => city.Id,
    //            (officeRoomReservation, city) =>
    //                new
    //                {
    //                    Reservation = officeRoomReservation.Reservation,
    //                    Room = officeRoomReservation.Room,
    //                    Office = officeRoomReservation.Office,
    //                    City = city
    //                }
    //        )
    //        .Join(
    //            _context.Countries,
    //            cityOfficeRoomReservation => cityOfficeRoomReservation.City.CountryId,
    //            country => country.Id,
    //            (cityOfficeRoomReservation, country) =>
    //                new
    //                {
    //                    Reservation = cityOfficeRoomReservation.Reservation,
    //                    Room = cityOfficeRoomReservation.Room,
    //                    Office = cityOfficeRoomReservation.Office,
    //                    City = cityOfficeRoomReservation.City,
    //                    Country = country
    //                }
    //        )
    //        .Where(
    //            countryCityOfficeRoomReservation =>
    //                countryCityOfficeRoomReservation.Reservation.RoomId == roomId
    //        )
    //        .ToListAsync();
    //    if (!result.Any())
    //    {
    //        return NotFound();
    //    }
    //    if (
    //        (
    //            await _authorizationService.AuthorizeAsync(
    //                User,
    //                result.Select(tuple => tuple.Reservation).FirstOrDefault(),
    //                "ReservationPolicy"
    //            )
    //        ).Succeeded
    //    )
    //    {
    //        return Ok(
    //            result.Select(
    //                countryCityOfficeRoomReservation =>
    //                    new ReservationReducedDTOModel
    //                    {
    //                        Id = countryCityOfficeRoomReservation.Reservation.Id,
    //                        Date = countryCityOfficeRoomReservation.Reservation.Date,
    //                        StartTime = countryCityOfficeRoomReservation.Reservation.StartTime,
    //                        EndTime = countryCityOfficeRoomReservation.Reservation.EndTime,
    //                        RoomName = countryCityOfficeRoomReservation.Room.Name,
    //                        RoomId = countryCityOfficeRoomReservation.Room.Id,
    //                        OfficeName = countryCityOfficeRoomReservation.Office.Name,
    //                        CityName = countryCityOfficeRoomReservation.City.Name,
    //                        CountryName = countryCityOfficeRoomReservation.Country.Name,
    //                    }
    //            )
    //        );
    //    }
    //    return Forbid();
    //}

    [HttpPost]
    [Route("CreateReservation")]
    public async Task<IActionResult> CreateReservation(Reservation reservation)
    {
        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();
        return Created($"/GetReservationById?id={reservation.Id}", reservation);
    }

    [HttpPut]
    [Route("UpdateReservation")]
    public async Task<IActionResult> UpdateReservation(Reservation reservationToUpdate)
    {
        if (
            (
                await _authorizationService.AuthorizeAsync(
                    User,
                    reservationToUpdate,
                    "ReservationPolicy"
                )
            ).Succeeded
        )
        {
            _context.Reservations.Update(reservationToUpdate);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        ;

        return Forbid();
    }

    [HttpDelete]
    [Route("DeleteReservation")]
    public async Task<IActionResult> DeleteReservation(int id)
    {
        var reservationToDelete = await _context.Reservations.FindAsync(id);

        if (reservationToDelete is null)
        {
            return NotFound();
        }

        if (
            (
                await _authorizationService.AuthorizeAsync(
                    User,
                    reservationToDelete,
                    "ReservationPolicy"
                )
            ).Succeeded
        )
        {
            _context.Reservations.Remove(reservationToDelete);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        return Forbid();
    }

    private bool ReservationExists(int id)
    {
      return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
