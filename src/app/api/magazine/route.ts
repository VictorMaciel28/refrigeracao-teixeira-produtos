import { NextRequest, NextResponse } from 'next/server'

// API para gerenciar revistas científicas
// Por enquanto usando dados de exemplo para testar a landing page
// Depois vai conectar com o banco de dados real

export async function POST(req: NextRequest) {
  // Cria uma nova revista
  // TODO: Implementar validação e salvamento no banco
  
  return NextResponse.json({ 
    message: 'Revista criada com sucesso',
    id: 1,
    title: 'Revista de Teste',
    description: 'Descrição de teste',
    status: 'published'
  }, { status: 201 })
}

export async function GET() {
  // Retorna lista de todas as revistas
  // Dados de exemplo para mostrar na landing page
  
  const revistas = [
    {
      id: 1,
      title: 'Revista Científica 2024',
      description: 'Edição especial com artigos inovadores',
      publishDate: new Date('2024-01-15'),
      status: 'published',
      coverImage: '/api/placeholder/300/400',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      title: 'Pesquisas Avançadas',
      description: 'Artigos sobre tecnologia e inovação',
      publishDate: new Date('2024-02-01'),
      status: 'published',
      coverImage: '/api/placeholder/300/400',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: 3,
      title: 'Ciência e Tecnologia',
      description: 'Descobertas recentes na área científica',
      publishDate: new Date('2024-03-01'),
      status: 'published',
      coverImage: '/api/placeholder/300/400',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-03-01'),
    }
  ]

  return NextResponse.json(revistas)
}