namespace Locations.Models;

public class RoomExtendedDTO
{
    public int Id { get; set; } = default!;
    public string? Name { get; set; } = default!;
    public int Capacity { get; set; } = default!;
    public int OfficeId { get; set; } = -1;
    public string OfficeName { get; set; } = default!;
    public string CityName { get; set; } = default!;
    public string CountryName { get; set; } = default!;
}
