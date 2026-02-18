import React from "react"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import InputForm from "./Input"
import DropDownForm from "./DropDown"
import CheckboxFieldSettings from "./ChackBox"
import RadioFieldSettings from "./Radio"

function SideBar({ value, setValue, data, setData, editIndex }) {
  return (
    <Sheet
      open={!!value}
      onOpenChange={(open) => {
        if (!open) setValue("") // close the sheet
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Field Settings</SheetTitle>
        </SheetHeader>
        {
            value=='text' && <InputForm data={data} setData={setData} editIndex={editIndex}/>
        }
        {
            value=='dropdown' && <DropDownForm data={data} setData={setData} value={value} editIndex={editIndex}/>
        }
        {
            value=='checkbox' && <CheckboxFieldSettings data={data} setData={setData} value={value} editIndex={editIndex}/>
        }
        {
            value=='radio' && <RadioFieldSettings data={data} setData={setData} value={value} editIndex={editIndex}/>
        }
        <SheetFooter className="mt-6">
          <p>hehee</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default SideBar
