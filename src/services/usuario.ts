import prisma from "@/lib/prisma";

export const listarUsuarios = async () => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return usuarios;
};
