import { TableStyledIncludingDiv } from "./Table.styled"
import "./table.css"
import { getDatabase, onValue, ref, remove } from "firebase/database"
import app from "../authentication/firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditTableData from "./EditTableData";

const Table = () => {
  const { userInfo } = useSelector((state) => state.loginInfo)
  const [contactList, setContactList] = useState([""])
  const [editInfos, setEditInfos] = useState({})

  useEffect(()=>{
    const database = getDatabase(app);
    const userContactsRef = ref(database,`${userInfo.uid}/contacts`)

    onValue(userContactsRef, (snapshot)=>{
      const data = snapshot.val()
      const contactArray = []

      for(let id in data) {
        contactArray.push({id, ...data[id]})
      }
      setContactList(contactArray)
    })
  },[])

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
    <TableStyledIncludingDiv>
        <p>CONTACTS</p>
        <table className="table table-hover text-center" style={{width:"100%"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Gender</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            {contactList.length === 0 ? <td className="text-center p-2" colSpan="5">Nothing Found</td> : (contactList.map((item)=>{
                const {id, name, gender, phoneNumber} = item
                
                const handleDeleteContact = (id) => {
                  try {
                    const database = getDatabase();
                    const contactRef = ref(database, `${userInfo.uid}/contacts/${id}`)
                    remove(contactRef)
                    alert("Deleted Contact!")
                  }catch(error){
                    console.log(error.message);
                  }
                }

                const handleEditButton = () => {
                  setEditInfos({name, id, gender, phoneNumber})
                }

                return(
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{gender}</td>
                            <td><DeleteIcon style={{color:"#A62B1F", cursor:"pointer"}} onClick={() => handleDeleteContact(id)}/></td>
                            <td><BorderColorIcon data-bs-toggle="modal" data-bs-target="#editData" style={{color:"gray", cursor:"pointer"}} onClick={handleEditButton}/></td>
                        </tr>
                    </tbody>
                )
            }))}
        </table>
    </TableStyledIncludingDiv>
    <EditTableData editInfos={editInfos} setEditInfos={setEditInfos} />
    </div>
  )
}

export default Table
