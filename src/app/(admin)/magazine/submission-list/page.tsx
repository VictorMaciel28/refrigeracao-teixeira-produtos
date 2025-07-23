'use client'

import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import PageTitle from '@/components/PageTitle'
import Link from 'next/link'

type Article = {
  id: number
  title: string
  keywords: string
  articleType: string
  wordFile: string
  committeeLetterFile: string
  graphicalAbstractFile: string
}

const SubmissionListPage = () => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/magazine/submission', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      setArticles(data)
    }

    fetchArticles()
  }, [])

  const basePath = '/uploads/submissions'

  return (
    <>
      <PageTitle title="Submissões" subName="Admin" />
      <div className="table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Palavras-chave</th>
              <th>Tipo</th>
              <th>Word</th>
              <th>Carta Comitê</th>
              <th>Gráfico</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.keywords}</td>
                <td>{article.articleType}</td>
                <td>
                  <a href={`${basePath}/${article.wordFile}`} download>
                    <Button size="sm" variant="secondary">Baixar</Button>
                  </a>
                </td>
                <td>
                  <a href={`${basePath}/${article.committeeLetterFile}`} target="_blank">
                    <Button size="sm" variant="info">Visualizar</Button>
                  </a>
                </td>
                <td>
                  <a href={`${basePath}/${article.graphicalAbstractFile}`} target="_blank">
                    <Button size="sm" variant="info">Visualizar</Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default SubmissionListPage