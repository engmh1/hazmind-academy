document.addEventListener("DOMContentLoaded", () => {

    loadContent();

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});


async function loadContent() {

    try {

        const response = await fetch("content.json");

        if (!response.ok) {
            throw new Error("Content file not found");
        }

        const data = await response.json();

        displayFiles(data.files || []);

        displayVideos(data.videos || []);

    } catch (error) {

        console.error(error);

        document.getElementById("files-container").innerHTML =
            `<div class="loading">
                لا توجد ملفات متاحة حاليًا.
             </div>`;

        document.getElementById("videos-container").innerHTML =
            `<div class="loading">
                لا توجد فيديوهات متاحة حاليًا.
             </div>`;
    }
}


function displayFiles(files) {

    const container = document.getElementById("files-container");

    if (!files.length) {

        container.innerHTML =
            `<div class="loading">
                لا توجد ملفات متاحة حاليًا.
             </div>`;

        return;
    }


    container.innerHTML = files.map(file => `

        <article class="file-card">

            <h3>${escapeHTML(file.title)}</h3>

            <p>
                ${escapeHTML(file.description || "")}
            </p>

            <a
                href="${escapeAttribute(file.url)}"
                target="_blank"
                class="download-btn">
                تحميل PDF
            </a>

        </article>

    `).join("");
}


function displayVideos(videos) {

    const container = document.getElementById("videos-container");

    if (!videos.length) {

        container.innerHTML =
            `<div class="loading">
                لا توجد فيديوهات متاحة حاليًا.
             </div>`;

        return;
    }


    container.innerHTML = videos.map(video => {

        const videoId = getYouTubeId(video.youtube);

        if (!videoId) {
            return "";
        }

        return `

            <article class="video-card">

                <div class="video-frame">

                    <iframe
                        src="https://www.youtube.com/embed/${videoId}"
                        title="${escapeAttribute(video.title)}"
                        allowfullscreen>
                    </iframe>

                </div>

                <div class="video-info">

                    <h3>
                        ${escapeHTML(video.title)}
                    </h3>

                    <p>
                        ${escapeHTML(video.description || "")}
                    </p>

                </div>

            </article>

        `;

    }).join("");
}


function getYouTubeId(url) {

    if (!url) {
        return null;
    }

    const patterns = [

        /youtube\.com\/watch\?v=([^&]+)/,

        /youtu\.be\/([^?&]+)/,

        /youtube\.com\/embed\/([^?&]+)/,

        /youtube\.com\/shorts\/([^?&]+)/

    ];

    for (const pattern of patterns) {

        const match = url.match(pattern);

        if (match) {
            return match[1];
        }

    }

    return null;
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}
