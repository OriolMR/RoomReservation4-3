namespace LockedDates.Entities;

public class LockedDate
{
    public int Id { get; set; } = default!;
    public string Year { get; set; } = default!;
    public string Month { get; set; } = default!;
    public string Day { get; set; } = default!;
    public int OfficeId { get; set; } = -1;
}
