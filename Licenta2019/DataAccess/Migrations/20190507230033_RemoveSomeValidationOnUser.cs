using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class RemoveSomeValidationOnUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Year",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Group",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 2,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Year",
                table: "Users",
                maxLength: 1,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Group",
                table: "Users",
                maxLength: 2,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
