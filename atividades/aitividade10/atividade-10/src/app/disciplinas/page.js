'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function disciplinaPage() {

  const [disciplina, setdisciplina] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const disciplinaLocalStorage = JSON.parse(localStorage.getItem("disciplina")) || []
    // guarda a lista no estado faculdades
    setdisciplina(disciplinaLocalStorage)
    console.log(disciplinaLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(disciplina) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o disciplina ${disciplina.nome}?`)) {
      // filtra a lista antiga removando o disciplina recebido
      const novaLista = disciplina.filter(item => item.id !== disciplina.id)
      // grava no localStorage a nova lista
      localStorage.setItem('disciplina', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setdisciplina(novaLista)
      alert("disciplina excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de disciplina"}>
      <div className='text-end mb-2'>
        <Button href='/disciplinas/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os disciplina */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>disciplina</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {disciplina.map(disciplina => {
            return (
              <tr>
                <td>{disciplina.nome}</td>
                <td>{disciplina.area}</td>
                <td>{disciplina.nota}</td>
                <td>{disciplina.status}</td>
                <td>{disciplina.faculdade}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/disciplinas/form?id=${disciplina.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(disciplina)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}

