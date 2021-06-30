import ExpandableButton from "./ExpandableButton"
// import AddTag from "./AddTag"
import Tags from "./Tags"
import { useState } from "react"

function averageScore(grades) {
    const sum = grades.reduce((sum, curElement) => sum + parseFloat(curElement), 0)
    return sum / grades.length
}

const Student = ({student, onAddTag, onRemoveTag}) => {
    const [showGrades, setShowGrades] = useState(false)
    console.log(student)
    const tags = student.tags ? student.tags : []
    const { id, firstName, lastName, grades, pic, email, company, skill } = student
    const fullName = `${firstName} ${lastName}`

    return(
        <div id={id} className='student-card row py-3'>
            <div className="student-pic col-3">
                <img src={pic} alt={`Profile of ${fullName}`}></img>
            </div>
            <div className='student-info col-7'>
                <h2>{fullName}</h2>
                <p>{"Email: "}
                    <a href={`mailto:${email}`}>{email}</a>
                </p>
                <p>{`Company: ${company}`}</p>
                <p>{`Skill: ${skill}`}</p>
                <p>{`Average: ${averageScore(grades)}%`}</p>
                {showGrades && <div className="grades">
                    {grades.map((val, key) => {
                        return(<p>{`Test ${key+1}:  ${val}%`}</p>)
                    })}
                </div>}
                {tags.length !== 0 && <Tags tags={tags} studentId={id} onDelete={onRemoveTag}/>}
                <input className="ms-3 add-tag-input" type="text" placeholder='Add a tag here ...' onKeyDown={(e)=> {
                    if(e.key === 'Enter'){
                        onAddTag(e.target.value, id)
                        e.target.value = ''
                    }
                }}></input>    
            </div>
            <div className="col-2">
                <ExpandableButton onDisplay={() => setShowGrades(!showGrades)} showGrades={showGrades}/>
            </div>
        </div>
    )
}

export default Student

