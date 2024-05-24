import { FaInstagram, FaYoutube, FaTwitter, FaFacebook  } from "react-icons/fa";

export const iconsArr = [<FaInstagram />, <FaYoutube />, <FaFacebook />, <FaTwitter />]
export const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}


// export const s3Domain = 'https://signedayush.s3.ap-south-1.amazonaws.com';
export const s3Domain = 'https://thousand-ways.s3.ap-south-1.amazonaws.com';

export const BACKEND_URL = 'http://localhost:3000';


export const getIcons = (index ) => {
    return iconsArr[index];
}

export const getSociaIndex = (index) => {
    return socialMedia[index];
}  

export const getCategory = (index) => {

    const arr = [
        'Lifestyle',
        'Fashion',
        'Beauty',
        'Comendy',
        'Art & Photography',
        'Music & Dance',
        'Animals & Pets',
        'Education',
        'Gaming',
        'Automobiles',
        'Vlogger',
    ]
    if(index===-1)
    {
        return arr;
    }
    else{
        return arr[index];
    }
   
}

export const getFieldBaseUrl = (index) => {
    const socialMedia = {0 : "https://www.instagram.com", 1 : "https://www.youtube.com",}
    return socialMedia[index];
}

export const getDateFormatted = (value) => {
    if(!value) {
        return "";
    }
    const date = new Date(value);
    // Define an array to hold the names of the days
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Define an array to hold the names of the months
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get the day of the week (0-6)
    var dayOfWeek = date.getDay();

    // Get the day of the month (1-31)
    var dayOfMonth = date.getDate();

    // Get the month (0-11)
    var month = date.getMonth();

    // Format the date string
    var dateString = days[dayOfWeek] + ', ' + dayOfMonth + getSuffix(dayOfMonth) + ' ' + months[month];

    return dateString;
}

// Function to get the suffix for the day of the month (e.g., 'st', 'nd', 'rd', 'th')
function getSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export const formatFollowers = (value) => {
    if(!value) return "";
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    } else {
        return value.toString();
    }
}
