import { AppBar, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import {Link as RouterLink} from 'react-router-dom';

export default function NovoRestaurante() {


    const parametro = useParams();

    useEffect(() => {
        if (parametro.id) {
            axios.get<IRestaurante>(`http://127.0.0.1:8000/api/v2/restaurantes/${parametro.id}/`)
                .then(response => setRestaurante(response.data.nome));
        }
    }, [parametro]);


    const [restaurante, setRestaurante] = useState('');

    function aoSubmit(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (parametro.id) {
            http.put(`restaurantes/${parametro.id}/`, { nome: restaurante })
                .then(() => alert('restaurante editado com sucesso!!'));
            return;
        }

        http.post('restaurantes/', { nome: restaurante })
            .then(() => (
                alert('restaurante cadastrado com sucesso!!')
            ))
    }

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", flexGrow: 1}}>
                            <Typography component="h1" variant="h6">Formulário de restaurantes</Typography>
                            <Box component="form" onSubmit={aoSubmit} sx={{width: '100%'}}>
                                <TextField id="standard-basic" value={restaurante} onChange={evento => setRestaurante(evento.target.value)} label="Nome do Restaurante" fullWidth required />
                                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>


        </>
    );
}