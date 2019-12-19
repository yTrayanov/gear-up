const BaseUrl = 'http://localhost:5000/auth/';

export default class AuthService{

    async login(email , password){
        const res = await window.fetch(BaseUrl +'login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },body:JSON.stringify({email,password})
        }).catch(error =>{
            throw error;
        });

        return res.json();
    }

    async register(username , email , password){
        await window.fetch(BaseUrl + 'register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username , email , password})
        }).catch(error =>{
            throw error;
        })
    }

    isAuthenticated() {
        return window.localStorage.getItem('token') !== null;
      }
    
      isAdmin(){
        return window.localStorage.getItem('isAdmin') !=='false';
      }
    
      getToken(){
        let token = window.localStorage.getItem('token');
        return token;
      }
    
      getUserId(){
        let id = window.localStorage.getItem('userId');
        return id;
      }
}