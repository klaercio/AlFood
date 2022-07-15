import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;
    border: 1px solid rgba(15, 10, 222, 0.5);
    padding-inline: 15px;
    padding-block: 4px;
    border-radius: 5px;
    color: blue;
    
    &:hover, &:active{
        border: 1px solid rgba(15, 10, 222, 1);
        color: blue;
    }
`;

export default function AdministracaoPratos() {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(()=> {
        http.get<IPrato[]>('pratos/')
        .then(response => setPratos(response.data));
    },[])

    function excluir(id: Number) {
        http.delete(`restaurantes/${id}/`)
        .then(() => {
            const listaRestaurantes = pratos.filter(restaurante => restaurante.id !== id);
            setPratos([...listaRestaurantes]);
        })
    }

    return <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Descrição
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
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.descricao}
                            </TableCell>
                            <TableCell>
                                <Button>
                                    <StyledLink to={`/admin/prato/${prato.id}`}>editar</StyledLink>  
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato.id)}>
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