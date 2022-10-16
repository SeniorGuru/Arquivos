import { validate as uuidValidate } from 'uuid' ; 
import { version as uuidVersion } from 'uuid' ; 

export const setCookie = async (cname, cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
}

export const checkCookie = (cname) => {
    if(getCookie(cname)) return true ;
    return false ;
}

export const eraseCookie = async (cname) => {
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return ;
}

export const getExtension = (file_name) => {
    return file_name.split('.').pop().toLowerCase() ;
}


export const uuidValidateV4 = async (uuid) => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4 ;
}

export const authorization = () => {
    return {
        headers: { Authorization: `Bearer ` + getCookie('idToken') }
    }
}

export const isAuthenticated = () => {
    if(getCookie('user_id')) {
        return true ;
    }
    return false ;
}