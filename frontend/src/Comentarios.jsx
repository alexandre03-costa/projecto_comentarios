import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comentarios.css';
import  face from './assets/face.png';
import  insta from './assets/insta.png';
import  what from './assets/what.png';
import  img from './assets/img.jpg';
import { FaUser } from 'react-icons/fa';


const Comentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [nome, setNome] = useState('');
    const [comentario, setMensagem] = useState('');
    const [tipo, setTipo] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3001/comentarios')
            .then(response => setComentarios(response.data))
            .catch(error => console.error('Erro ao buscar comentários:', error));
    }, []);

    const enviarComentario = () => {
        if (!nome || !comentario) return;
        axios.post('http://localhost:3001/comentarios', { nome, tipo,comentario })
            .then(response => {
                if (response.data.success) {
                    setComentarios([...comentarios, { nome, tipo,comentario }]);
                    setNome('');
                    setMensagem('');
                    setTipo('');
                }
            })
            .catch(error => console.error('Erro ao enviar comentário:', error));
    };

    return (

        <div>
            <h1>JOKES</h1>
            <div class="redes-sociais">
                 <a href="https://facebook.com" target="_blank">
                <img src={face} className="logo" alt="Facebook" />
                 </a>
                 <a href="https://web.whastapp.com" target="_blank">
                <img src={what} className="logo" alt="Whatsapp" />
                 </a>
                 <a href="https://instagram.com" target="_blank">
                <img src={insta} className="logo" alt="Instagram" />
                 </a>
            </div>
            <div class="principal">
            <div class="form">
                <label htmlFor="">Sobre </label>
               <select value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="">Selecione</option>
                <option value="Facebook">Facebook</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="Instagram">Instagram</option>
            </select><br />
                 <label htmlFor="">Nome</label>
                <input type="text" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} /><br />
              
                <textarea type="text" placeholder="Deixe o seu comentario" value={comentario} onChange={e => setMensagem(e.target.value)}></textarea><br />
                <button onClick={enviarComentario}>Enviar</button>
                <ul  class="lista-comment">
                        {comentarios.map((c, index) => (
                        <li key={index}><FaUser style={{ marginRight: '5px', color:'#000' } } className="comentario" /><strong>{c.nome}</strong>   Sobre <strong>{c.tipo}</strong> <br/>{c.comentario}</li>
                        ))}
                </ul>
            </div>
            <div class="asid">
                <img src={img}/>
            </div>
            </div>
        </div>
    );
};

export default Comentarios;