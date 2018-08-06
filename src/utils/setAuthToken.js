import axios from 'axios';

const setAuthToken = (access_token)=>{
  if(access_token){
    axios.defaults.headers.common['authorization'] = access_token;
  }else {
    delete axios.defaults.headers.common['authorization'];
  }
}

export default setAuthToken;