import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        magazine: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar artigos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const articleType = formData.get('articleType')?.toString()
  const title = formData.get('title')?.toString()
  const abstract = formData.get('abstract')?.toString()
  const keywords = formData.get('keywords')?.toString()
  const magazineId = parseInt(formData.get('magazineId')?.toString() || '0', 10)

  const wordFile = formData.get('wordFile') as File | null
  const committeeLetterFile = formData.get('committeeLetterFile') as File | null
  const graphicalAbstractFile = formData.get('graphicalAbstractFile') as File | null

  if (!articleType || !title || !abstract || !keywords || !magazineId || !wordFile || !committeeLetterFile || !graphicalAbstractFile) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
  }

  const folder = path.join(process.cwd(), 'public/uploads/submissions')
  await mkdir(folder, { recursive: true })

  const saveFile = async (file: File) => {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const filePath = path.join(folder, filename)
    await writeFile(filePath, new Uint8Array(buffer))
    return filename
  }

  const wordFilename = await saveFile(wordFile)
  const letterFilename = await saveFile(committeeLetterFile)
  const abstractFilename = await saveFile(graphicalAbstractFile)

  const article = await prisma.article.create({
    data: {
      articleType,
      title,
      abstract,
      keywords,
      magazineId,
      wordFile: wordFilename,
      committeeLetterFile: letterFilename,
      graphicalAbstractFile: abstractFilename,
    },
  })

  return NextResponse.json(article, { status: 201 })
}