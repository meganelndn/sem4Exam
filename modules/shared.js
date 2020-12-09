export async function fetchData(url, showSection) {
    const response = await fetch(url);
    const jsonData = await response.json();
    showSection(jsonData)
}