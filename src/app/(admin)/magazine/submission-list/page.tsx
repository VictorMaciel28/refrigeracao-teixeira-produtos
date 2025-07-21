'use client'

import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import PageTitle from '@/components/PageTitle'
import Link from 'next/link'

type Submission = {
  id: number
  title: string
  keywords: string
  articleType: string
  wordFile: string
  committeeLetterFile: string
  graphicalAbstractFile: string
}

const SubmissionListPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch('/api/magazine/submission', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      setSubmissions(data)
    }

    fetchSubmissions()
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
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.title}</td>
                <td>{sub.keywords}</td>
                <td>{sub.articleType}</td>
                <td>
                  <a href={`${basePath}/${sub.wordFile}`} download>
                    <Button size="sm" variant="secondary">Baixar</Button>
                  </a>
                </td>
                <td>
                  <a href={`${basePath}/${sub.committeeLetterFile}`} target="_blank">
                    <Button size="sm" variant="info">Visualizar</Button>
                  </a>
                </td>
                <td>
                  <a href={`${basePath}/${sub.graphicalAbstractFile}`} target="_blank">
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