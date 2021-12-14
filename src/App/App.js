import './app.scss';
import Converter from './converter/converter';
import Header from './header/header';
import SearchCurrency from './searchCurrency/searchCurrency';
import { Routes , Route} from 'react-router-dom';
import Footer from './footer/footer';



const App = () => {

    return (
        <div className="app">
            <Header/>
            <Routes>
                    <Route exact='true' path='/' element={<Converter/>}/> 
                    <Route path='search' element={<SearchCurrency/>}/>
            </Routes>
            <Footer/>
        </div>
        
    )
}

export default App;