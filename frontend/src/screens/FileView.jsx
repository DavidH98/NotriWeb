// React packages
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toJson } from 'react-dom/test-utils';
import PHE from "print-html-element";
import jsPDF from 'jspdf';


// Redux packages
import { useDispatch, useSelector } from "react-redux";
// Components
import { Col, Row, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// Actions
import { getUserProfile,uploadFile ,updateUserProfile} from "../actions/usersActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/usersConstants'

import stringify from 'json-stringify-safe';
import circularJson from 'circular-json';

let dict1={
    "Israeli Driver License":"רשיון נהיגה ישראלי",
    "Israeli Biometric ID":"תעודת זהות ביומטרית ישראלית",
    "Israeli Biometric Passport":"דרכון ביומטרי ישראלי",
    "Israeli Regular ID":"תעודת זהות ישראלית רגילה",
    "Israeli Regular Passport":"דרכון ישראלי רגיל",
    "Foreign Passport":"דרכון",
}

const ViewScreen = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const { date, clients ,numbering,copy,numberingE} = location.state;

  // Data from the state

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;
  const [hebrewName, setHebrewName] = useState('')
  const [englishName, setEnglishName] = useState('')
  const [englishAddress, setEnglishAddress] = useState('')
  const [email, setEmail] = useState('')
  const [files, setFiles] = useState([])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const updateProfile = useSelector((state) => state.updateProfile);
  const { success } = updateProfile;

  // Variables
  const dispatch = useDispatch();
  const [wage, SetWage] = useState(214);
  const [index, Setindex] = useState("");

  const [message, setMessage] = useState(null);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Listen to data variables
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
     if (!user || !user.hebrewName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserProfile('profile'))
      } else {
        setHebrewName(user.hebrewName)
        setEnglishName(user.englishName)
        setEnglishAddress(user.englishAddress)
        setEmail(user.email)
        setAddress(user.address)
        setLicenseNumber(user.licenseNumber)
        setFiles(user.files)
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  // Handlers
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const file = 
  <Row>
    <Col>
    <div >
      <br/>
      
      <p> Serial No. {clients[0].clientID}/{date.split("-")[0]} </p>
      <br/>
      <p> Form No. 1 </p>
      <br/>
      <h5>AUTHENTICATION OF SIGNATURE</h5>
      <br/>
      <br/>

      <span>
        {`
        I, ${userInfo.englishName} `}{`, the undersigned
        Notary holding license no. ${userInfo.licenseNumber}
        hereby certify that  :
        `}
        



        {clients.map((x,index)=>{ 
             return (<>
             <br/>
             <br/>

             {
                `${index+1}.`
             }
                    {`
        on ${date}
        `}
        { clients[index].gender == "Men"
          ? ` appeared  `  
          : ` appeared ` }
        {`  before me at my offices located at the address   ${userInfo.englishAddress} `}
        {clients[index].gender=='Men'?(` Mr.  `  ):(' Ms. ' )}
        {` ${clients[index].clientnameE}`}
        {clients[index].gender=='Men'?(" whose identity has been proven to me by "  ):("whose identity has been proven to me by ")}
        {clients[index].clientIDType=='Foreign Passport'?(clients[index].natio):(null)}
        {` ${clients[index].clientIDType} `}
        
        {` number   ${clients[index].clientID} ,`}
        {`   issued on ${clients[index].clientdate} . `}
             </>)}  
        )}
        <br/>
        <br/>

        {"And I am convinced that the person standing before me understood fully the significance of the action and voluntarily signed the attached document marked with the letter/number "}
        {` "${numberingE}" .`}
        <br/>
        <br/>   
        {clients.length>1?(` In witness whereof, I hereby authenticate the signature of `):
        clients[0].gender=='Men'?('In witness whereof, I hereby authenticate the signature of '):
        (" In witness whereof, I hereby authenticate the signature of ")}
        {clients.map((x,index)=>{
            return <>
            {clients[index].gender=='Men'?(" Mr. "):(" Ms. ")}
            {` ${clients[index].clientnameE} ,`}
            </>
        })}
        {` by my own signature and seal this day   ,  ${date} .`}
        <br/>
        {` Notary Fee for Original and ${copy} copies `}
        <br/>
        <br/>

        <br/>

        {"Notary Fee  : "}
        {`${(wage+(clients.length-1)*72+copy*72)}`}
        {` Shekels`}
        <br/>        <br/>
        <br/>

        {`Signature and Notary's seal `}


      </span>
      <p></p>
    </div>
    </Col>

    <Col>
    <div dir="rtl">
      <br/>
      
      <p>מספר סידורי {clients[0].clientID}/{date.split("-")[0]} </p>
      <br/>
      <p>טופס מס' 1</p>
      <br/>
      <h5>אימות חתימה</h5>
      <br/>
      <br/>

      <span>
        {`

        אני החתום מטה, ${userInfo.hebrewName} ,
        נוטריון בעל רישיון מספר. ${userInfo.licenseNumber}
        מאשר כי:
        `}
        



        {clients.map((x,index)=>{ 
             return (<>
             <br/>
             <br/>

             {
                `${index+1}.`
             }
                    {`
        ביום ${date}
        `}
        { clients[index].gender == "Men"
          ? ` ניצב  `  
          : ` ניצבה ` }
        {` לפני במשרדי שבמען ${userInfo.address} `}
        {clients[index].gender=='Men'?(` מר  `  ):(' מרת ' )}
        {` , ${clients[index].clientnameH}`}
        {clients[index].gender=='Men'?(" שזהותו הוכחה לי על פי "  ):(" שזהותה הוכחה לי על פי ")}
        {` ${dict1[clients[index].clientIDType]} `}
        {dict1[clients[index].clientIDType]=='דרכון'?(clients[index].natioH):(null)}
        {` מספר   ${clients[index].clientID} ,`}
        {`  שהונפקה ביום ${clients[index].clientdate} . `}
             </>)}  
        )}
        <br/>
        <br/>

        {clients.length>1?(' ושוכנעתי כי הניצבים לפני הבינו הבנה מלאה את משמעות הפעולה וחתמו מרצונם החופשי  על המסמך המצורף והמסומן באות'):clients[0].gender=='Men'?(' ושוכנעתי כי הניצב לפני הבין הבנה מלאה את משמעות הפעולה וחתם מרצונו החופשי על המסמך המצורף והמסומן באות '):(" ושוכנעתי כי הניצבת לפני הבינה הבנה מלאה את משמעות הפעולה וחתמה מרצונה החופשי על המסמך המצורף והמסומן באות ")}
        {` "${numbering}" .`}
        <br/>
        <br/>   
        {clients.length>1?(` לראיה אני מאמת את חתימתם של  `):
        clients[0].gender=='Men'?(' לראיה אני מאמת את חתימתו של  '):
        (" לראיה אני מאמת את חתימתה של ")}
        {clients.map((x,index)=>{
            return <>
            {clients[index].gender=='Men'?(" מר "):(" מרת ")}
            {` ${clients[index].clientnameH} ,`}
            </>
        })}
        {`   בחתימת ידי ובחותמי , היום ${date} .`}
        <br/>
        {` השכר עבור מקור ו- ${copy} עותקים`}
        <br/>
        <br/>

        <br/>

        {"שכר נוטריון : "}
        {`${wage+(clients.length-1)*72+copy*72}`}
        {` ש"ח (אחרי מע"מ) `}
        <br/>        <br/>
        <br/>

        {`חתימה וחותם הנוטריון`}


      </span>
      <p></p>
    </div>
    </Col>
  </Row>
   
  
  
    function downloadPDF() {
    try {
      
      const myDiv = document.getElementById('myDiv');
      PHE.printElement(myDiv);
      let tempArr=[];
      clients.map((x)=>{
        tempArr.push(x.clientnameH)
      })
      let obj={
        date:date,
        numbering:numbering,
        copy:copy,
        clients:clients,
        type:"אימות חתימה עברית",
        wage:wage+(clients.length-1)*72+copy*72,
      }

   
     // const myDivJson = circularJson.stringify(myDiv);
      // const jsonString = JSON.stringify(document.getElementById('myDiv'))
      //dispatch(uploadFile(myDiv))
    } catch (error) {
      console.log(error)
    }
    console.log("end of func");
  }


  return (
    <>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <h1>
        תצוגה מקדימה
      </h1>
      {loading && <Loader />}
    
    <div id="myDiv">
    {file}
    </div>
      <button onClick={downloadPDF}>Print</button>
      

    </>
  );
};

export default ViewScreen;
