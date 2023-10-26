namespace Locations.Entities;

public class Room
{
    public int Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Capacity { get; set; } = default!;
    public int OfficeId { get; set; } = -1;
}
