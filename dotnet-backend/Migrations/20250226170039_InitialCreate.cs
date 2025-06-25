using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Barbers_BarberId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_BarberId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BarberId",
                table: "Services");

            migrationBuilder.CreateTable(
                name: "BarberServices",
                columns: table => new
                {
                    BarberId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BarberServices", x => new { x.BarberId, x.ServiceId });
                    table.ForeignKey(
                        name: "FK_BarberServices_Barbers_BarberId",
                        column: x => x.BarberId,
                        principalTable: "Barbers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BarberServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BarberServices_ServiceId",
                table: "BarberServices",
                column: "ServiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BarberServices");

            migrationBuilder.AddColumn<int>(
                name: "BarberId",
                table: "Services",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_BarberId",
                table: "Services",
                column: "BarberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Barbers_BarberId",
                table: "Services",
                column: "BarberId",
                principalTable: "Barbers",
                principalColumn: "Id");
        }
    }
}
