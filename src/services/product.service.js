import AuthService from './auth.service'
const authService = new AuthService();

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
                'Authorization': 'bearer ' + authService.getToken()
            },
            body:JSON.stringify({name , image , price})
        }).catch(error =>{
            throw error;
        });
    }

    async getProductById(id){
        let res =null;
        await window.fetch(BaseUrl +'details/' + id)
            .then((response) => response.json())
            .then((data) => {
                res = data;
            });

            return res;
    }

    async editProduct(id ,name , price , image){
        window.fetch(BaseUrl + 'edit/' + id ,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + authService.getToken()
            }, body:JSON.stringify({name , image , price})
        }).catch(error =>{
            throw error;
        })
    }

    async addToUserCart(productId){

        let userId = authService.getUserId();

        window.fetch(BaseUrl + 'add' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer' + authService.getToken()
            }, body:JSON.stringify({productId ,userId})
        }).catch(error =>{
            throw error;
        })
    }

    async checkIfAlreadyInCart(productId){
        let isAdded;
        const userId = authService.getUserId();
        await window.fetch(BaseUrl + 'check/' + productId + '/' + userId)
        .then(response => response.json())
        .then((data) =>{
            isAdded = data.isAdded
        });

        return isAdded;
    }

    async getUserProducts(){
        let res = null;
        const userId = authService.getUserId();

        await window.fetch(BaseUrl + 'user/' + userId)
            .then(response => response.json())
            .then(data =>{
                res = data;
            })

            return res;
    }

    async deleteProduct(productId){
        await window.fetch(BaseUrl + 'remove/' + productId , {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer' + authService.getToken()
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    async removeFromCart(productId){
        const userId = authService.getUserId();

        window.fetch(BaseUrl +'user/remove',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer' + authService.getToken()
            } , body:JSON.stringify({productId , userId})
        }).catch(error =>{
            throw error;
        })
    }
}