namespace Reservations.Models
{
    public class ReservationReducedDTOModel
    {
        public int Id { get; set; } = default!;
        public string? Date { get; set; } = null;
        public string? StartTime { get; set; } = null;
        public string? EndTime { get; set; } = null;
        public string? RoomName { get; set; } = null;
        public int RoomId { get; set; } = -1;
        public string? OfficeName { get; set; } = null;
        public string? CityName { get; set; } = null;
        public string? CountryName { get; set; } = null;
    }
}
