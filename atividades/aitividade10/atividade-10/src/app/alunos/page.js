
'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function alunosPage() {

  const [alunos, setalunos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []
    // guarda a lista no estado alunos
    setalunos(alunosLocalStorage)
    console.log(alunosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(aluno) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir a aluno ${aluno.nome}?`)) {
      // filtra a lista antiga removando a aluno recebida
      const novaLista = alunos.filter(item => item.id !== aluno.id)
      // grava no localStorage a nova lista
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setalunos(novaLista)
      alert("aluno excluída com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com as alunos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Período</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => {
            return (
              <tr>
                <td>{aluno.nome}</td>
                <td>{aluno.endereco}</td>
                <td>{aluno.pais}</td>
                <td>{aluno.estado}</td>
                <td>{aluno.cidade}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/alunos/form?id=${aluno.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(aluno)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}