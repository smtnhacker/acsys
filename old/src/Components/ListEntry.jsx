

function ListEntry({name, classID, code, isEditable}) {

    if (isEditable) {
        return (
            <div>{name} | Class {classID} <button>Edit</button></div>
        )
    }
    return (
        <div>{name} | Class {classID}</div>
    )
}

export default ListEntry