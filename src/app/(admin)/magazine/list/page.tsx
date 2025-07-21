import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Table, Button } from 'react-bootstrap'

type Magazine = {
  id: number
  title: string
  publishDate: string
  status: string
  createdAt: string
  updatedAt: string
}

const fetchMagazines = async (): Promise<Magazine[]> => {
  const res = await fetch('http://localhost:3000/api/magazine', {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Erro ao buscar revistas')
  return res.json()
}

const MagazineListPage = async () => {
  const magazines = await fetchMagazines()

  return (
    <>
      <PageTitle title="Revistas Cadastradas" subName="Admin" />

      <ComponentContainerCard
        id="magazine-list"
        title="Lista"
        description={
          <>
            {/* Use <code>.table-striped</code> para aplicar zebra-striping no <code>&lt;tbody&gt;</code>. */}
          </>
        }>
        <div className="table-responsive">
          <Table striped className="table-centered align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Data Prevista</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {magazines.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{new Date(item.publishDate).toLocaleDateString()}</td>
                  <td>{item.status}</td>
                  <td className="d-flex gap-2">
                    <Button size="sm" variant="primary">
                      Editar
                    </Button>
                    <Button size="sm" variant="danger">
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ComponentContainerCard>
    </>
  )
}

export default MagazineListPage