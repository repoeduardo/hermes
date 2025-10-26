-- CreateEnum
CREATE TYPE "TamanhoProduto" AS ENUM ('pequeno', 'medio', 'grande');

-- CreateEnum
CREATE TYPE "PlataformaVenda" AS ENUM ('local', 'online');

-- CreateEnum
CREATE TYPE "MetodoEntrega" AS ENUM ('correios', 'entregador_parceiro');

-- CreateEnum
CREATE TYPE "CategoriaDespesa" AS ENUM ('fixa', 'operacional', 'administrativa', 'inesperada');

-- CreateEnum
CREATE TYPE "MetodoPagamento" AS ENUM ('ted', 'dinheiro', 'credito', 'pix', 'criptomoeda');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'visitante');

-- CreateEnum
CREATE TYPE "StatusVenda" AS ENUM ('pendente', 'confirmada', 'processando', 'enviada', 'entregue', 'cancelada');

-- CreateEnum
CREATE TYPE "StatusReembolso" AS ENUM ('solicitado', 'aprovado', 'processado', 'recusado');

-- CreateTable
CREATE TABLE "Organizacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "descricao" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Organizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "reset_token" TEXT,
    "reset_token_expira_em" TIMESTAMP(3),
    "cargo" "Role" NOT NULL DEFAULT 'visitante',
    "id_organizacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL,
    "id_organizacao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "contato" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "id_organizacao" TEXT NOT NULL,
    "id_fornecedor" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "custo" DECIMAL(10,2) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "tamanho" "TamanhoProduto" NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransacaoVenda" (
    "id" TEXT NOT NULL,
    "id_organizacao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "plataforma" "PlataformaVenda" NOT NULL,
    "metodo_entrega" "MetodoEntrega",
    "taxa_entrega" DECIMAL(10,2),
    "taxa_extra" DECIMAL(10,2),
    "desconto" DECIMAL(10,2),
    "valor_total" DECIMAL(10,2) NOT NULL,
    "observacao" TEXT,
    "status" "StatusVenda" NOT NULL DEFAULT 'pendente',
    "id_usuario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TransacaoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemVenda" (
    "id" TEXT NOT NULL,
    "id_transacao" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,
    "preco_produto" DECIMAL(10,2) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ItemVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransacaoReembolso" (
    "id" TEXT NOT NULL,
    "id_organizacao" TEXT NOT NULL,
    "id_item_venda" TEXT NOT NULL,
    "preco_item" DECIMAL(10,2) NOT NULL,
    "quantidade_reembolsada" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT NOT NULL,
    "status" "StatusReembolso" NOT NULL DEFAULT 'solicitado',
    "aprovado_por" TEXT,
    "data_aprovacao" TIMESTAMP(3),
    "id_usuario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TransacaoReembolso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" TEXT NOT NULL,
    "id_organizacao" TEXT NOT NULL,
    "custo" DECIMAL(10,2) NOT NULL,
    "categoria" "CategoriaDespesa" NOT NULL,
    "metodo_pagamento" "MetodoPagamento" NOT NULL,
    "observacao" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoPreco" (
    "id" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,
    "preco_anterior" DECIMAL(10,2) NOT NULL,
    "preco_novo" DECIMAL(10,2) NOT NULL,
    "custo_anterior" DECIMAL(10,2) NOT NULL,
    "custo_novo" DECIMAL(10,2) NOT NULL,
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "HistoricoPreco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Organizacao_nome_idx" ON "Organizacao"("nome");

-- CreateIndex
CREATE INDEX "Organizacao_data_criacao_idx" ON "Organizacao"("data_criacao");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_id_organizacao_idx" ON "Usuario"("id_organizacao");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Fornecedor_id_organizacao_idx" ON "Fornecedor"("id_organizacao");

-- CreateIndex
CREATE INDEX "Fornecedor_nome_idx" ON "Fornecedor"("nome");

-- CreateIndex
CREATE INDEX "Produto_id_organizacao_idx" ON "Produto"("id_organizacao");

-- CreateIndex
CREATE INDEX "Produto_nome_idx" ON "Produto"("nome");

-- CreateIndex
CREATE INDEX "TransacaoVenda_id_organizacao_idx" ON "TransacaoVenda"("id_organizacao");

-- CreateIndex
CREATE INDEX "TransacaoVenda_id_usuario_idx" ON "TransacaoVenda"("id_usuario");

-- CreateIndex
CREATE INDEX "TransacaoVenda_data_idx" ON "TransacaoVenda"("data");

-- CreateIndex
CREATE INDEX "ItemVenda_id_transacao_idx" ON "ItemVenda"("id_transacao");

-- CreateIndex
CREATE INDEX "ItemVenda_id_produto_idx" ON "ItemVenda"("id_produto");

-- CreateIndex
CREATE UNIQUE INDEX "ItemVenda_id_transacao_id_produto_key" ON "ItemVenda"("id_transacao", "id_produto");

-- CreateIndex
CREATE INDEX "TransacaoReembolso_id_organizacao_idx" ON "TransacaoReembolso"("id_organizacao");

-- CreateIndex
CREATE INDEX "TransacaoReembolso_id_item_venda_idx" ON "TransacaoReembolso"("id_item_venda");

-- CreateIndex
CREATE INDEX "TransacaoReembolso_id_usuario_idx" ON "TransacaoReembolso"("id_usuario");

-- CreateIndex
CREATE INDEX "TransacaoReembolso_status_idx" ON "TransacaoReembolso"("status");

-- CreateIndex
CREATE INDEX "Despesa_id_organizacao_idx" ON "Despesa"("id_organizacao");

-- CreateIndex
CREATE INDEX "Despesa_id_usuario_idx" ON "Despesa"("id_usuario");

-- CreateIndex
CREATE INDEX "Despesa_data_idx" ON "Despesa"("data");

-- CreateIndex
CREATE INDEX "HistoricoPreco_id_produto_idx" ON "HistoricoPreco"("id_produto");

-- CreateIndex
CREATE INDEX "HistoricoPreco_id_usuario_idx" ON "HistoricoPreco"("id_usuario");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_organizacao_fkey" FOREIGN KEY ("id_organizacao") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_id_organizacao_fkey" FOREIGN KEY ("id_organizacao") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_organizacao_fkey" FOREIGN KEY ("id_organizacao") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoVenda" ADD CONSTRAINT "TransacaoVenda_id_organizacao_fkey" FOREIGN KEY ("id_organizacao") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoVenda" ADD CONSTRAINT "TransacaoVenda_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_id_transacao_fkey" FOREIGN KEY ("id_transacao") REFERENCES "TransacaoVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoReembolso" ADD CONSTRAINT "TransacaoReembolso_id_organizacao_fkey" FOREIGN KEY ("id_organizacao") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoReembolso" ADD CONSTRAINT "TransacaoReembolso_id_item_venda_fkey" FOREIGN KEY ("id_item_venda") REFERENCES "ItemVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoReembolso" ADD CONSTRAINT "TransacaoReembolso_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_id_organizacao_fkey" FOREIGN KEY ("id_organizacao") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoPreco" ADD CONSTRAINT "HistoricoPreco_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoPreco" ADD CONSTRAINT "HistoricoPreco_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
