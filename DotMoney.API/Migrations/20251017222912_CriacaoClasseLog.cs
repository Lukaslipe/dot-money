using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotMoney.API.Migrations
{
    /// <inheritdoc />
    public partial class CriacaoClasseLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Custos_Usuarios_UsuariosId",
                table: "Custos");

            migrationBuilder.RenameColumn(
                name: "UsuariosId",
                table: "Custos",
                newName: "UsuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Custos_UsuariosId",
                table: "Custos",
                newName: "IX_Custos_UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Custos_Usuarios_UsuarioId",
                table: "Custos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Custos_Usuarios_UsuarioId",
                table: "Custos");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Custos",
                newName: "UsuariosId");

            migrationBuilder.RenameIndex(
                name: "IX_Custos_UsuarioId",
                table: "Custos",
                newName: "IX_Custos_UsuariosId");

            migrationBuilder.AddForeignKey(
                name: "FK_Custos_Usuarios_UsuariosId",
                table: "Custos",
                column: "UsuariosId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
