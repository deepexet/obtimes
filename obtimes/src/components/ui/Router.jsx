import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../screens/home/home'
import Template from '../screens/template/Template'
import General from '../screens/general/General'
const Router = () =>{
    return (
        <BrowserRouter basename='/obtimes/'>
            <Routes>
                <Route element={<Home />} path='/' />
                <Route element={<Template />} path='/temp' />
                <Route element={<General />} path ='/general'/>
                <Route path='*' element={<div>Not Found</div>}/>
            </Routes>
        </BrowserRouter>
        
    )
}
export default Router