import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;
    border: 1px solid rgba(15, 10, 222, 0.5);
    padding-inline: 25px;
    padding-block: 8px;
    border-radius: 5px;
    color: blue;
    box-sizing: border-box;
    
    &:hover, &:active{
        border: 1px solid rgba(15, 10, 222, 1);
        color: blue;
    }
`;

export default function AdministracaoRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(()=> {
        http.get<IRestaurante[]>('restaurantes/')
        .then(response => setRestaurantes(response.data));
    },[])

    function excluir(id: Number) {
        http.delete(`restaurantes/${id}/`)
        .then(() => {
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== id);
            setRestaurantes([...listaRestaurantes]);
        })
    }

    return <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome Restaurante
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                <StyledLink to={`/admin/restaurantes/${restaurante.id}`}>EDITAR</StyledLink>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante.id)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
        </TableContainer>
    </>;
}