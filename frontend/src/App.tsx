import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components';
import { CreateItem, CreateSchema, MainItems, MainSchema, UpdateItem, UpdateSchema } from './pages';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<div></div>}/>
        <Route path="/schema/create" element={<CreateSchema/>}/>
        <Route path="/schema/update/:name" element={<UpdateSchema/>}/>
        <Route path="/item/create/:schemaName" element={<CreateItem/>}/>
        <Route path="/item/update/:id/:schemaName" element={<UpdateItem/>}/>
        <Route path="/item/main" element={<MainItems/>}/>
        <Route path="/schema/main" element={<MainSchema/>}/>
      </Routes>
    </div>
  );
}

export default App;
