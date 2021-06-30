import { FaTimes } from "react-icons/fa"


const Tag = ({tag, studentId, onDelete}) => {
    console.log(`inside Tag| tag content:${tag}`)
    // const onDelete = ((event) => {
    //     console.log("content of text:"+text)
    //     console.log("content onDelete(event):"+ event.value)
    // })
    return(
        <button type="button" className="btn btn-light m-1">
            <span>{tag}</span>
            <span className="badge-light m-1" onClick={() => onDelete(tag, studentId)}>
                <FaTimes/>
            </span>
        </button>
    )
}
export default Tag