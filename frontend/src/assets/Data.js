import { FaInstagram, FaYoutube, FaTwitter, FaFacebook  } from "react-icons/fa";

export const iconsArr = [<FaInstagram />, <FaYoutube />, <FaFacebook />, <FaTwitter />]
export const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}


 export const s3Domain = 'https://signedayush.s3.ap-south-1.amazonaws.com';
// export const s3Domain = 'https://thousand-ways.s3.ap-south-1.amazonaws.com';

export const BACKEND_URL = 'https://eazzycollab.com';


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
        'Art',
        'Photography',
        'Music',
        'Dance',
        'Pets',
        'Entertainment',
        'Tech',
        'Automobiles',
        'Vlogs',
        'Gaming',
        'Education',
        'Fitness',
        'Sports',
        'Makeup',
        "Books",
        "Travel",
        "Food",
        "Finance"
    ]
    if(index===-1)
    {
        return arr;
    }
    else{
        return arr[index];
    }
   
}

// for comparing two object of display data url
export function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
  
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }
  
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
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

export const FaqArrayForInfluencer = [
    {
        question: 'How does EazzyCollab operate?',
        answer: 'Think of it as opening your own little shop on Instagram and YouTube. Share your special link in your bio and social media. Brands will come knocking, ready to buy your amazing services, and you’ll handle everything like a boss and get paid through our platform.'
    },
    {
        question: 'How do I receive payments?',
        answer: 'We’ve got you covered! Payments go through our site using something cool called RazorPay. Finish the work , get paid , relax'
    },
    {
        question: 'What are the costs involved?',
        answer: 'Absolutely nothing upfront! We only take a 15% cut when you make a sale. '
    },
    {
        question: 'Is my payment secure?',
        answer: 'You bet! We hold onto the payment from the buyer until you’ve done your thing. This way, everyone’s happy and no one’s getting scammed.'
    },
    {
        question: 'Can I decline orders?',
        answer: 'Totally! You’re the boss here. You can accept or decline orders as you see fit. Only work with brands that make you go “heck yes!”'
    },
    {
        question: 'Where can I showcase my services?',
        answer: 'Right now, we’re all about Instagram and YouTube. So go ahead, show the world what you’ve got on these platforms!'
    },
    {
        question: 'Is EazzyCollab an agency?',
        answer: 'Nope! Agencies are boring. We’re more like your backstage crew, giving you the platform to showcase your services and manage your own brand deals.'
    },
    {
        question: 'Are there any binding contracts?',
        answer: 'No way! There are no binding contracts here. You’re free to manage your own deals without us meddling. We just provide the stage for you to shine.'
    },
];


export const FaqArrayForBrands = [
    {
        question: 'How does EazzyCollab work?',
        answer: 'EazzyCollab enables brands to discover and collaborate with influencers on Instagram, TikTok, and YouTube. Brands can search through a curated selection of influencers, securely purchase their services, and receive high-quality content directly through the platform.'
    },
    {
        question: 'What is EazzyCollab?',
        answer: 'EazzyCollab is a marketplace connecting brands with influencers. It provides a platform for brands to find, vet, and collaborate with influencers across various social media platforms such as Instagram, TikTok, and YouTube.'
    },
    {
        question: 'How are influencers vetted before joining EazzyCollab?',
        answer: 'Each influencer listed on EazzyCollab undergoes a thorough vetting process. This includes identity verification and a comprehensive audit of their social media presence to ensure authenticity and engagement.'
    },
    {
        question: 'How to ship something to the creator?',
        answer: 'You chat with the infuencer and decide '
    },
    {
        question: 'How do I send custom offers?',
        answer: "If you have a specific requirements that don't fit existing packages, they can send custom offers to influencers. This feature allows brands to tailor collaborations according to their unique needs."
    },
    {
        question: 'How long does an influencer have to accept my order?',
        answer: 'Influencers have 48 hours to accept new orders before they expire. This ensures timely response and allows brands to proceed with collaborations efficiently.'
    },
    {
        question: 'What if an influencer declines my order?',
        answer: 'Brands are not charged until an influencer accepts their order. If an order is declined or remains unanswered for 48 hours, no action is required from the brand, and any payment is fully refunded.'
    },
    {
        question: 'How do I know I will receive the work I paid for?',
        answer: 'EazzyCollab holds payments until the work is completed and approved by the brand. Brands have up to 48 hours after the work is submitted to request revisions or raise any concerns.'
    },
    {
        question: 'What types of payment do you accept?',
        answer: 'EazzyCollab utilizes RazorPay as its payment processor, allowing brands to pay using major credit and debit cards, as well as popular UPI methods.'
    },
];
