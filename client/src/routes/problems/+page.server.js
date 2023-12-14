const MOCK_PROBLEMS = [
    {
        title: "Dani and the Mock",
        code: "mock",
        class_code: "A",
        statement: "# Note \n\n ## This is only for the _mock_",
        status: "Incomplete"
    }
]

export async function load() {
    try {
        const response = await fetch('http://127.0.0.1:8000/problems');
    
        if (!response.ok) {
            // const error = new Error('Failed to fetch data from the server');
            console.error("No data found. Using sample");
            return {
                problems: MOCK_PROBLEMS
            }
        }
    
        const data = await response.json();
        console.log(data)
        return {
            problems: data
        }
    } catch (err) {
        return {
            problems: MOCK_PROBLEMS
        }
    }
}