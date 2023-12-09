import { useState } from "react";

function CreateProblemForm() {
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        timeLimit: 2000,
        language: 'C++',
        description: '',
        scorer: null,
        generators: [],
        generatorCode: '',
        validator: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted", formData);
    }

    return (
        <div>
            <div><h1>ACSys | Create a New Problem</h1></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Problem Name"
                            value={formData.title}
                            onChange={handleChange}
                            required />
                    </label>
                    <label htmlFor="code">
                        <input 
                            type="text" 
                            name="code"
                            placeholder="Problem Code"
                            value={formData.code}
                            onChange={handleChange}
                            required />
                    </label>
                    <label htmlFor="timeLimimt">
                        <input 
                            type="number" 
                            name="timeLimit"
                            placeholder="Time Limit (ms)"
                            value={formData.timeLimit}
                            onChange={handleChange}
                            min={100}
                            max={10_000} />
                    </label>
                    <label htmlFor="language">
                        <select 
                            name="language" 
                            value={formData.language}
                            onChange={handleChange}>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                        </select>
                    </label>
                    <label htmlFor="description">
                        <textarea 
                            name="description" 
                            cols="30" rows="10"
                            placeholder="Problem Description"
                            value={formData.description}
                            onChange={handleChange}></textarea>
                    </label>
                    <label htmlFor="scorer">
                        <input 
                            type="file" 
                            name="scorer" 
                            onChange={e => setFormData({...formData, scorer: e.target.files[0]})} />
                        {formData.scorer && (
                            <p>Scorer: {formData.scorer.name}</p>
                        )}
                    </label>
                    <label htmlFor="generators">
                        <input
                            type="file"
                            name="generators"
                            multiple
                            onChange={e => setFormData({...formData, generators: e.target.files})} />
                        {formData.generators.length && (
                            <p>Number of Generators: {formData.generators.length}</p>
                        )}
                    </label>
                    <label htmlFor="generatorCode">
                        <textarea 
                            name="generatorCode" 
                            cols="30" rows="10"
                            placeholder="Generator Runner (bash)"
                            value={formData.generatorCode}
                            onChange={handleChange}></textarea>
                    </label>
                    <label htmlFor="validator">
                        <input 
                            type="file"
                            name="validator"
                            onChange={e => setFormData({...formData, validator: e.target.files[0]})} />
                        {formData.validator && (
                            <p>Validator: {formData.validator.name}</p>
                        )}
                    </label>
                </form>
            </div>
        </div>
    )
}

export default CreateProblemForm