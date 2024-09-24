import{Routes,Route} from 'react-router-dom'

import Category from '../../Pages/Category';
import Home from '../../Pages/Home';
import AddCart from '../AddCart';

function AppRoutes(){
    return (
    <Routes>
        <Route path='/' element={<Category/>}></Route>
        <Route path='/:categoryId' element={<Category/>}></Route>
        <Route path="/addcart" element={<AddCart />} />
    </Routes>
    );
}
export default AppRoutes