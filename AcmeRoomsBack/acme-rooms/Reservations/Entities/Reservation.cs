namespace Reservations.Entities
{
    public class Reservation
    {
        public int Id { get; set; } = default!;
        public string Date { get; set; } = default!;
        public string StartTime { get; set; } = default!;
        public string EndTime { get; set; } = default!;
        public int RoomId { get; set; } = -1;
        public string UserId { get; set; } = default!;
    }
}
