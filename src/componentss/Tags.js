import Tag from "./Tag";

const Tags = ({tags, studentId, onDelete}) => {
    return(
        <div className="tags-container m-3">
            <div className="mr-2">Tags:</div>
            {tags.map((tag, idx) => {
                return(<Tag key={idx} tag={tag} studentId={studentId}  onDelete={onDelete}/>)
            })}
        </div>
    )
}
export default Tags