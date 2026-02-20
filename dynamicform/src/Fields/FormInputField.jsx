import { Input } from "@/components/ui/input";

function FormInputField({ field, formValues, handleChange, errors, name }) {
  return (
    <>
      <Input
        type={field.type}
        placeholder={field.placeholder}
        value={formValues[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        className={
          errors[name] ? "border-red-500 focus-visible:ring-red-500" : ""
        }
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </>
  );
}
export default FormInputField;
