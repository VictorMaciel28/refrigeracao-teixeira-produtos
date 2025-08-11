"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function extractImageUrl(produto: any): string | null {
  if (!produto) return null;
  if (typeof produto.imagem === "string") return produto.imagem;
  if (produto.imagem?.link) return produto.imagem.link;
  return null;
}

function formatPrice(value: any) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

export default function ProdutoDetalhePage() {
  const { id } = useParams();
  const [produto, setProduto] = useState<any>(null);
  const [estoque, setEstoque] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    async function carregar() {
      try {
        // Detalhes do produto
        const resProduto = await fetch(`/api/produtos/${id}`);
        const dataProduto = await resProduto.json();
        setProduto(dataProduto?.retorno?.produto ?? dataProduto);

        // Estoque do produto
        const resEstoque = await fetch(`/api/produtos/${id}/estoque`);
        const dataEstoque = await resEstoque.json();
        
        if (dataEstoque?.retorno?.produtos && dataEstoque.retorno.produtos.length > 0) {
          const estoqueLista = dataEstoque.retorno.produtos[0]?.produtos_estoque || [];
          setEstoque(estoqueLista);
        } else {
          setEstoque([]);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <div className="p-6">Carregando...</div>;

  if (!produto) return <div className="p-6 text-red-600">Produto não encontrado.</div>;

  const imageUrl = extractImageUrl(produto);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{produto.nome}</h1>

      {/* Imagem */}
      <div className="mb-4 w-64 h-64 bg-white flex items-center justify-center shadow rounded overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={produto.nome} className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-500 text-center p-4">Imagem não identificada no banco de dados</div>
        )}
      </div>

      {/* Informações básicas */}
      <p><strong>Preço:</strong> R$ {formatPrice(produto.preco)}</p>
      <p><strong>Descrição:</strong> {produto.descricao || "Sem descrição"}</p>

      {/* Estoque por filial */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Estoque por Filial</h2>
      {estoque.length > 0 ? (
        <table className="min-w-[300px] border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Filial</th>
              <th className="border px-4 py-2">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((e, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{e.filial?.nome || "-"}</td>
                <td className="border px-4 py-2">{e.estoque_atual ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Nenhuma informação de estoque encontrada.</p>
      )}
    </div>
  );
}
