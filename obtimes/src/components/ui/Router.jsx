import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from '../screens/home/home'
import Template from '../screens/template/Template'
import General from '../screens/general/General'
const Router = () =>{
    return (
        <HashRouter>
            <Routes>
                <Route element={<Home />} path='/' />
                <Route element={<Template />} path='/temp' />
                <Route element={<Template />} path='/admin' />
                <Route element={<General />} path ='/general'/>
                <Route path='*' element={<div>Not Found</div>}/>
            </Routes>
        </HashRouter>
        
    )
}
export default Router