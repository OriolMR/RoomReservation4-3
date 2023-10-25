namespace Locations.Entities;

public class City
{
    public int Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int CountryId { get; set; } = -1;
}
