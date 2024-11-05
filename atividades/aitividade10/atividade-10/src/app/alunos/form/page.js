
'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCanadianMapleLeaf, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ProfessorFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Busca a lista de cursos para usar no select
  const cursos = JSON.parse(localStorage.getItem('cursos')) || []
  const faculdades = JSON.parse(localStorage.getItem('faculdades')) || []

  // Buscar a lista de cursos no localStorage, se não existir, inicializa uma lista vazia
  const professores = JSON.parse(localStorage.getItem('professores')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista a faculdade com o ID recebido no parametro
  const professorEditado = professores.find(item => item.id == id)
  console.log(professorEditado)


  // função para salvar os dados do form
  function salvar(dados) {
    // Se professorEditado existe, mudar os dados e gravar no localStorage
    if (professorEditado) {
      Object.assign(professorEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('professores', JSON.stringify(professores))
    } else {
      // se professorEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4()
      // Adiciona a nova faculdade na lista de faculdades
      professores.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('professores', JSON.stringify(professores))
    }

    alert("Professor criado com sucesso!")
    router.push("/professores")
  }

  // Lista de periodos
  const listaPeriodo = [
    "Noturno",
    "Matutino",
    "Vespetino",
    "Integral"
  ]

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    faculdade: '',
    curso: '',
    periodo: '',
    matricula: '',
    foto: '',
    
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    email: Yup.date().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    faculdade: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    periodo: Yup.string().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    foto: Yup.string().required("Campo obrigatório"),
    
  })

  return (
    <Pagina titulo={"Cadastro de Aluno"}>
        <h3 className='text-center'>Dados Pessoais</h3>
    <hr></hr>

      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de professorEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={professorEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})


            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Sobrenome:</Form.Label>
                    <Form.Control
                      name='sobrenome'
                      type='text'
                      value={values.sobrenome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.sobrenome && !errors.sobrenome}
                      isInvalid={touched.sobrenome && errors.sobrenome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.sobrenome}</Form.Control.Feedback>
                  </Form.Group>
                  </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                      name='email'
                      type='text'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                      name='dataNascimento'
                      type='date'
                      value={values.dataNascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataNascimento && !errors.dataNascimento}
                      isInvalid={touched.dataNascimento && errors.dataNascimento}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      name='telefone'
                      type='text'
                      placeholder='(00)00000-0000'
                      value={values.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <h3 className='text-center'>Acadêmico</h3>
                    <hr></hr>
                
                <Row className='mb-2'>

                <Form.Group as={Col}>
                    <Form.Label>Faculdade:</Form.Label>
                    <Form.Select
                      name='faculdade'
                      value={values.faculdade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.faculdade && !errors.faculdade}
                      isInvalid={touched.faculdade && errors.faculdade}
                    >
                      <option value=''>Selecione</option>
                      {faculdades.map(faculdade => <option value={faculdade.nome}>{faculdade.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.faculdade}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Período:</Form.Label>
                    <Form.Select
                      name='periodo'
                      value={values.periodo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.periodo && !errors.periodo}
                      isInvalid={touched.periodo && errors.periodo}
                    >
                      <option value=''>Selecione</option>
                      {listaPeriodo.map(periodo => <option value={periodo}>{periodo}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.periodo}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cursos:</Form.Label>
                    <Form.Select
                      name='curso'
                      value={values.cursos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.curso && !errors.curso}
                      isInvalid={touched.curso && errors.curso}
                    >
                      <option value=''>Selecione</option>
                      {cursos.map(curso => <option value={curso.nome}>{curso.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                <Row className='mb-2'>

                <Form.Group as={Col}>
                    <Form.Label>Matricula:</Form.Label>
                    <Form.Control
                      name='matricula'
                      type='text'
                      placeholder='000000'
                      value={values.matricula}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.matricula && !errors.matricula}
                      isInvalid={touched.matricula && errors.matricula}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.matricula}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Foto:</Form.Label>
                    <Form.Control
                      name='foto'
                      type='file'
                      value={values.foto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.foto && !errors.foto}
                      isInvalid={touched.foto && errors.foto}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
                  </Form.Group>

                </Row>
                  
                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/faculdades'><FaArrowLeft /> Voltar</Button>
                  <Button className='me-2' type='reset'><FaTrashRestore /> Limpar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                </Form.Group>



              </Form>
            )

          }
        }
      </Formik>

    </Pagina>
  )
}