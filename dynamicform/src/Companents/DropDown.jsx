import React, { useEffect,useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
function DropDownForm({ value, setData, editIndex, editField }) {
  // const type = value;
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [requireds, setrequireds] = useState(false);

  useEffect(() => {
  if (editField) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(editField.label || "");
    setOptions(editField.options || ["Option 1"]);
    setrequireds(editField.requireds || false);
  }
}, [editField]);

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const updateOption = (index, value) => {    // change the options value
    const updated = [...options];
    updated[index] = value;     
    setOptions(updated);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    alert('save changes')
    const updatedField = {
      type: value,
      options:options,
      label:label,
      requireds:requireds
    };
    setData((prev) => {
      const updated = [...prev];
      if (editIndex !== null) {
        updated[editIndex] = updatedField;
      } else {
        updated.push(updatedField); // when card selected to update then push updated data
      }
      return updated;       
    });
  };

  return (
    <>
    <div className="p-1">
      <Card className="max-w-xl mx-auto rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Field Settings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator/>
          {/* Field Label */}
          <div className="space-y-2">
            <Label>Field Label</Label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>

          {/* requireds Switch */}
          <div className="flex items-center gap-3">
            <Switch checked={requireds} onCheckedChange={setrequireds} />
            <Label>requireds Field</Label>
          </div>

          {/* Dropdown Options */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label className="text-base">Dropdown Options</Label>

              <Button variant="outline" size="sm" onClick={addOption}>
                Add Option
              </Button>
            </div>

            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* radio style circle */}
                <div className="w-5 h-5 rounded-full border-2" />

                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />

                {/* delete button */}
                <button
                  onClick={() => removeOption(index)}
                  className="text-gray-500 hover:text-red-500 text-lg px-2"
                >
                  Delete
                </button>
              </div>
            ))}

            <p className="text-sm text-muted-foreground">
              Select one option as default
            </p>
          </div>
        </CardContent>
        <Button className='justify-center mx-5' onClick={handleClick}>Save changes</Button>
      </Card>
      </div>
    </>
  );
}
export default DropDownForm;
