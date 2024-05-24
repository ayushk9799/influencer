import React, { useEffect, useState } from "react";
import "./page4.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateFormData } from "../../redux/FormSlice";
import FormHeader from "../subcomponents/FormHeader";
import { getCategory } from "../../assets/Data.js";
const Page4 = () => {
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector((state) => state.form);
  const [categories, setCategories] = useState(new Set());

  useEffect(() => {
    const data = formData["field"];
    if (data) {
      const s = new Set([...data]);
      setCategories(s);
    }
  }, [formData]);

  const handler = (index) => {
    const s = new Set(categories);
    if (s.has(index)) {
      s.delete(index);
    } else {
      s.add(index);
    }
    setCategories(s);
  };

  const handlerSubmit = () => {
    dispatch(updateFormData({ field: Array.from(categories) }));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <div className="containery">
      <FormHeader heading={"Your content categories"} />
      <p>Select categories that match with your content.</p>
      <div className="button-container">
        {getCategory(-1).map((value, index) => (
          <Button
            key={index}
            sx={{ m: 0.5 }}
            onClick={() => handler(index)}
            variant={categories.has(index) ? "contained" : "outlined"}
          >
            {value}
          </Button>
        ))}
      </div>
      <button onClick={handlerSubmit} className="button-submit">
        Continue
      </button>
    </div>
  );
};

export default Page4;
