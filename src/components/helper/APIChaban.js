/**
 * 
 * This is a helper to send resqust to API 
 * 
 * @link : localhost:3000
 * @github : https://github.com/papswell/client-chaban
 */

 class ApiChaban {
    constructor(_link){
        this.api = _link || 'http://localhost:3000';
        this.response = {
            url : this.api,
            status : 500,
            success : false,
            data : {},
            error : ''
        };
        this.parsed = {};
    }

    /**
     * response
    */
    parse = (object) => {
        this.parsed = Object.assign(this.response, this.parsed, object);

        return this.parsed;
    }
    /*
    * get json from api
    */
    get = (params = null) => {
        let url = params ? this.api + '/' + params : this.api;
        this.parsed = {};

        return fetch( url , {
            method: 'GET',
            headers: {
                'Accept': 'text/plain, application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            console.log(response)
            if(response.status === 200)
                this.parse({ status : response.status, success : true});
            else
                this.parse({ status: response.status, success : false})

            return response.json();
        }).then((json) => {
            if(!this.parsed.success)
                throw json

            return this.parse({data : json})
        }).catch((error) => {
            console.log(error)
            return this.parse({success : false, error : error.error ? error.error : error.toString()});
        });
    }   

    /**
     * helper
     */
    getList = (from = null, to = null) => {
        return this.get(this.toDate(from, to));
    }

    getId = (id) => {
        return this.get(id);
    }

    toDate = (from = '', to = '') => {
        if(!from && !to) return '';

        // from = new Date(from);
        // to = new Date(to); 

        // if(from > to)
        //     from = to;
        // if(to < from)
        //     to = from 
        
        if(from){
            from = 'from='+from;
        }
        if(to){
            to = 'to='+to;
        }

        return from && to ? '?'+from+'&'+to : from || to ? '?'+from+to : '';
    }
 }

 module.exports = new ApiChaban();