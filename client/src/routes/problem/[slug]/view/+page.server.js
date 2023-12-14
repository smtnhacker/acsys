const MOCK_PROBLEM = {
    title: "Dani and the Mock",
    code: "mock",
    class_code: "A",
    statement: "# Note \n\n ## This is only for the _mock_",
    status: "Incomplete"
}

export async function load({ params }) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/problem/${params.slug}`);
        if (!response.ok) {
            // const error = Error('Failed to fetch details from the server');
            // throw error;
            console.error("No data found. Using sample");
            return {
                details: MOCK_PROBLEM
            }
        }
    
        const data = await response.json();
        console.log(data)
    
        return {
            details: data
        };
    } catch (err) {
        return {
            details: MOCK_PROBLEM
        }
    }

}