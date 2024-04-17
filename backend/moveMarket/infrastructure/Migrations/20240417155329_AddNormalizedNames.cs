using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNormalizedNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedName",
                table: "Property",
                type: "text",
                nullable: true,
                computedColumnSql: "UPPER(\"Name\")",
                stored: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedName",
                table: "Kit",
                type: "text",
                nullable: true,
                computedColumnSql: "UPPER(\"Name\")",
                stored: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedName",
                table: "Item",
                type: "text",
                nullable: true,
                computedColumnSql: "UPPER(\"Name\")",
                stored: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedName",
                table: "Category",
                type: "text",
                nullable: true,
                computedColumnSql: "UPPER(\"Name\")",
                stored: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property_NormalizedName",
                table: "Property",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Kit_NormalizedName",
                table: "Kit",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Item_NormalizedName",
                table: "Item",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_NormalizedName",
                table: "Category",
                column: "NormalizedName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Property_NormalizedName",
                table: "Property");

            migrationBuilder.DropIndex(
                name: "IX_Kit_NormalizedName",
                table: "Kit");

            migrationBuilder.DropIndex(
                name: "IX_Item_NormalizedName",
                table: "Item");

            migrationBuilder.DropIndex(
                name: "IX_Category_NormalizedName",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "Property");

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "Kit");

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "User");
        }
    }
}
