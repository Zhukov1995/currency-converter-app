import './block-result.scss';

const BlockResult = (props) => {
     
    const {info,resultConverter,inputValue,setDisplayTogle,date,setResultConverter,setDate,setInputValue} = props;
    const d = new Date();
    const dateNow = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    const dateNow2 = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    
    // при закрытии все сбрасывается
    const closeResult = () => {
        setDisplayTogle(false)
        setResultConverter(0)
        setDate('')
        setInputValue('')
    }
    
    return (
        <div className="block-result">
            <h4>Дата расчета: {dateNow}</h4>
            <p>{inputValue || 0} USD = <span>{`${resultConverter} ${info.abriviature}`}</span></p>
            <div className="info-result">
                <div>
                    <p>Количество</p>
                    <p>Перевод из валюты</p>
                    <p>В валюту</p>
                    <p>Курс от</p>
                </div>
                <div>
                    <p>{inputValue || 0}</p>
                    <p>USD (US dollar)</p>
                    <p>{info.abriviature} ({info.title})</p>
                    <p>{date !== '' ? date : dateNow2}</p>
                </div>
            </div>
            <div className='btn-close' onClick={() => closeResult()}></div>
        </div>
    )
}

export default BlockResult;