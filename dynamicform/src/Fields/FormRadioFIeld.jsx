import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
function FormRadioField({field,errors,formValues,handleChange,name}){
    return(
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
    )
}
export default FormRadioField;