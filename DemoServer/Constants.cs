namespace DemoServer;

/// <summary>
/// The Constants class contains specific information or values that are used throughout the application.
/// </summary>
public static class Constants
{
    /// <summary>
    /// Specifies the connection string used to connect to the database.
    /// </summary>
    public static string ConnectionString => @$"
            User ID = i_am_dev_user;
            Password = myshinynewpassword;
            Host = localhost;
            Port = 5327;
            Database = dev_db
";
}