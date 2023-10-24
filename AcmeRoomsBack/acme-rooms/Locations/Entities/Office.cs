namespace Locations.Entities;

public class Office
{
    public int Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int CityId { get; set; } = -1;
}
