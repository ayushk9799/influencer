import React, {useEffect, useState} from 'react'
import './page4.css'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
import FormHeader from '../subcomponents/FormHeader';

const Page4 = () => {
    const dispatch = useDispatch();
    const {formData, currentStep} = useSelector(state => state.form);
    const [categories, setCategories] = useState(new Set());
    const [categoryArray, setCategoryArray] = useState([
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
    ])

    useEffect(()=> {
        const data = formData['categories'];
        if(data) { 
            const s = new Set([...data]);
            setCategories(s);
            const temp = [...categoryArray]
            data.forEach((element) => {
                temp[element].selected = true;
            });
            setCategoryArray(temp);
        }
    }, [formData])

    const handler = (index) => {
        const s = new Set(categories);
        if(categories.has(index)) {
            s.delete(index);
        } else {
            s.add(index);
        }
        setCategories(s);
        const values = [...categoryArray];
        values[index].selected = !values[index].selected;
        setCategoryArray(values); 
    }

    const handlerSubmit = () => {
        dispatch(updateFormData({categories : Array.from(categories)}));
        dispatch(setCurrentStep(currentStep+1));
    }
  
  return (
    <div className='containery'>
        {/* <h1 className='header1'>Select the Category that match your content</h1> */}
        <FormHeader heading={'Your content categories'} />
        <p>Select categories that match with your content.</p>
        <div className='button-container'>
           { categoryArray.map((value, index) => (
             <Button key={value.id} sx={{m : 0.5}} onClick={() => handler(index)}  variant={value.selected ? 'contained' : 'outlined'}>{value.name}</Button>
           ))}
        </div>
        <button onClick={handlerSubmit} className='button-submit' >Continue</button>
    </div>
  )
}

export default Page4