import React from "react";
import "./homefaq.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AccordionSummary, Accordion, AccordionDetails } from "@mui/material";
import { useNavigateCustom } from "../../CustomNavigate";

const HomeFAQ = () => {

  const navigate=useNavigateCustom();
  return (
    <div id="homefaq-container">
        <h1>Frequently asked questions?</h1>
      <div style={{marginTop:'15px'}}>
        {faqArray &&
          faqArray.map((value, index) => (
            <Accordion style={{ marginBottom: "20px" }} key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h4>{value.question}</h4>
              </AccordionSummary>
              <AccordionDetails>
                <p>{value.answer}</p>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
      <div className="detailedFaq" onClick={(event)=>{event.stopPropagation();navigate('/faq')}}>Detailed Faq</div>

    </div>
  );
};

export default HomeFAQ;

 const faqArray = [
  {
    question: "What’s influencer marketing?",
    answer: "It’s when brands team up with popular social media creators to promote their stuff. Think of it as getting a cool kid to tell everyone how awesome your product is!"
},
{
    question: "How does influencer marketing work?",
    answer: "Find the right influencers, make a deal, and let them post about your product. It’s like word-of-mouth, but on steroids!"
},
{
    question: "Why bother with influencer marketing?",
    answer: "People trust their favorite influencers more than ads. It’s a great way to get noticed, build trust, and sell more stuff without being pushy."
},
{
    question: "How do I find the perfect influencer?",
    answer: "Know your audience, find out where they hang out online, and use tools like EazzyCollab to match with influencers in your niche. Swipe right on the ones you like!"
},
{
    question: "What’s in it for my brand?",
    answer: "You get more reach, trust, and sales for less money than traditional ads. Plus, you’ll connect with a super-engaged audience. Win-win!"
}
];
