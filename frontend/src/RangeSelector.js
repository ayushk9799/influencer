
import { Slider } from "@mui/material"
import { useState } from "react";
import './RangeSelector.css';
import { StyledEngineProvider } from '@mui/material/styles';

export const RangeSelector=({sendData})=>
{

    const [value,setValue]=useState([0,100])
    const marks = [
        {
          value: 0,
         
        },
        {
          value: 10,
          
        },
        {
          value: 25,
        
        },
        {
          value: 45,
          
        },
        {
          value: 60,
          
        },
        {
          value: 75,
          
        },
        {
          value: 100,
        },
    
      ];  
      const valueLabelFormat=(v)=>
      {
        switch(v)
        {
            case 0:
                return 0;
            case 10:
                return `1K`;
                break;
            case 25:
                return '10K';
                break;
            case 45:
                return '50K'
            case 60:
                return '100K';
            case 75:
                return '500K';
            case 100:
                return '1M+';
            default:
              return
        }
        
      }
      const handleChange=(event,newValue,activeThumb)=>
    {
       if(activeThumb===0)
       {
        if(newValue[0]!==value[1])
        {
            setValue(newValue);
            console.log(valueLabelFormat(newValue[0]))

            sendData([valueLabelFormat(newValue[0]),valueLabelFormat(newValue[1])]);

        }
       }
       else{
        if(newValue[1]!==value[0])
        {
            setValue(newValue);
            console.log(valueLabelFormat(newValue[0]))
            sendData([valueLabelFormat(newValue[0]),valueLabelFormat(newValue[1])]);

        }
       }

    }
    return<>
     <StyledEngineProvider injectFirst>
     <Slider
        getAriaLabel={() => 'Follower Range'}
        value={value}
        onChange={handleChange}
        step={null}
        marks={marks}
        // valueLabelFormat={valueLabelFormat}

        disableSwap
      />
 </StyledEngineProvider>
  
    </>
}