import './searchCurrency.scss';
import { useState, useEffect } from 'react';
import currencys from '../CurrencyService/Common-Currency.json';

const SearchCurrency = () => {

    const [strSearch, setStringSearch] = useState('');
    //Создаем и обрабатываем копию JSON и записываем ее в state 
    let copy = { ...currencys }
    copy = Object.entries(copy)
    const currencyList = copy.map((item, index) => {
        return <li key={index}>
            <span>{item[1].name}</span>
            <span>{item[0]}</span>
            <span>{item[1].symbol}</span>
        </li>
    });
    const [currencyArr, setCurrencyArr] = useState(currencyList)
    //Привязываем input,и вызываем функцию при каждом изменении 
    const changeStr = (e) => {
        setStringSearch(e.target.value);
    }
    /* eslint-disable */
    useEffect(() => {
        filterCurrency(currencyList, strSearch);
    }, [strSearch])
    /* eslint-enable */


    // фильтруем список если значение не пустое
    const filterCurrency = (arr, str) => {
        str = str.toUpperCase();
        let copy = [...arr];
        if (str.length) {
            copy = copy.filter(item => item.props.children[1].props.children.includes(str));  
            setCurrencyArr(copy)
        } else {
            setCurrencyArr(currencyList)
        }
    }

    return (
        <div className="search-currency">
            <div className="search-info">
                <h2>Названия,Знаки и Аббревиатуры валют</h2>
                <p>Ниже в таблице представлен полный список мировых валют аббревиатуры,
                    их названия и символы валют:
                </p>
                <ul>
                    <li>Название валюты - официальное название денежной единицы данной страны.</li>
                    <li>
                        Аббревиатура валюты (трехбуквенный код) - идентификация единицы национальной валюты,
                        которая используется в соответствии со стандартом ISO 4217: первые две буквы определяют страну, а третья - название валюты.
                    </li>
                    <li>
                        Символы или знаки валют- графический символ.
                        Используется для краткого обозначения денежных единиц
                    </li>
                </ul>
                <h3>Список Валют Мира</h3>
                <input type="text" value={strSearch} onChange={changeStr} placeholder='Введите буквенный код (USD,EUR,...)'/>
            </div>
            
            <ul className='currency-list'>
                <li className='currency-list-title'><span>Название валюты</span><span>Аббревиатура валют</span><span>Знаки валют</span></li>
                {currencyArr.length ? currencyArr : <h3 className='alert'>Такой валюты не найдено...</h3>} 
            </ul>
        </div>
    )
}

export default SearchCurrency;