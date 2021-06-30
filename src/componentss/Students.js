import Student from "./Student";

const Students = ({students, onAddTag, onRemoveTag}) => {
    // console.log('students typeof' + typeof students)

    return(
        <div className="container">
            {students.map((student, idx) => <Student key={idx} student={student} onAddTag={onAddTag} onRemoveTag={onRemoveTag}/>)}
        </div>
    )
}

export default Students