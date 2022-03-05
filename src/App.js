import React,{useState} from 'react'
import {FiSearch} from 'react-icons/fi'

import './style.css'

import api from './services/api'

export default function App () {

    const [input, setInput]= useState('')
    const [cep, setCep] = useState({})

    return (

        <div className='container'>

            <h1 className='title'>Buscador de CEP</h1>

            <div className='containerInput'>

                <input 
                type='text'
                placeholder='Digite seu CEP'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />

                <button className='btnSearch' onClick={() => {

                    handleSearch()
                    
                    async function handleSearch() {

                        if (input === '') {
                
                            alert('Preencha o campo CEP!')
                
                            return;
                
                        }

                        try {

                            const response = await api.get(`${input}/json`);
                            setCep(response.data)
                            setInput("")

                        } catch {

                            alert('Algo deu errado... Verifique o CEP e tente novamente!')
                            setInput("")
                            
                        }
                
                    } 
                    
                }}>

                    <FiSearch className='icon' size={25} color='#FFF'/>

                </button>

            </div>

            {Object.keys(cep).length > 0 && (

                <main className='main'>

                    <h2>CEP: {cep.cep}</h2>

                    <span>Bairro: {cep.bairro}</span>
                    <span>Logradouro: {cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>Cidade: {cep.localidade}</span>
                    <span>UF: {cep.uf}</span>
                    <span>DDD: {cep.ddd}</span>

                </main>

            )}

        </div>
    )
    
}