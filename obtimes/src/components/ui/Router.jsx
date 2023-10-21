import {HashRouter, Routes, NavLink, Route} from 'react-router-dom'
import Home from '../screens/home/home'
import Template from '../screens/template/Template'
import General from '../screens/general/General'
import AddUnitsList from '../screens/addUnitsLinst/AddUnitsList'
const Router = () =>{
    return (
        <HashRouter>
            <Routes>
                <Route element={<Home />} path='/' />
                <Route element={<Template />} path='/temp' />
                <Route element={<AddUnitsList />} path='/addunitslist' />
                <Route element={<General />} path ='/general'/>
                <Route path='*' element={<div>Not Found</div>}/>
            </Routes>
        </HashRouter>
        
    )
}
export default Router