import { HashRouter, Routes, NavLink, Route } from 'react-router-dom'
import Home from '../screens/home/home'
import Template from '../screens/template/Template'
import General from '../screens/general/General'
import AddUnitsList from '../screens/addUnitsLinst/AddUnitsList'
import Statistic from '../screens/Statistic/Statistic'
import { useAuth } from '../../context/AuthContext'
import Login from '../screens/auth/Login'
import StatisticPersonal from '../screens/StatisticPersonal/StatisticPersonal'
const Router = () => {
    const { currentUser } = useAuth();
    return (
        <>
            {currentUser ?
                <HashRouter>
                    <Routes>
                        <Route element={<Home />} path='/' />
                        <Route element={<Template />} path='/temp' />
                        <Route element={<AddUnitsList />} path='/addunitslist' />
                        <Route element={<General />} path='/general' />
                        <Route element={<StatisticPersonal />} path='/statistic' />
                        <Route path='*' element={<div>Not Found</div>} />
                    </Routes>
                </HashRouter>
                :
                <Login />}
        </>

    )
}
export default Router