import { NextRequest, NextResponse } from 'next/server'

// API para gerenciar submissões de artigos
// Dados de exemplo para testar a funcionalidade na landing page
// Quando estiver pronto, vai integrar com o banco de dados

export async function GET() {
  // Lista todos os artigos submetidos
  // Por enquanto retorna dados de teste
  
  const artigos = [
    {
      id: 1,
      articleType: 'Artigo Original',
      title: 'Descobertas em Tecnologia Avançada',
      abstract: 'Este artigo apresenta descobertas inovadoras na área de tecnologia...',
      keywords: 'tecnologia, inovação, pesquisa',
      magazineId: 1,
      magazine: {
        title: 'Revista Científica 2024'
      },
      createdAt: new Date('2024-01-15'),
      wordFile: 'artigo1.docx',
      committeeLetterFile: 'carta1.pdf',
      graphicalAbstractFile: 'abstract1.png'
    },
    {
      id: 2,
      articleType: 'Revisão',
      title: 'Análise de Tendências Científicas',
      abstract: 'Uma análise abrangente das tendências atuais na ciência...',
      keywords: 'tendências, ciência, análise',
      magazineId: 2,
      magazine: {
        title: 'Pesquisas Avançadas'
      },
      createdAt: new Date('2024-02-01'),
      wordFile: 'artigo2.docx',
      committeeLetterFile: 'carta2.pdf',
      graphicalAbstractFile: 'abstract2.png'
    }
  ]

  return NextResponse.json(artigos)
}

export async function POST(req: NextRequest) {
  // Submete um novo artigo
  // TODO: Validar dados, salvar arquivos e registrar no banco
  
  return NextResponse.json({ 
    message: 'Artigo submetido com sucesso',
    id: 1,
    title: 'Artigo de Teste',
    articleType: 'Artigo Original',
    status: 'submitted'
  }, { status: 201 })
}