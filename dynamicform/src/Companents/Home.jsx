import React, {useEffect,useState,useRef} from "react";
// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import SideBar from "./SideBar";
import GeneratedForm from "./GeneratedForm";
import {
  Card,
  CardContent,
} from "@/components/ui/card"


function Home() {
  //  const storedForm = getStoredForm();
  const [selected, setSelected] = useState("");
  const [formName, setFormName] = useState('');   
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([]);     // store all field name
  const [pageView, setPageView] = useState(false);    // to show page content
  const [generate,setGenerate]=useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const bottomRef = useRef(null);   // useed to scroll bottm automatically
  const prevLengthRef = useRef(0);  


  // when page is render then get items from localstorage
  useEffect(() => {
  const stored = localStorage.getItem("formData");  
  if (stored) {
    const data = JSON.parse(stored);
    setFormName(data.formname || '');
    setDescription(data.description || "");
    setFields(data.fields || []);
  }
}, []);

  useEffect(() => {     // when page render then automatically scroll bottom
    if (fields.length > prevLengthRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLengthRef.current = fields.length;
  }, [fields]);

  function handleSelect(value) {    // runs when select Aff items 
    setEditIndex(null); 
    setSelected(value);   
    console.log("Selected:", selected);
  }


  const handleSave = () => {
    const formData = { formname: formName, description, fields };
    localStorage.setItem("formData", JSON.stringify(formData));
    setPageView(true);       // when save button trigger then show Generate Options
  };
  const showGeneratedForm=()=>{
    setGenerate(true)
  }


  if(generate){
    return(
        <GeneratedForm/>     // when generate is true then show its page content
      )
  }

  const handleReset=()=>{  
    localStorage.removeItem('formData')    // data removed from formData
    window.location.reload();       // refresh the page 
  }

  const handleDeleteField = (indexToDelete) => {
  setFields(prev => prev.filter((_, i) => i !== indexToDelete));
  // if you're editing the same card, reset sidebar
  if (editIndex === indexToDelete) {
    setEditIndex(null);
    setSelected("");
  }
};

  return (
    <>
      <div className="w-full p-2">

        <div className="m-10">
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter Form Name"
            className='border-2'
          />

          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className='my-2 p-10'
          />
        </div>

          <div>

            {/* dynamic card section this section shows all inserted fields*/}
            
            <div className="space-y-4 m-10">

            {fields.map((field, index) => (
              <Card
                key={index}
                onClick={() => {
                  setEditIndex(index);     // which field to edit
                  setSelected(field.type); // open sidebar with correct form
                }}
                className={`border-2 rounded-2xl cursor-pointer`}
              >

                <CardContent className="space-y-3 p-6">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-lg">
                      {field.label || "Untitled Field"}
                    </p>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();      //prevent open sideBaer pother side events stoped
                        handleDeleteField(index);
                      }}
                    >
                      Delete
                    </Button>
                  </div>

                  {field.type === "text" && (
                    <Input placeholder={field.placeholder || "Your answer"} required={field.requireds} disabled/>
                  )}

                  {field.type === "password" && (
                    <Input type="password" required={field.requireds} placeholder={field.placeholder} disabled/>
                  )}

                  {field.type === "email" && (
                    <Input type="email" required={field.requireds} placeholder={field.placeholder} disabled/>
                  )}

                  {field.type === "dropdown" && (
                    <select className="border rounded p-2 w-full" required={field.requireds} disabled>
                      <option>Select option</option>
                      {
                        field.options?.map((i, index) => ( 
                            <option key={index}>{typeof i === "string" ? i : i.label}</option>
                        ))
                      }
                    </select>
                    )
                  }
                  {
                    field.type=='checkbox' && (
                    field.options?.map((i, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input type="checkbox" required={field.requireds} disabled/>
                        <span>{typeof i === "string" ? i : i.label}</span>
                      </div>
                    ))
                  )}
                  {
                    field.type=='radio' && (
                    field.options?.map((i, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input type="radio" name={field.label} required={field.requireds} disabled />
                        <span>{typeof i === "string" ? i : i.label}</span>
                      </div>
                    ))
                  )
                }
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 text-white border hover:bg-blue-700">
                Add Field
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>

              <DropdownMenuItem onClick={() => handleSelect("text")}>
                Text
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleSelect("dropdown")}>
                Dropdown
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleSelect("checkbox")}>
                Checkbox
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleSelect("radio")}>
                Radio
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* when option selected then open sidebar componant */}
        <SideBar value={selected} setValue={setSelected} data={fields} setData={setFields} editIndex={editIndex} setEditIndex={setEditIndex}/>
        
        <div className="flex justify-between gap-2" >
          <Button onClick={handleSave} >Save</Button>
          <Button onClick={handleReset} >Reset</Button>
        </div>

        {
          pageView && <Button onClick={showGeneratedForm} className='my-1'>GeneratedForm</Button>
        }

      </div>
      <div ref={bottomRef}></div>  {/* scroll autimatic to this part */}
    </>
  );
}
export default Home;




