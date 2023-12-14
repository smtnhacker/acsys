export async function load({ params }) {
    const response = await fetch(`http://127.0.0.1:8000/problem/${params.slug}`);

    if (!response.ok) {
        // const error = Error('Failed to fetch details from the server');
        // throw error;
        console.error("No data found. Using sample");
        return {
            details: {
                    title: "Dani and the Mock",
                    code: "mock",
                    class_code: "A",
                    statement: "# Note \n\n ## This is only for the _mock_",
                    status: "Incomplete"
            }
        }
    }

    const data = await response.json();
    console.log(data)

    return {
        details: data
    };
}