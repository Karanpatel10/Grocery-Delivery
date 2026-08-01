import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL||'http://localhost:3000/api',
})

// Inject JWT token from localstorage into every request
api.interceptors.request.use((config)=>{
    const path=window.location.pathname
  
    let token =null;

    if(path.startsWith("/delivery"))
    {
     token=localStorage.getItem('delivery_token');
    }else{
     token=localStorage.getItem('auth_token');
    }

    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

// Handle auth errors globally
api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && (error.response?.code === "INVALID_TOKEN" || error.response?.code === "ACCESS_DENIED" || error.response?.code === "ACCOUNT_DEACTIVATED")){

             if(window.location.pathname.startsWith("/delivery")){
                localStorage.removeItem("delivery_token");
                localStorage.removeItem("delivery_partner");
                window.location.href="/delivery/login";
            }else{
                 localStorage.removeItem('auth_token');
                 localStorage.removeItem('auth_user');
                // only redirect if not already on login page
                if(!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')){
                    window.location.href='/login';
                }
            }
        }
        return Promise.reject(error);
    }
)

export default api;