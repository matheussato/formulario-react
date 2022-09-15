import { useState } from 'react'
import { DivEtiqueta } from './../styled'

export default function Etiquetas(){

    const [cliente, setCliente] = useState({'nome':'','email':'','cpf':''})
    const [listaCliente, setListaCliente] = useState([])

    function inserirCliente(e){
        e.preventDefault()
        setListaCliente([...listaCliente, cliente])
    }

    function cadCliente(e){
        setCliente({...cliente, [e.target.name]: e.target.value})
    }

    return(
        <DivEtiqueta>
            <form onSubmit={inserirCliente}>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <label>Nome:
                        <input type="text" name='nome'
                        onChange={cadCliente} value={cliente.nome} />
                    </label>
                    <label>E-mail:
                        <input type="text" name='email' 
                        onChange={cadCliente} value={cliente.email}/>
                    </label>
                    <label>CPF:
                        <input type="text" name='cpf' 
                        onChange={cadCliente} value={cliente.cpf}/>
                    </label>
                    <button type='submit'>Criar</button>
                </fieldset>
            </form>
            <div className="painel">
                {
                    listaCliente.map((cli, index)=>                    
                <div className="etiqueta" key={index}>
                    <p>Nome: {cli.nome}</p>
                    <p>E-mail: {cli.email}</p>
                    <p>CPF: {cli.cpf}</p>
                </div>
                    )
                }
            </div>
        </DivEtiqueta>
    )
}