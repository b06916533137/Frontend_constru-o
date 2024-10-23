'use client'

import Pagina from '@/components/page'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, CardImg, Modal } from 'react-bootstrap'
import { FaCheck, FaTrashAlt } from 'react-icons/fa'
import * as Yup from 'yup'
import {ReactInputMask} from 'react-input-mask'
import { v4 as uuidv4 } from 'uuid'


// Validação Yup
const ImovelSchema = Yup.object().shape({
  tipo: Yup.string().required("Tipo é obrigatório"),
  finalidade: Yup.string().required("Finalidade é obrigatória"),
  valor: Yup.number().required("Valor é obrigatório").positive("Deve ser um valor positivo"),
  area: Yup.number().required("Área é obrigatória").positive("Área deve ser positiva"),
  quartos: Yup.number().required("Número de quartos é obrigatório").min(1, "Deve ter pelo menos 1 quarto"),
  banheiros: Yup.number().required("Número de banheiros é obrigatório").min(1, "Deve ter pelo menos 1 banheiro"),
  descricao: Yup.string().required("Descrição é obrigatória"),
  foto: Yup.string().url("Deve ser uma URL válida"),
  vagasGaragem: Yup.number().required("Número de vagas é obrigatório").min(0, "Não pode ser negativo"),
  endereco: Yup.object().shape({
    cep: Yup.string().required("CEP é obrigatório"),
    logradouro: Yup.string().required("Logradouro é obrigatório"),
    numero: Yup.string().required("Número é obrigatório"),
    complemento: Yup.string(),
    bairro: Yup.string().required("Bairro é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatória"),
    UF: Yup.string().required("UF é obrigatório").length(2, "UF deve ter 2 letras"),
  }),
  proprietario: Yup.object().shape({
    nome: Yup.string().required("Nome do proprietário é obrigatório"),
    CPF: Yup.string().required("CPF é obrigatório"),
    telefone: Yup.string().required("Telefone é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  }),
});

export default function HomePage() {
  return (
    <Pagina titulo="Cadastro de Imoveis">
      <Formik
        initialValues={{
          id: uuidv4(),
          tipo: "",
          finalidade: "",
          valor: "",
          area: "",
          quartos: "",
          banheiros: "",
          descricao: "",
          foto: "",
          vagasGaragem: "",
          endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            UF: "",
          },
          proprietario: {
            nome: "",
            CPF: "",
            telefone: "",
            email: "",
          },
        }}
        validationSchema={ImovelSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
          alert("Imóvel cadastrado com sucesso!");
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h2>Dados do Imóvel</h2>
            <div>
              <label>Tipo:</label>
              <Field name="tipo" />
              <ErrorMessage name="tipo" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Finalidade:</label>
              <Field name="finalidade" />
              <ErrorMessage name="finalidade" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Valor:</label>
              <Field name="valor" type="number" />
              <ErrorMessage name="valor" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Área (m²):</label>
              <Field name="area" type="number" />
              <ErrorMessage name="area" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Quartos:</label>
              <Field name="quartos" type="number" />
              <ErrorMessage name="quartos" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Banheiros:</label>
              <Field name="banheiros" type="number" />
              <ErrorMessage name="banheiros" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Descrição:</label>
              <Field name="descricao" />
              <ErrorMessage name="descricao" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Foto (URL):</label>
              <Field name="foto" type="url" />
              <ErrorMessage name="foto" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Vagas de Garagem:</label>
              <Field name="vagasGaragem" type="number" />
              <ErrorMessage name="vagasGaragem" component="div" style={{ color: 'red' }} />
            </div>

            <h2>Endereço</h2>
            <div>
              <label>CEP:</label>
              <Field name="endereco.cep">
                {/* {({ field }) => <ReactInputMask {...field} mask="99999-999" />} */}
              </Field>
              <ErrorMessage name="endereco.cep" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Logradouro:</label>
              <Field name="endereco.logradouro" />
              <ErrorMessage name="endereco.logradouro" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Número:</label>
              <Field name="endereco.numero" />
              <ErrorMessage name="endereco.numero" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Complemento:</label>
              <Field name="endereco.complemento" />
              <ErrorMessage name="endereco.complemento" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Bairro:</label>
              <Field name="endereco.bairro" />
              <ErrorMessage name="endereco.bairro" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Cidade:</label>
              <Field name="endereco.cidade" />
              <ErrorMessage name="endereco.cidade" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>UF:</label>
              <Field name="endereco.UF" />
              <ErrorMessage name="endereco.UF" component="div" style={{ color: 'red' }} />
            </div>

            <h2>Dados do Proprietário</h2>
            <div>
              <label>Nome do Proprietário:</label>
              <Field name="proprietario.nome" />
              <ErrorMessage name="proprietario.nome" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>CPF do Proprietário:</label>
              <Field name="proprietario.CPF">
                {/* {({ field }) => <ReactInputMask {...field} mask="999.999.999-99" />} */}
              </Field>
              <ErrorMessage name="proprietario.CPF" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Telefone do Proprietário:</label>
              <Field name="proprietario.telefone">
                {/* {({ field }) => <ReactInputMask {...field} mask="(99) 99999-9999" />} */}
              </Field>
              <ErrorMessage name="proprietario.telefone" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Email do Proprietário:</label>
              {/* <Field name="proprietario.email" type="email" /> */}
              <ErrorMessage name="proprietario.email" component="div" style={{ color: 'red' }} />
            </div>

            <Button type="submit" variant="primary" className="mt-3">
              Cadastrar Imóvel <FaCheck />
            </Button>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}