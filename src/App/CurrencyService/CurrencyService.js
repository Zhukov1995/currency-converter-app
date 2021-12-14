
class CurrencyService {
    _API_BASE = 'access_key=11df564ec4e5be4642329810fa18aad3';
    _DATA_BASE = 'http://api.currencylayer.com/';

    getResourse = async (url) => {
        const req = await fetch(url)

        if(req.success === false) {
            throw Error(`status Error:${req.status}`)
        }

        return req.json();
    } 

    getActualCorrency = async () => {
       const res = await this.getResourse(`${this._DATA_BASE}live?${this._API_BASE}`);
       return this.transformRes(res.quotes)
    }

    getHistorCorrency = async (historyDate) => {
        const res = await this.getResourse(`${this._DATA_BASE}historical?${this._API_BASE}&date=${historyDate}`);
        return this.transformRes(res.quotes);
    }

    transformRes = (res) => {
        let copy = {...res};
        //Преобразовываем обьект в массив и обрезаем названия валют 
        copy = Object.entries(copy).map(item=> item[0].slice(3) + " " + item[1]);
        
        return copy;
    }

}

export default CurrencyService;