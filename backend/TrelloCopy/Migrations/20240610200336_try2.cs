using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrelloCopy.Migrations
{
    /// <inheritdoc />
    public partial class try2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdminka",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdminka",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);
        }
    }
}
