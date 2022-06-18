import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function NovoRestaurante() {


    const parametro = useParams();

    useEffect(()=> {
        if (parametro.id) {
            axios.get<IRestaurante>(`http://127.0.0.1:8000/api/v2/restaurantes/${parametro.id}/`)
            .then(response => setRestaurante(response.data.nome));
        }
    },[parametro]);


    const [restaurante, setRestaurante] = useState('');

    function aoSubmit(evento : React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if(parametro.id) {
            axios.put(`http://127.0.0.1:8000/api/v2/restaurantes/${parametro.id}/`, {nome : restaurante})
            .then(()=> alert('usuario editado com sucesso'));
            return;
        }

        axios.post('http://localhost:8000/api/v2/restaurantes/', {nome : restaurante})
        .then(()=> (
            alert('restaurante cadastrado com sucesso!!')
        ))
    }

    return (
        <form onSubmit={aoSubmit}>
            <TextField id="standard-basic" value={restaurante} onChange={evento => setRestaurante(evento.target.value)} label="Nome do Restaurante" />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    );
}