import { useState } from "react"

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        isTeacher: false
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
            <div className="header">
                ACSys
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label htmlFor="email">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            required />
                    </label>
                    <label htmlFor="passowrd">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}
                            required />
                    </label>
                    <label htmlFor="isTeacher">
                        Are you a teacher?
                        <input 
                            type="checkbox" 
                            name="isTeacher" 
                            checked={formData.isTeacher}
                            onChange={handleChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default Login