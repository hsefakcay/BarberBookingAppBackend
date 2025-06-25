using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserIdToStringInAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Barbers_Barbershops_BarbershopId",
                table: "Barbers");

            migrationBuilder.AlterColumn<int>(
                name: "BarbershopId",
                table: "Barbers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Barbers_Barbershops_BarbershopId",
                table: "Barbers",
                column: "BarbershopId",
                principalTable: "Barbershops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Barbers_Barbershops_BarbershopId",
                table: "Barbers");

            migrationBuilder.AlterColumn<int>(
                name: "BarbershopId",
                table: "Barbers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Appointments",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Barbers_Barbershops_BarbershopId",
                table: "Barbers",
                column: "BarbershopId",
                principalTable: "Barbershops",
                principalColumn: "Id");
        }
    }
}
