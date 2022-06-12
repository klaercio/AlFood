import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function NovoRestaurante() {

    const [restaurante, setRestaurante] = useState('');

    function aoSubmit(evento : React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

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