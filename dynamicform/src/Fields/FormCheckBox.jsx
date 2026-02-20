import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

function FormCheckBox({
  field,
  name,
  errors,
  formValues,
  handleCheckboxChange,
}) {
  return (
    <>
      <FieldSet
        className={errors[name] ? "border border-red-500 p-2 rounded-md" : ""}
      >
        <FieldGroup className="gap-3">
          {field.options?.map((opt, i) => {
            const value = typeof opt === "object" ? opt.label : opt;
            const id = `${name}-${i}`;

            return (
              <Field key={i} orientation="horizontal">
                <Checkbox
                  id={id}
                  checked={(formValues[name] || []).includes(value)}
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
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </>
  );
}
export default FormCheckBox;
