import React, { useEffect, useState } from "react";
import "./Categories.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateFormData } from "../../redux/FormSlice.js";
import FormHeader from "../subcomponents/FormHeader.js";
import { getCategory } from "../../assets/Data.js";
const Categories = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state) => state.form);
  const { userDetails } = useSelector((state) => state.user);
  const [categories, setCategories] = useState(new Set());

  useEffect(() => {
    const data = userDetails?.field;
    if (data) {
      const s = new Set([...data]);
      setCategories(s);
    }
  }, [userDetails]);

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
            style={{ textTransform: "capitalize" }}
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

export default Categories;
