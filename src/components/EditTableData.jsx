import { getDatabase, ref, update } from "firebase/database";
import app from "../authentication/firebase";
import { useSelector } from "react-redux";

const EditTableData = ({ editInfos, setEditInfos }) => {
    const { id, name, gender, phoneNumber } = editInfos;
    const {userInfo} = useSelector((state) => state.loginInfo)

    const handleUpdateButton = (editInfos) => {
        try {
            const database = getDatabase(app);
            const dataRef = ref(database, `${userInfo.uid}/contacts/${id}`)
            update(dataRef, editInfos)
            alert("Successfully Updated!")
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <div className="modal fade" id="editData" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Contact</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label"><b>Name :</b></label>
                                <input type="text" value={name} className="form-control" id="contactName" onChange={(e)=>setEditInfos({...editInfos, name:e.target.value})}/>
                                <label htmlFor="contactPhone" className="form-label mt-2"> <b>Phone Number :</b></label>
                                <input type="tel" value={phoneNumber} className="form-control" id="contactPhone" onChange={(e) => setEditInfos({...editInfos, phoneNumber:e.target.value})}/>
                                <label htmlFor="contactGender" className="form-label mt-2"><b>Gender :</b></label>
                                <select id="contactGender" value={gender} class="form-select form-select-md mb-1" aria-label=".form-select-md example" onChange={(e) => setEditInfos({...editInfos, gender:e.target.value})}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleUpdateButton(editInfos)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTableData;
