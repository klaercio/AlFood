import { Routes, Route } from 'react-router-dom';
import NovoRestaurante from './paginas/Administracao/NovoRestaurante';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes';
import PaginaBaseAdmin from './paginas/Administracao/Restaurantes/PaginaBaseAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />


      <Route path="/admin" element={<PaginaBaseAdmin/>}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<NovoRestaurante />} />
        <Route path="restaurantes/:id" element={<NovoRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
