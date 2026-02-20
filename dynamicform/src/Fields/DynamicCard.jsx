import { Input } from "@/components/ui/input";
export const dropdownComponent = (field) => {
  return (
    <>
      {field.type === "text" && (
        <Input
          placeholder={field.placeholder || "Your answer"}
          required={field.requireds}
          disabled
        />
      )}

      {field.type === "password" && (
        <Input
          type="password"
          required={field.requireds}
          placeholder={field.placeholder}
          disabled
        />
      )}

      {field.type === "email" && (
        <Input
          type="email"
          required={field.requireds}
          placeholder={field.placeholder}
          disabled
        />
      )}

      {field.type === "dropdown" && (
        <select
          className="border rounded p-2 w-full"
          required={field.requireds}
          disabled
        >
          <option>Select option</option>
          {field.options?.map((i, index) => (
            <option key={index}>{typeof i === "string" ? i : i.label}</option>
          ))}
        </select>

        //  dropdownComponent(field)
      )}
      {field.type == "checkbox" &&
        field.options?.map((i, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="checkbox" required={field.requireds} disabled />
            <span>{typeof i === "string" ? i : i.label}</span>
          </div>
        ))}
      {field.type == "radio" &&
        field.options?.map((i, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.label}
              required={field.requireds}
              disabled
            />
            <span>{typeof i === "string" ? i : i.label}</span>
          </div>
        ))}
    </>
  );
};
