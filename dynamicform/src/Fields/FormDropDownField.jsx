import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function FormDropDownField({field,errors,formValues,handleChange,name}){
    return(
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
    )   
}
export default FormDropDownField;