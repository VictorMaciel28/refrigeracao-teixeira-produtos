'use client'

import { useEffect, useState } from 'react'
import { Card, CardBody, Button, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormControl, FormLabel, FormSelect } from 'react-bootstrap'
import PageTitle from '@/components/PageTitle'
import Image from 'next/image'
import useToggle from '@/hooks/useToggle'

type Magazine = {
  id: number
  title: string
  description: string
  publishDate: string
  status: string
  coverImage: string
}

const MagazineSubmissionPage = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null)

  const [form, setForm] = useState({
    articleType: 'Review Article',
    title: '',
    abstract: '',
    keywords: '',
    wordFile: null as File | null,
    committeeLetterFile: null as File | null,
    graphicalAbstractFile: null as File | null,
  })

  const { isTrue: showModal, setFalse: closeModal, setTrue: openModal } = useToggle()

  useEffect(() => {
    fetch('/api/magazine')
      .then((res) => res.json())
      .then(setMagazines)
  }, [])

  const handleSubmit = async () => {
    if (!selectedMagazine) return
    const formData = new FormData()
    formData.append('articleType', form.articleType)
    formData.append('title', form.title)
    formData.append('abstract', form.abstract)
    formData.append('keywords', form.keywords)
    formData.append('magazineId', selectedMagazine.id.toString())
    if (form.wordFile) formData.append('wordFile', form.wordFile)
    if (form.committeeLetterFile) formData.append('committeeLetterFile', form.committeeLetterFile)
    if (form.graphicalAbstractFile) formData.append('graphicalAbstractFile', form.graphicalAbstractFile)

    await fetch('/api/magazine/submission', {
      method: 'POST',
      body: formData,
    })

    closeModal()
  }

  return (
    <>
      <PageTitle title="Revistas Disponíveis" subName="Usuário" />
      <Row className="g-4">
        {magazines.map((magazine) => (
          <Col key={magazine.id} lg={4} xl={3}>
            <Card className="overflow-hidden shadow-sm h-100">
              <div className="position-relative">
                <Image
                  src={`/uploads/images/magazine/${magazine.coverImage}`}
                  alt={`Capa da revista ${magazine.title}`}
                  width={600}
                  height={300}
                  className="img-fluid object-fit-cover"
                  style={{ width: '100%', height: '300px' }}
                />
              </div>
              <CardBody>
                <h5 className="fw-bold mb-1">{magazine.title}</h5>
                <p className="text-muted small mb-2">
                  Data prevista: {new Date(magazine.publishDate).toLocaleDateString()}
                </p>
                <p className="mb-3">{magazine.description}</p>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedMagazine(magazine)
                      openModal()
                    }}>
                    Submeter
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal} centered scrollable>
        <ModalHeader closeButton>
          <h5 className="modal-title">Submeter para: {selectedMagazine?.title}</h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormLabel>Tipo de Artigo</FormLabel>
            <FormSelect value={form.articleType} onChange={(e) => setForm({ ...form, articleType: e.target.value })}>
              <option value="Review Article">Review Article</option>
            </FormSelect>

            <FormLabel className="mt-2">Título</FormLabel>
            <FormControl type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <FormLabel className="mt-2">Abstract</FormLabel>
            <FormControl as="textarea" rows={3} value={form.abstract} onChange={(e) => setForm({ ...form, abstract: e.target.value })} />

            <FormLabel className="mt-2">Palavras-chave</FormLabel>
            <FormControl type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />

            <FormLabel className="mt-2">Documento Word</FormLabel>
            <FormControl
              type="file"
              accept=".doc,.docx"
              onChange={(e) =>
                setForm({
                  ...form,
                  wordFile: (e.target as HTMLInputElement).files?.[0] || null,
                })
              }
            />
            <FormLabel className="mt-2">Carta do Comitê (PDF)</FormLabel>
            <FormControl
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setForm({
                  ...form,
                  committeeLetterFile: (e.target as HTMLInputElement).files?.[0] || null,
                })
              }
            />
            <FormLabel className="mt-2">Graphical Abstract (JPG/PNG)</FormLabel>
            <FormControl
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) =>
                setForm({
                  ...form,
                  graphicalAbstractFile: (e.target as HTMLInputElement).files?.[0] || null,
                })
              }
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar Submissão
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default MagazineSubmissionPage