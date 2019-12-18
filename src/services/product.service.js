import AuthService from './auth.service'
const service = new AuthService();

const BaseUrl ='http://localhost:5000/product/';


export default class ProductService{

    async getAllProducts(){
        let res = null;

        await window.fetch(BaseUrl +'all')
            .then((response) => response.json())
            .then((data) => {
                res = data;
            }); 

        return res;
    }

    async createProduct(name , image , price){
        await window.fetch(BaseUrl + 'create' , {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + service.getToken()
            },
            body:JSON.stringify({name , image , price})
        }).catch(error =>{
            throw error;
        });
    }
}