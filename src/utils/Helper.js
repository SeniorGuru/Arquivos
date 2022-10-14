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

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export const validateInputValue = (inputValue) => {
    var inputValueRegex = /^[a-zA-Z0-9]+$/;
    return inputValueRegex.test(inputValue);
}

export const getYoutubeId = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}
export const isYoutubeUrl = (url) => {
    return url && url.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
}

export const getFileExtension = (raw_file_type) => {
    if(!raw_file_type) return 'unknown' ;
    
    let extension = raw_file_type.split('/')[1] ;
    if(extension === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return "docx"
    } else {
        return extension ;
    }
}

export const removeExtension = (filename) => {
    return filename?.substring(0, filename.lastIndexOf('.')) || filename;
}

export const convertObjToString = (obj) => {
    if(!obj) return new Date().getTime();

    return  obj.month + "/" + obj.day + "/" + obj.year ;
}

export const walletAddressFormat = (walletAddress) => {
    if(!walletAddress) return "Lock" ;
    return walletAddress.slice(0, 6) + "..." + walletAddress.slice(walletAddress.length - 4, walletAddress.length) ;
}

export const fileNameFormat = (fileName) => {
    if(!fileName) return "Unknown" ;
    if(fileName.legnth > 10)  return fileName.slice(0, 6) + "..." + fileName.slice(fileName.length - 4, fileName.length) ;
    else return fileName ;
}

export const uuidValidateV4 = async (uuid) => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4 ;
}

export const authorization = () => {
    return {
        headers: { Authorization: `Bearer ` + getCookie('idToken') }
    }
}

export const errorHandler = (err) => {
    try {
        if(err.response.status === 429){
            return "Too Many Requests." ;
        }
        if(err.response.status === 401){
            return "Unauthorized" ;
        }
        if(err.response.status >= 400 && err.response.status < 500){
            console.log(err.response.data.message) ;
            return err.response.data.message ;
        }
    } catch(error){
        console.log("error" , err);
        return "Server Side Error" ;
    }
}

export const isAuthenticated = () => {
    if(getCookie('user_id')) {
        return true ;
    }
    return false ;
}