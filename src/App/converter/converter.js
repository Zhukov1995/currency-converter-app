import './converter.scss';
import { useState, useEffect } from 'react';
import CurrencyService from '../CurrencyService/CurrencyService';
import currencys from '../CurrencyService/Common-Currency.json'
import BlockResult from './block-result/block-result';

const Converter = () => {
    const [inputValue, setInputValue] = useState('');
    const [currencyArr, setCurrencyArr] = useState([]);
    const [selectCurrency, setSelectCurrancy] = useState(3.67294);
    const [date, setDate] = useState('');
    const [resultConverter, setResultConverter] = useState(0);
    // Предупреждение если попытаются конвертировать пустое значение
    const [warning, setWarning] = useState(false);

    //state для BlockResult
    const [displayTogle, setDisplayTogle] = useState(false);
    const [info, setInfo] = useState({ title: '', abriviature: '' })


    const currencyService = new CurrencyService();

    // запрос к серверу за текущими курсами 
    const getActualCurr = () => {
        currencyService.getActualCorrency()
            .then(createArrCurrency)
            .catch(() => console.log('Произошла ошибка'))
    }
    /* eslint-disable */
    // запрос к серверу за курсом с определенной датой,срабатывает при изменении даты
    useEffect(() => {
        if (date !== '') {
            currencyService.getHistorCorrency(date)
                .then(createArrCurrency)
                .catch(() => console.log('Произошла ошибка при загрузке истории'))
        } else {
            getActualCurr()
        }
    }, [date]);
    /* eslint-enable */

    const createArrCurrency = (result) => {
        setCurrencyArr(result)
    }

    // двусторонее привязывание
    const changeInput = (e) => {
        setInputValue(e.target.value)
        setWarning(false)
    }

    const changeSelect = (e) => {
        setSelectCurrancy(e.target.value)
    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    // конвертация
    const calculateCurrency = () => {
        if (inputValue !== "") {
            const result = (inputValue * selectCurrency).toFixed(3);
            setResultConverter(result)
            setDisplayTogle(true)
        } else {
            setWarning(true)
        }
    }

    // расшифровка абривиатур,работа с JSON
    const searchCurrencyname = (names) => {
        for (let key in currencys) {
            if (key === names) {
                return key + ' - ' + currencys[key].name
            }
        }
    }

    // находим индекс
    const findIndex = (value) => {
        let copy = [...currencyArr];
        copy = copy.map(item => +item.slice(4));

        for (let i = 0; i < copy.length; i++) {
            if (copy[i] === value) {
                return i;
            }
        }
    }
    // по индексу вытаскиваем данные и устанавливаем их в state
    const getInfo = (value) => {
        let copy = [...currencyArr];
        let index = findIndex(value);
        let abriviature = copy[index].slice(0, 3);
        let item = searchCurrencyname(abriviature);
        let title = item.slice(6);
        setInfo({ title: title, abriviature: abriviature })
    }
    // вызываем при изменении результата при соблюдении условий
    /* eslint-disable */
    useEffect(() => {
        if (resultConverter !== 0 && displayTogle === true) {
            getInfo(+selectCurrency)
        }
    }, [resultConverter]);
    /* eslint-enable */

    const copy = [...currencyArr];
    const itemSelect = copy.map((item, index) => {
        const localKey = searchCurrencyname(item.substr(0, 3));
        const localValue = item.slice(4);
        return <option value={localValue} key={index}>
            {localKey}
        </option>
    })

    const currLength = currencyArr.length > 0 ? true : false;
    return (
        <div className='converter-wrapper'>
            <div className="converter">
                <h1>Конвертер валют</h1>
                <input
                    type="number"
                    className='inpt-currency'
                    placeholder='100.00'
                    value={inputValue}
                    onChange={changeInput}
                />
                <select className='select-currency-1' disabled>
                    <option value="USD">USD - US dollar</option>
                </select>
                <div className="select-block">
                    <label htmlFor="select-currency-2">
                        Пересчитать в:
                        <select id='select-currency-2'
                            disabled={!currLength}
                            value={selectCurrency}
                            onChange={changeSelect}>
                            {currLength ? itemSelect : <option>AED</option>}
                        </select>
                    </label>
                </div>
                <div className="select-block">
                    <label htmlFor="select-date">
                        По курсу ЦБ за:
                        <input type="date" id='select-date' value={date} onChange={changeDate} />
                    </label>
                    <button type='button' disabled={!currLength} onClick={() => calculateCurrency()}>Конвертировать</button>
                    {warning ? <h3 className='warning'>Введите значение!</h3> : null}
                </div>
            </div>
            {displayTogle ?
                <BlockResult
                    info={info}
                    resultConverter={resultConverter}
                    inputValue={inputValue}
                    setDisplayTogle={setDisplayTogle}
                    date={date}
                    setInputValue={setInputValue}
                    setDate={setDate}
                    setResultConverter={setResultConverter}
                />
                :
                null}
        </div>
    )
}

export default Converter;