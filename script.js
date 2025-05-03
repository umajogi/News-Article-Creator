const apiKey = '20cc8d04e3be4e5e85c851da37865d17'; // Replace with your News API key

document.getElementById('newsForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const topic = document.getElementById('topic').value;
    const articlesOutput = document.getElementById('articlesOutput');
    articlesOutput.innerHTML = '<p>Loading articles...</p>';

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.articles.length === 0) {
            articlesOutput.innerHTML = '<p>No articles found for this topic. Try another one.</p>';
            return;
        }

        articlesOutput.innerHTML = data.articles
            .map(
                article => `
            <div class="article">
                <h2>${article.title}</h2>
                <p><strong>Source:</strong> ${article.source.name}</p>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            </div>
        `
            )
            .join('');
    } catch (error) {
        articlesOutput.innerHTML = `<p>Error fetching articles: ${error.message}</p>`;
    }
});
