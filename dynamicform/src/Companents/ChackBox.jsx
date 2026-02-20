import { useEffect,useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
export default function CheckboxFieldSettings({ value,setData, editIndex,editField }) {
  // const type = value;
  const [label, setLabel] = useState("");
  const [requireds, setrequireds] = useState(false);
  const [options, setOptions] = useState([
    { label: "Option 1", checked: false },
    { label: "Option 2", checked: false },
  ]);

  useEffect(() => {
  if (editField) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(editField.label || "");
    setrequireds(editField.requireds || false);
    setOptions(editField.options || []);
  }
}, [editField]);

  const addOption = () => {
    setOptions([
      ...options,
      { label: `Option ${options.length + 1}`, checked: false },
    ]);
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index].label = value;
    setOptions(updated);
  };

  const toggleDefault = (index, value) => {
    const updated = [...options];
    updated[index].checked = value;
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

  setData(prev => {
    const updated = [...prev];
    
    if (editIndex !== null) {
      updated[editIndex] = updatedField;
    } else {  // when card is select to update then push with updated data 
      updated.push(updatedField);
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
            <Separator />
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
                <Label className="text-base">Checkbox Options</Label>

                <Button className='' variant="outline" size="sm" onClick={addOption}>
                  Add Option
                </Button>
              </div>

              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Checkbox
                    checked={option.checked}
                    onCheckedChange={(v) => toggleDefault(index, !!v)}
                  />

                  <Input
                    value={option.label}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />

                  <button
                    onClick={() => removeOption(index)}
                    className="text-gray-500 hover:text-red-500 text-lg px-2"
                  >
                    Delete
                  </button>
                </div>
              ))}

              <p className="text-sm text-muted-foreground">
                Check options that should be selected by default
              </p>
            </div>
          </CardContent>
          <Button className='justify-center mx-5' onClick={handleClick}>Save changes</Button>
        </Card>
      </div>
    </>
  );
}
