import DispForm from "./forms/DispForm";
import Popup from "./components/Popup";
import ShipsForm from "./forms/ShipsForm";
import DispDetailForm from "./forms/DispDetailForm";
import ShipsDetailForm from "./forms/ShipsDetailForm";
import Map from "./components/Map";
import PhotoDisp from "./forms/PhotoDisp";

export default {
    MainForm : {DispForm,Popup},
    ExitDispAqua : {DispDetailForm,Popup},
    EnterSeePort:{DispDetailForm,Popup},
    ExitSeePort:{DispDetailForm,Popup},
    SwimDispAqua:{DispDetailForm,Popup},
    EnterDispAqua:{DispDetailForm,Popup},
    CreateDispAqua:{DispDetailForm,Popup,},
    ShipsForm:{ShipsForm,Popup},
    ShipsDetailForm:{ShipsDetailForm,Popup},
    PhotoDisp : {PhotoDisp,Map},
    EnterDispAquaInn : {DispDetailForm,Map}
}

