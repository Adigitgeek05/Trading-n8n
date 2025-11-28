
import {Router,BrowserRouter,Routes,Route} from 'react-router-dom';
import { CreateWorkflow } from './components/CreateWorkflow.tsx';


 

 
export default function App() {

  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/create-workflow" element={<CreateWorkflow />} />
      </Routes>
      </BrowserRouter>
  </div>
 
}