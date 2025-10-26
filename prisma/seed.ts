import { PrismaClient } from "../src/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import "dotenv/config";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient().$extends(withAccelerate());

async function seed() {
  console.log("-> Iniciando seed do banco de dados...");

  // Limpar dados existentes (opcional - use com cuidado!)
  await prisma.historicoPreco.deleteMany();
  await prisma.transacaoReembolso.deleteMany();
  await prisma.itemVenda.deleteMany();
  await prisma.transacaoVenda.deleteMany();
  await prisma.despesa.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.fornecedor.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.organizacao.deleteMany();

  console.log("-> Dados antigos removidos");

  // 1. Criar Organizações
  const org1 = await prisma.organizacao.create({
    data: {
      nome: "Loja de Roupas Fashion",
      cnpj: "12.345.678/0001-90",
      descricao: "Loja de roupas e acessórios femininos e masculinos",
      data_criacao: new Date("2023-01-15"),
      ativo: true,
    },
  });

  const org2 = await prisma.organizacao.create({
    data: {
      nome: "Cafeteria Aroma",
      cnpj: "98.765.432/0001-12",
      descricao: "Cafeteria especializada em cafés especiais",
      data_criacao: new Date("2023-06-01"),
      ativo: true,
    },
  });

  console.log("-> Organizações criadas");

  // 2. Criar Usuários
  const senhaHash = await bcrypt.hash("senha123", 10);

  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "Maria",
      sobrenome: "Silva",
      email: "maria.silva@fashion.com",
      senha: senhaHash,
      cargo: "admin",
      id_organizacao: org1.id,
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: "João",
      sobrenome: "Santos",
      email: "joao.santos@fashion.com",
      senha: senhaHash,
      cargo: "visitante",
      id_organizacao: org1.id,
    },
  });

  const usuario3 = await prisma.usuario.create({
    data: {
      nome: "Ana",
      sobrenome: "Costa",
      email: "ana.costa@aroma.com",
      senha: senhaHash,
      cargo: "admin",
      id_organizacao: org2.id,
    },
  });

  console.log("-> Usuários criados");

  // 3. Criar Fornecedores
  const fornecedor1 = await prisma.fornecedor.create({
    data: {
      nome: "Tecidos Premium LTDA",
      contato: "(11) 98765-4321",
      id_organizacao: org1.id,
    },
  });

  const fornecedor2 = await prisma.fornecedor.create({
    data: {
      nome: "Confecções Brasil",
      contato: "(11) 91234-5678",
      id_organizacao: org1.id,
    },
  });

  const fornecedor3 = await prisma.fornecedor.create({
    data: {
      nome: "Café Exportação",
      contato: "(11) 99999-8888",
      id_organizacao: org2.id,
    },
  });

  console.log("-> Fornecedores criados");

  // 4. Criar Produtos - Loja de Roupas
  const produto1 = await prisma.produto.create({
    data: {
      nome: "Camiseta Básica Branca",
      descricao: "Camiseta 100% algodão, gola redonda",
      custo: 25.0,
      preco: 59.9,
      tamanho: "medio",
      quantidade_estoque: 50,
      id_organizacao: org1.id,
      id_fornecedor: fornecedor1.id,
    },
  });

  const produto2 = await prisma.produto.create({
    data: {
      nome: "Calça Jeans Skinny",
      descricao: "Calça jeans stretch, cintura alta",
      custo: 80.0,
      preco: 189.9,
      tamanho: "medio",
      quantidade_estoque: 30,
      id_organizacao: org1.id,
      id_fornecedor: fornecedor2.id,
    },
  });

  const produto3 = await prisma.produto.create({
    data: {
      nome: "Vestido Floral",
      descricao: "Vestido midi, estampa floral",
      custo: 60.0,
      preco: 149.9,
      tamanho: "medio",
      quantidade_estoque: 20,
      id_organizacao: org1.id,
      id_fornecedor: fornecedor2.id,
    },
  });

  const produto4 = await prisma.produto.create({
    data: {
      nome: "Jaqueta Jeans",
      descricao: "Jaqueta jeans oversized",
      custo: 100.0,
      preco: 249.9,
      tamanho: "grande",
      quantidade_estoque: 15,
      id_organizacao: org1.id,
      id_fornecedor: fornecedor2.id,
    },
  });

  // Produtos - Cafeteria
  const produto5 = await prisma.produto.create({
    data: {
      nome: "Café Espresso",
      descricao: "Café espresso tradicional",
      custo: 1.5,
      preco: 5.0,
      tamanho: "pequeno",
      quantidade_estoque: 100,
      id_organizacao: org2.id,
      id_fornecedor: fornecedor3.id,
    },
  });

  const produto6 = await prisma.produto.create({
    data: {
      nome: "Cappuccino",
      descricao: "Cappuccino cremoso com espuma",
      custo: 2.5,
      preco: 8.0,
      tamanho: "medio",
      quantidade_estoque: 80,
      id_organizacao: org2.id,
      id_fornecedor: fornecedor3.id,
    },
  });

  const produto7 = await prisma.produto.create({
    data: {
      nome: "Bolo de Chocolate",
      descricao: "Fatia de bolo de chocolate artesanal",
      custo: 3.0,
      preco: 12.0,
      tamanho: "medio",
      quantidade_estoque: 25,
      id_organizacao: org2.id,
    },
  });

  console.log("-> Produtos criados");

  // 5. Criar Histórico de Preços
  await prisma.historicoPreco.create({
    data: {
      id_produto: produto1.id,
      preco_anterior: 49.9,
      preco_novo: 59.9,
      custo_anterior: 20.0,
      custo_novo: 25.0,
      data_alteracao: new Date("2024-09-01"),
      id_usuario: usuario1.id,
    },
  });

  await prisma.historicoPreco.create({
    data: {
      id_produto: produto2.id,
      preco_anterior: 169.9,
      preco_novo: 189.9,
      custo_anterior: 70.0,
      custo_novo: 80.0,
      data_alteracao: new Date("2024-08-15"),
      id_usuario: usuario1.id,
    },
  });

  console.log("-> Histórico de preços criado");

  // 6. Criar Transações de Venda - Loja de Roupas
  const venda1 = await prisma.transacaoVenda.create({
    data: {
      data: new Date("2024-10-20"),
      plataforma: "local",
      valor_total: 399.7,
      observacao: "Cliente pagou em dinheiro",
      status: "entregue",
      id_organizacao: org1.id,
      id_usuario: usuario2.id,
    },
  });

  await prisma.itemVenda.createMany({
    data: [
      {
        id_transacao: venda1.id,
        id_produto: produto1.id,
        preco_produto: 59.9,
        quantidade: 2,
        subtotal: 119.8,
      },
      {
        id_transacao: venda1.id,
        id_produto: produto3.id,
        preco_produto: 149.9,
        quantidade: 1,
        subtotal: 149.9,
      },
    ],
  });

  const venda2 = await prisma.transacaoVenda.create({
    data: {
      data: new Date("2024-10-21"),
      plataforma: "online",
      metodo_entrega: "correios",
      taxa_entrega: 15.0,
      valor_total: 264.8,
      observacao: "Entrega expressa",
      status: "processando",
      id_organizacao: org1.id,
      id_usuario: usuario2.id,
    },
  });

  await prisma.itemVenda.create({
    data: {
      id_transacao: venda2.id,
      id_produto: produto4.id,
      preco_produto: 249.9,
      quantidade: 1,
      subtotal: 249.9,
    },
  });

  const venda3 = await prisma.transacaoVenda.create({
    data: {
      data: new Date("2024-10-22"),
      plataforma: "local",
      desconto: 20.0,
      valor_total: 169.9,
      status: "confirmada",
      id_organizacao: org1.id,
      id_usuario: usuario1.id,
    },
  });

  await prisma.itemVenda.create({
    data: {
      id_transacao: venda3.id,
      id_produto: produto2.id,
      preco_produto: 189.9,
      quantidade: 1,
      subtotal: 189.9,
    },
  });

  // Transações - Cafeteria
  const venda4 = await prisma.transacaoVenda.create({
    data: {
      data: new Date("2024-10-25"),
      plataforma: "local",
      valor_total: 25.0,
      status: "entregue",
      id_organizacao: org2.id,
      id_usuario: usuario3.id,
    },
  });

  await prisma.itemVenda.createMany({
    data: [
      {
        id_transacao: venda4.id,
        id_produto: produto5.id,
        preco_produto: 5.0,
        quantidade: 2,
        subtotal: 10.0,
      },
      {
        id_transacao: venda4.id,
        id_produto: produto7.id,
        preco_produto: 12.0,
        quantidade: 1,
        subtotal: 12.0,
      },
    ],
  });

  const venda5 = await prisma.transacaoVenda.create({
    data: {
      data: new Date("2024-10-26"),
      plataforma: "online",
      metodo_entrega: "entregador_parceiro",
      taxa_entrega: 8.0,
      valor_total: 32.0,
      status: "enviada",
      id_organizacao: org2.id,
      id_usuario: usuario3.id,
    },
  });

  await prisma.itemVenda.createMany({
    data: [
      {
        id_transacao: venda5.id,
        id_produto: produto6.id,
        preco_produto: 8.0,
        quantidade: 3,
        subtotal: 24.0,
      },
    ],
  });

  console.log("-> Transações de venda criadas");

  // 7. Criar Reembolsos
  const itemVenda1 = await prisma.itemVenda.findFirst({
    where: {
      id_transacao: venda1.id,
      id_produto: produto1.id,
    },
  });

  if (itemVenda1) {
    await prisma.transacaoReembolso.create({
      data: {
        id_item_venda: itemVenda1.id,
        preco_item: 59.9,
        quantidade_reembolsada: 1,
        data: new Date("2024-10-23"),
        motivo: "Produto com defeito",
        status: "aprovado",
        aprovado_por: usuario1.id,
        data_aprovacao: new Date("2024-10-23"),
        id_organizacao: org1.id,
        id_usuario: usuario2.id,
      },
    });
  }

  const itemVenda2 = await prisma.itemVenda.findFirst({
    where: {
      id_transacao: venda4.id,
      id_produto: produto7.id,
    },
  });

  if (itemVenda2) {
    await prisma.transacaoReembolso.create({
      data: {
        id_item_venda: itemVenda2.id,
        preco_item: 12.0,
        quantidade_reembolsada: 1,
        data: new Date("2024-10-26"),
        motivo: "Cliente não gostou do sabor",
        status: "solicitado",
        id_organizacao: org2.id,
        id_usuario: usuario3.id,
      },
    });
  }

  console.log("-> Reembolsos criados");

  // 8. Criar Despesas - Loja de Roupas
  await prisma.despesa.createMany({
    data: [
      {
        custo: 2500.0,
        categoria: "fixa",
        metodo_pagamento: "pix",
        observacao: "Aluguel da loja - Outubro",
        data: new Date("2024-10-05"),
        id_organizacao: org1.id,
        id_usuario: usuario1.id,
      },
      {
        custo: 450.0,
        categoria: "fixa",
        metodo_pagamento: "credito",
        observacao: "Energia elétrica",
        data: new Date("2024-10-10"),
        id_organizacao: org1.id,
        id_usuario: usuario1.id,
      },
      {
        custo: 1200.0,
        categoria: "operacional",
        metodo_pagamento: "ted",
        observacao: "Compra de tecidos",
        data: new Date("2024-10-15"),
        id_organizacao: org1.id,
        id_usuario: usuario1.id,
      },
      {
        custo: 300.0,
        categoria: "administrativa",
        metodo_pagamento: "credito",
        observacao: "Material de escritório",
        data: new Date("2024-10-18"),
        id_organizacao: org1.id,
        id_usuario: usuario2.id,
      },
      {
        custo: 800.0,
        categoria: "inesperada",
        metodo_pagamento: "dinheiro",
        observacao: "Conserto do ar condicionado",
        data: new Date("2024-10-22"),
        id_organizacao: org1.id,
        id_usuario: usuario1.id,
      },
    ],
  });

  // Despesas - Cafeteria
  await prisma.despesa.createMany({
    data: [
      {
        custo: 1800.0,
        categoria: "fixa",
        metodo_pagamento: "pix",
        observacao: "Aluguel - Outubro",
        data: new Date("2024-10-05"),
        id_organizacao: org2.id,
        id_usuario: usuario3.id,
      },
      {
        custo: 600.0,
        categoria: "operacional",
        metodo_pagamento: "ted",
        observacao: "Compra de grãos de café",
        data: new Date("2024-10-12"),
        id_organizacao: org2.id,
        id_usuario: usuario3.id,
      },
      {
        custo: 250.0,
        categoria: "operacional",
        metodo_pagamento: "credito",
        observacao: "Leite e insumos",
        data: new Date("2024-10-20"),
        id_organizacao: org2.id,
        id_usuario: usuario3.id,
      },
    ],
  });

  console.log("-> Despesas criadas");

  // Estatísticas finais
  const totalOrgs = await prisma.organizacao.count();
  const totalUsers = await prisma.usuario.count();
  const totalProdutos = await prisma.produto.count();
  const totalVendas = await prisma.transacaoVenda.count();
  const totalDespesas = await prisma.despesa.count();

  console.log("\n Resumo do Seed:");
  console.log(`   • ${totalOrgs} organizações`);
  console.log(`   • ${totalUsers} usuários`);
  console.log(`   • ${totalProdutos} produtos`);
  console.log(`   • ${totalVendas} vendas`);
  console.log(`   • ${totalDespesas} despesas`);
  console.log("\n Seed concluído com sucesso!");
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
