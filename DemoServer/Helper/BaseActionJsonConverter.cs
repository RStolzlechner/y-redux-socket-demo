using System.Text.Json;
using System.Text.Json.Serialization;
using DemoServer.Models.Actions;

namespace DemoServer.Helper;

/// <summary>
/// Converts BaseActions to the right type
/// </summary>
public class BaseActionJsonConverter : JsonConverter<BaseAction>
{
    public override BaseAction? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var doc = JsonDocument.ParseValue(ref reader);
        var root = doc.RootElement;
        var type = root.GetProperty("type").GetString();

        var deserializationOptions = new JsonSerializerOptions(options)
        {
            PropertyNameCaseInsensitive = true // Ensure case-insensitive property name matching
        };
        
        return type switch
        {
            ActionTypes.Create => JsonSerializer.Deserialize<CreateAction>(root.GetRawText(), deserializationOptions),
            ActionTypes.Remove => JsonSerializer.Deserialize<RemoveAction>(root.GetRawText(), deserializationOptions),
            ActionTypes.Update => JsonSerializer.Deserialize<UpdateAction>(root.GetRawText(), deserializationOptions),
            ActionTypes.Duplicate => JsonSerializer.Deserialize<DuplicateAction>(root.GetRawText(), deserializationOptions),
            _ => throw new JsonException("Unknown type"),
        };
    }

    public override void Write(Utf8JsonWriter writer, BaseAction value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, value.GetType(), options);
    }
}