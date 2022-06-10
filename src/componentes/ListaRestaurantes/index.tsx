import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proxPag, setProxPag] = useState('');

  useEffect(()=> {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
    .then(response => {
      setRestaurantes(response.data.results);
      setProxPag(response.data.next);
    });
  },[]);

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proxPag)
    .then(response => {
      setRestaurantes([...restaurantes, ...response.data.results]);
      setProxPag(response.data.next);
    });
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proxPag && <button onClick={verMais}>
      Ver mais  
    </button>}
  </section>)
}

export default ListaRestaurantes