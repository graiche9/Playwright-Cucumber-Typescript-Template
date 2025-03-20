class DataExchange {
    static data: any ={};
    static set (key: string, values: any ){
        this.data[key]= values;
    }

    static get (key: string){
        return this.data[key];
    }
}
