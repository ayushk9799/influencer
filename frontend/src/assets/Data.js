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
        'Makeup'
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

export const FaqArrayForInfluencer = [
    {
        question : 'How does EazzyCollab works?',
        answer : 'Create your personal page and list your services for Instagram, and YouTube. Then, share your custom link in your bio and social media. Brands can now discover you and purchase your services, and you can easily manage brand deals and get paid for your work directly through the platform.'
    },
    {
        question : 'How do I get paid?',
        answer : 'Payments are made directly through our website. We use Dots to pay you out. Once you complete an order, you will be able to choose from over 5 methods including PayPal, CashApp or Venmo to receive your money.'
    },
    {
        question : 'How much does it cost?',
        answer : 'There is no up-front cost. We take a 15% transaction fee when you make a sale.'
    },
    {
        question : 'Is my payment guaranteed?',
        answer : 'Yes, we collect the payment from the buyer and hold it until the order is complete. This ensures that both sides are protected during every transaction.'
    },
    {
        question : 'Can I decline orders?',
        answer : 'Yes, you are able to accept or decline an order. This gives you the freedom to only work with brands that align with you.'
    },
    {
        question : 'What platforms does EassyCollab support?',
        answer : 'Currently you can list your services for Instagram and Youtube.'
    },
    {
        question : 'Are you an agency?',
        answer : 'No, we are not an agency. We are a platform for you to advertise your services, and manage your own brand deals.'
    },
    {
        question : 'Are there binding contracts?',
        answer : 'No, we do not ask you to sign any contracts. We are a self-serve platform, you are free to manage your own deals without our involvement. We simply provide the platform for you to advertise your services to brands.'
    },
]

export const FaqArrayForBrands = [
    {
        question : 'How does EazzyCollab work?',
        answer : 'Start by searching through thousands of vetted Instagram, TikTok, and YouTube influencers. Once you find the influencers you want to work with, safely purchase their services through Collabstr. We hold your payment until the work is completed. Once the work is completed, receive your high-quality content from the influencers directly through the platform.'
    },
    {
        question : 'What is EazzyCollab?',
        answer : 'Collabstr is a marketplace to find and hire influencers on Instagram, TikTok, and YouTube. You can easily search through thousands of content creators and pay them directly through Collabstr.'
    },
    {
        question : 'How are influencers vetted before joining Collabstr?',
        answer : 'We verify the identity of each influencer that is listed on the platform. We also do a full audit of their social media to look for signs of fake followers & engagement. We also take into consideration their previous brand deals.'
    },
    {
        question : 'How does shipping work?',
        answer : 'Once you place an order, the influencer will send you their shipping info through the chat. You can then use your preferred shipping carrier to send them the product.'
    },
    {
        question : 'How do I send custom offers?',
        answer : `If you have a request that doesn't fit an influencers existing packages you can send them a custom offer. To do this, click the "Send custom offer" button on the influencers profile and follow the steps.`
    },
    {
        question : 'How long does an influencer have to accept my order?',
        answer : 'Influencers are given 72 hours to accept new orders before they automatically expire.'
    },
    {
        question : 'What if an influencer declines my order?',
        answer : 'We do not charge you until an influencer accepts your order. So if your order gets declined no action is required from you.'
    },
    {
        question : 'How do I know I will receive the work I paid for?',
        answer : 'Collabstr holds your money until the work is completed and approved by you. You will have up to 48 hours once the work has been submitted to ask for a revision or open a dispute with Collabstr.'
    },
    {
        question : 'What types of payment do you accept?',
        answer : 'We use Stripe as our payment processor, this allows us to accept all major credit & debit cards.'
    },
]
