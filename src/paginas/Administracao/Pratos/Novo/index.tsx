import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http";
import IPrato from "../../../../interfaces/IPrato";
import ITag from "../../../../interfaces/ITag";

export default function NovoRestaurante() {


    const parametro = useParams();

    useEffect(() => {
        if (parametro.id) {
            axios.get<IPrato>(`http://127.0.0.1:8000/api/v2/pratos/${parametro.id}/`)
                .then(response => {
                    setPrato(response.data.nome);
                    setDescricao(response.data.descricao);
                    setRestaurante(response.data.restaurante);
                    });
        }
    }, [parametro]);

    
    
    const [prato, setPrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [restaurante, setRestaurante] = useState<Number>();
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    
    useEffect(()=> {
        http.get<{ tags: ITag[]}>('tags/')
        .then(response => setTags(response.data.tags));
    },[]);

    function aoSubmit(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (parametro.id) {
            axios.put(`http://127.0.0.1:8000/api/v2/pratos/${parametro.id}/`, { nome: prato, descricao: descricao, restaurante: restaurante })
                .then(() => alert('Prato editado com sucesso!!'));
            return;
        }

        axios.post('http://127.0.0.1:8000/api/v2/pratos/', { nome: prato, descricao: descricao, restaurante: 2})
            .then(() => (
                alert('Prato cadastrado com sucesso!!')
            ))
    }

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", flexGrow: 1}}>
                            <Typography component="h1" variant="h6">Formulário de prato</Typography>
                            <Box component="form" onSubmit={aoSubmit} sx={{width: '100%'}}>
                                <TextField sx={{ marginTop: 1 }} id="standard-basic" value={prato} onChange={evento => setPrato(evento.target.value)} label="Nome do prato" fullWidth required />
                                <TextField sx={{ marginTop: 1 }} id="standard-basic" value={descricao} onChange={evento => setDescricao(evento.target.value)} label="Descrição do prato" fullWidth required />
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="selectTag">Tag</InputLabel>
                                    <Select labelId="selectTag" value={tag} onChange={event => setTag(event.target.value)}>
                                        {tags.map(tag => {
                                            <MenuItem value={tag.id} key={tag.id}>
                                                {tag.value}
                                            </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                            </Box> 
                        </Box>
                    </Paper>
                </Container>
            </Box>


        </>
    );
}