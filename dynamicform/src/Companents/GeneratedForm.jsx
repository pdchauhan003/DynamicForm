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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


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
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formValues[name] || ""}
                      onChange={(e) => handleChange(name, e.target.value)}
                      className={errors[name] ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors[name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[name]}
                      </p>
                    )}

                    
                  </>
                )
                }
                {/* Dropdown */}
                {field.type === "dropdown" && (
                  <>
                    <Select
                      value={formValues[name] || ""}
                      onValueChange={(value) => handleChange(name, value)}
                    >
                      <SelectTrigger className={`w-full ${errors[name] ? "border-red-500 focus:ring-red-500" : ""}`}>
                        <SelectValue placeholder={`Select ${field.label}`} />
                      </SelectTrigger>

                      <SelectContent>
                        {field.options?.map((opt, i) => {
                          const value =
                            typeof opt === "object" ? opt.label : opt;
                          return (
                            <SelectItem key={i} value={value}>
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    {errors[name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[name]}
                      </p>
                    )}
                  </>
                )}

                  {/* Radio */}
                {field.type === "radio" && (
                  <>
                  <div className={`p-2 rounded-md ${errors[name] ? "border border-red-500" : ""}`}>
                    <RadioGroup value={formValues[name] || ""} onValueChange={value => handleChange(name, value)}>
                      {field.options?.map((opt, i) => {
                        const value =
                          typeof opt === "object" ? opt.label : opt;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <RadioGroupItem value={value} id={i} />
                            <Label htmlFor={i}>{value}</Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                  {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                  )}
                  </>
                )}


                {/* Checkbox */}
                {field.type === "checkbox" && (
                  <>
                    <FieldSet className={errors[name] ? "border border-red-500 p-2 rounded-md" : ""}>
                      <FieldGroup className="gap-3">
                        {field.options?.map((opt, i) => {
                          const value =
                            typeof opt === "object" ? opt.label : opt;
                          const id = `${name}-${i}`; // unique id

                          return (
                            <Field key={i} orientation="horizontal">
                              <Checkbox
                                id={id}
                                checked={(formValues[name] || []).includes(
                                  value,
                                )}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(name, value, checked)
                                }
                              />
                              <FieldLabel htmlFor={id}>{value}</FieldLabel>
                            </Field>
                          );
                        })}
                      </FieldGroup>
                    </FieldSet>

                    {errors[name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[name]}
                      </p>
                    )}
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
