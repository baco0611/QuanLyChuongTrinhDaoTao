import { Outlet } from "react-router-dom";
import EditHeader from "../../views/EditorSection/EditHeader/EditHeader";
import EditFooter from "../../views/EditorSection/EditFooter/EditFooter";

function EditorLayout() {
    return (
        <div>
            <EditHeader/>

            <Outlet/>

            <EditFooter/>
        </div>
    )
}

export default EditorLayout