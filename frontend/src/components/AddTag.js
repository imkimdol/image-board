import { useState } from "react";
import axios from "axios";

const AddTag = () => {
    // const serverLoc = localStorage.getItem("serverLoc");

    // const [name, setName] = useState("");
    // const [success, setSuccess] = useState(null);
    // const [error, setError] = useState(null);
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const info = {name: name};

    //     try {
    //         await axios.post("/tags", info);
    //         setSuccess("Added tag!!");
    //         setError(null);
    //     } catch (e) {
    //         setSuccess(null);
    //         setError(e.message);
    //         console.error(e);
    //     }

    //     setName("");
    // };

    // return (
    //     <div>
    //         <form className="add" onSubmit={handleSubmit}> 
    //             <h3>Add a New Tag</h3>
            
    //             <label>Name</label>
    //             <input 
    //                 type="text" 
    //                 onChange={(e) => setName(e.target.value)} 
    //                 value={name}
    //             />
            
    //             <button>Add</button>
    //         </form>
    //         <p>{success}</p>
    //         <p>{error}</p>
    //     </div>
    // )    
    return null;
};

export default AddTag;