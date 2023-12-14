export async function load({ params }) {
    const response = await fetch(`http://127.0.0.1:8000/problem/${params.slug}`);

    if (!response.ok) {
        const error = Error('Failed to fetch details from the server');
        throw error;
    }

    const data = await response.json();
    console.log(data)

    return {
        details: data
    };
}