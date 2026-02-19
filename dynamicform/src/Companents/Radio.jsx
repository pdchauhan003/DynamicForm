import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioFieldSettings({setData, value, editIndex}) {
  // const type = value;
  // const [requireds, setrequireds] = useState(false);
  const [label, setLabel] = useState("");
  const [requireds,setrequireds]=useState(false)
  const [options, setOptions] = useState([
    { label: "Option 1", selected: true },
    { label: "Option 2", selected: false },
  ]);

  const addOption = () => {
    setOptions([
      ...options,
      { label: `Option ${options.length + 1}`, selected: false },
    ]);
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index].label = value;
    setOptions(updated);
  };

  const selectDefault = (index) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      selected: i === index,
    }));
    setOptions(updated);
  };

  const removeOption = (index) => {
    setOptions(options.filter((x, i) => i !== index));
  };


  const handleClick = () => {
    alert('save changes')
  const updatedField = {
    type: value,
    options:options,
    label:label,
    requireds:requireds
  };

  setData(prev => {
    const updated = [...prev];

    if (editIndex !== null) {
      updated[editIndex] = updatedField;
    } else {
      updated.push(updatedField);
    }

    return updated;
  });
};

  return (
    <>
      <div className="p-6">
        <Card className="max-w-xl mx-auto rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Field Settings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Field Label */}
            <div className="space-y-2">
              <Label>Field Label</Label>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>

            {/* requireds */}
            <div className="flex items-center gap-3">
              <Switch checked={requireds} onCheckedChange={setrequireds} />
              <Label>requireds Field</Label>
            </div>

            {/* Options */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label className="text-base">Radio Button Options</Label>
                <Button variant="outline" size="sm" onClick={addOption}>
                  Add Option
                </Button>
              </div>

              <RadioGroup>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <RadioGroupItem
                      checked={option.selected}
                      onClick={() => selectDefault(index)}
                    />

                    <Input
                      value={option.label}
                      onChange={(e) => updateOption(index, e.target.value)}/>
                      {/* when insert data then update its labeled value */}

                    <button onClick={() => removeOption(index)} className="text-gray-500 hover:text-red-500 text-lg px-2">
                      Delete   {/* when click then delete fieldd */}
                    </button>

                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        <Button onClick={handleClick}>Save changes</Button>
      </div>
    </>
  );
}
