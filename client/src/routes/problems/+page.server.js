export async function load() {
    const response = await fetch('http://127.0.0.1:8000/problems');

    if (!response.ok) {
        const error = new Error('Failed to fetch data from the server');
        throw error;
    }

    const data = await response.json();
    return {
        problems: data
    }
}