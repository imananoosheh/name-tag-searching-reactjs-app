import { useState } from "react";
import Tag from "./Tag";

const AddTag = ({onAdd}) => {
    const [tagText, setTagText] = useState("")
    const [studentId, setStudentId] = useState()

    const onKeyPress = (e) => {
        e.preventDefault()
        
        if(e.key === 'Enter'){
            if (!tagText) {
                alert('Please type a tag and press enter')
                return
            }
            onAdd({ tagText, studentId })
    
            setTagText(e.target.value)
            setStudentId(studentId)
        }
    }
    return (
        <div className='form-control'>
        <label>Tag</label>
        <input
            type='text'
            placeholder='Add Tag'
            value={tagText}
            onKeyPress={onKeyPress}
        />
        </div>
    )
}
export default AddTag