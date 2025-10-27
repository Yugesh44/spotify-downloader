async function downloadSong() {
    const input = document.getElementById('songInput').value.trim();
    const status = document.getElementById('status');
    const details = document.getElementById('songDetails');
    if (!input) {
        alert('Please enter a song URL or link');
        return;
    }

    status.textContent = 'Fetching song details...';
    details.innerHTML = '';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a8cf262af6mshe1c5dc97076da70p1ee34cjsn68bdc68d0ea4',
            'X-RapidAPI-Host': 'songstats.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://spotify-downloader9.p.rapidapi.com/download?trackUrl=${encodeURIComponent(input)}`, options);
        const data = await response.json();

        if (data && data.downloadUrl) {
            status.textContent = 'Download ready!';
            details.innerHTML = `
        <p>Title: ${data.title}</p>
        <p>Artist: ${data.artist}</p>
        <p>Album: ${data.album}</p>
        <p>Duration: ${data.duration}</p>
        <a href="${data.downloadUrl}" download>Click here to download</a>
      `;
        } else {
            status.textContent = 'Could not fetch the song. Please check the URL.';
        }
    } catch (error) {
        console.error(error);
        status.textContent = 'Error fetching song: ' + error.message;
    }
}
