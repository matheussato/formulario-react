import { useState } from 'react'
import { DivEtiqueta } from '../styled'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    nome: yup.string().required("O nome é obrigatório!"),
    email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
    cpf: yup.string().min(11, "O CPF deve ter ao menos 11 digitos").required("O CPF é obrigatório"),


}).required();

export default function Etiquetas(){

    const{ register, handleSubmit, formState: {errors}, setValue, setFocus} = useForm({
        resolver : yupResolver(schema)
    })

    function buscarCep(e){
        const cep = e.target.value.replace(/\D/g,'')
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            setValue('rua', data.logradouro)
            setValue('bairro', data.bairro)
            setValue('cidade', data.localidade)
            setValue('estado', data.uf)
            setFocus('numero')
        })
    }


    const [listaCliente, setListaCliente] = useState([])

    function inserirCliente(cliente){
        
        setListaCliente([...listaCliente, cliente])
    }

    return(
        <DivEtiqueta>
            <form onSubmit={handleSubmit(inserirCliente)}>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <label>Nome:
                        <input type="text" {...register('nome')} />
                        <span>{errors.nome?.message}</span>
                    </label>
                    <label>E-mail:
                        <input type="text" {...register('email')}/>
                        <span>{errors.email?.message}</span>
                    </label>
                    <label>CPF:
                        <input type="text" {...register('cpf')}/>
                        <span>{errors.cpf?.message}</span>
                    </label>
                </fieldset>
                
                <fieldset>
                    <legend>Endereço</legend>
                    <label>CEP:
                        <input type="text" {...register('cep')}
                        onBlur={buscarCep}/>
                    </label>
                    <label>Rua:
                        <input type="text" {...register('rua')}/>
                    </label>
                    <label>Número:
                        <input type="text" {...register('numero')}/>
                    </label>
                    <label>Bairro:
                        <input type="text" {...register('bairro')}/>
                    </label>
                    <label>Cidade:
                        <input type="text" {...register('cidade')}/>
                    </label>
                    <label>Estado:
                        <input type="text" {...register('estado')}/>
                    </label>
                    <button type='submit'>Criar</button>
                </fieldset>

            </form>
            <div className="painel">
                {
                    listaCliente.map((cli, index)=>                    
                <div className="etiqueta" key={index}>
                    <h3>Dados Pessoas</h3>
                    <p>Nome: {cli.nome}</p>
                    <p>E-mail: {cli.email}</p>
                    <p>CPF: {cli.cpf}</p>
                    <p>Rua: {cli.rua}, {cli.numero}</p>
                    <p>Bairro: {cli.bairro}</p>
                    <p>Cidade: {cli.cidade} - {cli.estado}</p>
                </div>
                    )
                }
            </div>
        </DivEtiqueta>
    )
}