import React, { useEffect } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AccordionSummary, Accordion, AccordionDetails} from '@mui/material'
import "./faq.css"
import { FaqArrayForBrands, FaqArrayForInfluencer } from '../assets/Data';


const FAQ = () => {
  useEffect(()=> {
    window.scrollTo(0,50);
  }, []);
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
      <div className='faq-container'>
        <h2 style={{margin : '10px 0px'}}>For Influencer</h2>
        {FaqArrayForInfluencer && FaqArrayForInfluencer.map((value, index) => (
            <Accordion style={{marginBottom : '15px'}} key={index}>
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
      <div className='faq-container'>
        <h2 style={{margin : '10px 0px'}}>For Brands</h2>
        {FaqArrayForBrands && FaqArrayForBrands.map((value, index) => (
            <Accordion style={{marginBottom : '15px'}} key={index}>
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
  )
}

export default FAQ