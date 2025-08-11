import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const API_TOKEN = process.env.TINY_API_TOKEN;

  // Monta os parâmetros para enviar no corpo da requisição
  const formData = new URLSearchParams();
  formData.append("token", API_TOKEN || "");
  formData.append("id", id);
  formData.append("formato", "json");

  try {
    const res = await fetch("https://api.tiny.com.br/api2/produto.obter.estoque.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar estoque", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Erro interno ao buscar estoque", details: String(err) },
      { status: 500 }
    );
  }
}
