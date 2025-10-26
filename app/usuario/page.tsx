import { Navbar } from "@/components/Navbar";
import { listarUsuarios } from "@/src/services/usuario";
import React from "react";

export default async function Usuario() {
  const usuarios = await listarUsuarios();

  return (
    <React.Fragment>
      <Navbar />
      <h1>Gerenciar usuários</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.sobrenome}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
