import { useState } from "react";
import ListEntry from "../Components/ListEntry";

const SAMPLE = [
    {
        class: "A",
        name: "Simple Operators",
        code: "simple-op"
    },
    {
        class: "A",
        name: "Conditionals",
        code: "if-else"
    },
    {
        class: "B",
        name: "Peeta and Binary Search",
        code: "bsearch"
    },
    {
        class: "C",
        name: "Tesseract and the Infinite Tsukuyomi",
        code: "tesseract"
    }
];

function TeacherProblemList() {
    const [classID, setClassID] = useState('')
    const problems = SAMPLE.filter(problem => classID === '' || problem.class.toLowerCase() === classID.toLowerCase())

    const handleClassIDChange = (e) => {
        setClassID(e.target.value)
    }

    return (
        <div>
            <div>
                <h1>ACSys | Problem List</h1>
            </div>
            <div>
                Class: 
                <input 
                    type="text" 
                    name="class" 
                    placeholder="Class ID"
                    onChange={handleClassIDChange} />
                <button>New Problem</button>
            </div>
            <div>
                {problems.map(problem => (
                    <li key={problem.code}>
                        <ListEntry 
                            name={problem.name} 
                            classID={problem.class}
                            code={problem.code}
                            isEditable={true} />
                    </li>
                ))}
            </div>
        </div>
    )
}

export default TeacherProblemList