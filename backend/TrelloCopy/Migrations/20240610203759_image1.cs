using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrelloCopy.Migrations
{
    /// <inheritdoc />
    public partial class image1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Data",
                table: "AspNetUsers",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Data",
                table: "AspNetUsers");
        }
    }
}
