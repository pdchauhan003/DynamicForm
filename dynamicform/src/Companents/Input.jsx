import React, { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

function InputForm({ setData,editIndex,setEditIndex,editField }) {
  const [label, setLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [requireds,setrequireds]=useState(false)

  useEffect(() => {
  if (editField) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(editField.label || "");
    setSelectedValue(editField.type || "");
    setPlaceholder(editField.placeholder || "");
    setrequireds(editField.requireds || false);
  }
  }, [editField]);
  
  const handleClick = (e) => {   // when click save to changes then trigger this function
    e.preventDefault();
    alert('save changes')
    const updatedField = {
      type: selectedValue,
      placeholder,
      label,
      requireds:requireds
    };
    setData(prev => {                   // when clange then updat this part
      const updated = [...prev];
      if (editIndex !== null) {         // when select card to update then editindex shows index of specific card 
        updated[editIndex] = updatedField; 
      } else {
        updated.push(updatedField);     
      }
      return updated;
    });
    setLabel("");
    setPlaceholder("");
    setrequireds(false);
    setEditIndex(null)
  };
  return (
    <>
    <div className="p-1">
      <Card className="max-w-xl mx-auto rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Field Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <>
            <Separator />
            <div className="space-y-2">
              <Label>Field Label</Label>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Input Type</Label>
              <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Placeholder Text</Label>
              <Input
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>

            {/* requireds Switch */}
            <div className="flex items-center gap-3">
              <Switch checked={requireds} onCheckedChange={setrequireds} />
              <Label>requireds Field</Label>
            </div>
          </>
        </CardContent>
        <Button className='justify-center' onClick={handleClick}>Save changes</Button> 
      </Card>
      </div>
    </>
  );
}
export default InputForm;
