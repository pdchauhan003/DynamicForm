import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from '../Companents/Home'
import GeneratedForm from "@/Companents/GeneratedForm";
function Router(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/generatedform' element={<GeneratedForm/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;