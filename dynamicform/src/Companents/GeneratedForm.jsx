import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"
import Home from "./Home";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormCheckBox from "@/Fields/FormCheckBox";
import FormRadioField from "@/Fields/FormRadioFIeld";
import FormDropDownField from "@/Fields/FormDropDownField";
import FormInputField from "@/Fields/FormInputField";

function GeneratedForm() {

  const [pageHome, setPageHome] = useState(false); // use to Home page redirect
  const [formValues, setFormValues] = useState({}); // use to store form values
  const [submittedData, setSubmittedData] = useState(null); // after submit shows form filled data
  const [errors, setErrors] = useState({}); // if requireds and not insert then store value in this array
  const stored = localStorage.getItem("formData"); // fetch items from localstorage
  const data = stored ? JSON.parse(stored) : null; // data parse because localstorage data is in string
  if (!data) return <p>No form data found</p>;

  const { formname, description, fields = [] } = data;

  // when form data is inserted then that time formValues is change
  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    //when required show then that field fill any data then removed red border and required field text
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // checkbox
  const handleCheckboxChange = (name, option, checked) => {
    setFormValues((prev) => {
      const current = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...current, option] };
      } else {
        return {
          ...prev,
          [name]: current.filter((it) => it !== option),
        };
      }
    });
  };


  const handleSubmit = () => {
    const newErrors = {};

    fields.forEach((field, index) => {
      const name = field.label || `field_${index}`;
      const value = formValues[name];

      if (field.requireds) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[name] = `${field.label} is requireds`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmittedData(formValues);
  };

  if (pageHome) {
    return <Home />;
  }

  //  after submit click
  if (submittedData) {
    return (
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-5">Submitted Data</h2>

        <Card className="p-5">
          {Object.entries(submittedData).map(([key, value]) => (
            <div key={key} className="mb-3">
              <strong>{key} : </strong>
              {Array.isArray(value) ? value.join(",") : value}{" "}
              {/*if value is array then join otherwise simple value shows*/}
            </div>
          ))}
        </Card>

        <Button className="mt-4" onClick={() => setSubmittedData(null)}>
          Fill Again
        </Button>
      </div>
    );
  }

  return (
    <>
      
      {/* when this click then gi back Home Page */}
        <Button  variant="ghost"  size="icon" onClick={() => setPageHome(true)} className=" fixed m-2 p-0 h-auto w-auto hover:bg-transparent">
          <ArrowLeft className="h-5 w-5" />
        </Button>

      <Card className="border-4 m-10">
        <CardHeader className="text-center font-bold">
          <CardTitle className='text-4xl font-bold'>{formname}</CardTitle>
          <CardDescription className='text-xl'>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          {fields.map((field, index) => {
            const name = field.label || `field_${index}`;

            return (
              <div key={index} className="my-5">
                <Label>{field.label}</Label>

                {/* texts  */}
                {
                (field.type === "text" ||
                  field.type === "password" ||
                  field.type === "email") && (
                      <>
                        <FormInputField field={field} name={name} errors={errors} formValues={formValues} handleChange={handleChange}/>
                      </>
                  )
                }

                {/* Dropdown */}
                {field.type === "dropdown" && (
                  <>
                    <FormDropDownField field={field} name={name} errors={errors} formValues={formValues} handleChange={handleChange}/>
                  </>
                )}

                  {/* Radio */}
                {field.type === "radio" && (
                  <>
                  <FormRadioField field={field} name={name} errors={errors} formValues={formValues} handleChange={handleChange}/>
                  </>
                )}

                {/* Checkbox */}
                {field.type === "checkbox" && (
                  <>
                    <FormCheckBox field={field} name={name} errors={errors} formValues={formValues} handleCheckboxChange={handleCheckboxChange}/>
                  </>
                )}

              </div>
            );
          })}
          <Button className="w-full mt-6" onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
export default GeneratedForm;
