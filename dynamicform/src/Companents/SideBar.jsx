import React from "react"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import InputForm from "./Input"
import DropDownForm from "./DropDown"
import CheckboxFieldSettings from "./ChackBox"
import RadioFieldSettings from "./Radio"

function SideBar({ value, setValue, data, setData, editIndex, setEditIndex, editField }) {
  return (
    <Sheet
      open={!!value}
      onOpenChange={(open) => {
        if (!open) setValue("") // close the sheet
      }}
    >
      <SheetContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {
          ["text", "password", "email","number"].includes(value) && (<InputForm key={editIndex ?? "new"} setData={setData} editIndex={editIndex} setEditIndex={setEditIndex} editField={editField}/>)
          }
          {
              value=='dropdown' && <DropDownForm key={editIndex ?? "new"} data={data} setData={setData} value={value} editIndex={editIndex} editField={editField}/>
          }
          {
              value=='checkbox' && <CheckboxFieldSettings key={editIndex ?? "new"} data={data} setData={setData} value={value} editIndex={editIndex} editField={editField}/>
          }
          {
              value=='radio' && <RadioFieldSettings key={editIndex ?? "new"} data={data} setData={setData} value={value} editIndex={editIndex} editField={editField}/>
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default SideBar
