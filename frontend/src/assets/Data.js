import { FaInstagram, FaYoutube, FaTwitter, FaFacebook  } from "react-icons/fa";

export const iconsArr = [<FaInstagram />, <FaYoutube />, <FaFacebook />, <FaTwitter />]
export const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}

export const s3Domain = 'https://thousand-ways.s3.ap-south-1.amazonaws.com';


export const getIcons = (index ) => {
    return iconsArr[index];
}

export const getSociaIndex = (index) => {
    return socialMedia[index];
}  

export const getCategory = (index) => {
    const arr = [
        {id : 0, name : 'Lifestyle', selected : false},
        {id : 1, name : 'Fashion', selected : false},
        {id : 2, name : 'Beauty', selected : false},
        {id : 3, name : 'Comendy', selected : false},
        {id : 4, name : 'Art & Photography', selected : false},
        {id : 5, name : 'Music & Dance', selected : false},
        {id : 6, name : 'Animals & Pets', selected : false},
        {id : 7, name : 'Education', selected : false},
        {id : 8, name : 'Gaming', selected : false},
        {id : 9, name : 'Automobiles', selected : false},
        {id : 10, name : 'Vlogger', selected : false},
    ]
    return arr[index].name;
}

export const getFieldBaseUrl = (index) => {
    const socialMedia = {0 : "https://www.instagram.com", 1 : "https://www.youtube.com",}
    return socialMedia[index];
}
