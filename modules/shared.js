export async function fetchData(url, showSection) {
    const response = await fetch(url);
    const jsonData = await response.json();
    showSection(jsonData)
}

export function postNewsletter(formInfo) {
    const postData = JSON.stringify(formInfo);
    fetch("https://frontend2020-db3c.restdb.io/rest/hey-captain-newsletter", {
            method: "post",
            body: JSON.stringify(formInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5e95774d436377171a0c233c",
                "cache-control": "no-cache",
            },
            body: postData,
        })
        .then((res) => res.json())
        .then(console.log("Posted newsletter! - check RestDb"));
}