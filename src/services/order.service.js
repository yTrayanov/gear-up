import AuthService from './auth.service';

const BaseUrl = 'http://localhost:5000/order/';
const authService = new AuthService();

export default class OrderService{

    async createOrder(productId,address ,addictionalInfo){

        const userId = authService.getUserId();

        await window.fetch(BaseUrl + 'create/' + userId,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + authService.getToken()
            }, body:JSON.stringify({productId ,address , addictionalInfo})
        }).catch(error =>{
            throw error;
        })
    }

    async getUserOrders(){

        const userId = authService.getUserId();

        let res;
         await window.fetch(BaseUrl + 'all/' + userId)
            .then(response => response.json())
            .then(data =>{
                res = data;
            });

            return res;
        
    }
}
