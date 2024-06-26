import React from "react";
import "./homefaq.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AccordionSummary, Accordion, AccordionDetails } from "@mui/material";

const HomeFAQ = () => {
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
    </div>
  );
};

export default HomeFAQ;

const faqArray = [
    {
        question : "What is influencer marketing?",
        answer : "Influencer marketing is a digital marketing strategy that involves collaborating with individuals, known as influencers, who have a dedicated and engaged following on social media platforms and other online channels. These influencers can impact their followers' purchasing decisions due to their credibility and authority in specific niches or industries. Brands partner with influencers to promote their products or services authentically, build social proof, and leverage their influence to reach a larger and more targeted audience."
    },
    {
        question : "How Does Influencer Marketing Work?",
        answer : "Influencer marketing operates by identifying suitable influencers for your brand, establishing a partnership, and creating and distributing content through the influencer's channels. This content can take various forms, including sponsored posts, reviews, tutorials, or endorsements. The influencer shares this content with their audience, effectively introducing your brand or product to a potentially receptive and engaged audience. The key to successful influencer marketing lies in crafting authentic and relevant content that resonates with both the influencer's followers and your brand's message."
    },
    {
        question : "Why is Influencer Marketing Important?",
        answer : "Influencer marketing is important because it enables brands to connect with their target audience in a more genuine and engaging manner. Unlike traditional advertising, influencer marketing feels less intrusive and more trustworthy, as recommendations come from a trusted source. It helps build brand awareness, improve credibility, drive traffic, boost sales, and foster lasting customer relationships."
    },
    {
        question : "How Can I Find the Right Influencers for My Brand?",
        answer : "Start by identifying your target audience and the platforms they use. Then, use the Collabstr influencer marketing tool to search for influencers within your niche. Use the gender, price, location, and other filters to narrow down relevant influencers as much as possible. Once you find an influencer that you’re interested in working with, you can simply purchase one of their pre-defined content packages, or send them a custom offer directly through their profile.",
    },
    {
        question : "What Are the Benefits of Influencer Marketing for My brand?",
        answer : "Influencer marketing helps expand your brand's reach, build trust and credibility through social proof, drive conversions, and can be more cost-effective than some traditional marketing methods. Additionally, influencer marketing allows you to tap into highly targeted and engaged audiences that may be challenging to reach through other means. All in all, there are numerous benefits to influencer marketing that can be hard to achieve through other marketing channels."
    }
]
