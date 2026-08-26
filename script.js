/* =====================================================
   HazMind Academy
   Script
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       الدورات
    ========================= */

    const coursesContainer = document.getElementById("courses-container");

    if (coursesContainer) {

        coursesContainer.innerHTML = "";

        courses.forEach(function (course) {

            const card = document.createElement("div");

            card.className = "course-card";

            let buttonHTML = "";

            if (course.link) {

                buttonHTML = `
                    <a href="${course.link}"
                       class="btn primary"
                       target="_blank">
                        ${course.button || "الدخول إلى الدورة"}
                    </a>
                `;

            } else {

                buttonHTML = `
                    <span class="course-status">
                        ${course.button || "قريبًا"}
                    </span>
                `;

            }

            card.innerHTML = `
                <div class="course-number">
                    ${course.number}
                </div>

                <h3>
                    ${course.title}
                </h3>

                <p>
                    ${course.description}
                </p>

                ${buttonHTML}
            `;

            coursesContainer.appendChild(card);

        });

    }


    /* =========================
       ملفات PDF
    ========================= */

    const filesContainer = document.getElementById("files-container");

    if (filesContainer) {

        filesContainer.innerHTML = "";

        if (files.length === 0) {

            filesContainer.innerHTML = `
                <div class="loading">
                    لا توجد ملفات متاحة حاليًا.
                </div>
            `;

        } else {

            files.forEach(function (item) {

                const card = document.createElement("div");

                card.className = "file-card";

                card.innerHTML = `
                    <div class="icon">
                        PDF
                    </div>

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.description}
                    </p>

                    <a href="${item.file}"
                       class="download-btn"
                       target="_blank">
                        فتح الملف
                    </a>
                `;

                filesContainer.appendChild(card);

            });

        }

    }


    /* =========================
       فيديوهات YouTube
    ========================= */

    const videosContainer = document.getElementById("videos-container");

    if (videosContainer) {

        videosContainer.innerHTML = "";

        if (videos.length === 0) {

            videosContainer.innerHTML = `
                <div class="loading">
                    لا توجد فيديوهات متاحة حاليًا.
                </div>
            `;

        } else {

            videos.forEach(function (video) {

                const videoId = getYouTubeID(video.youtube);

                if (!videoId) {
                    return;
                }

                const card = document.createElement("div");

                card.className = "video-card";

                card.innerHTML = `

                    <div class="video-frame">

                        <iframe
                            src="https://www.youtube.com/embed/${videoId}"
                            title="${video.title}"
                            allowfullscreen>
                        </iframe>

                    </div>

                    <div class="video-info">

                        <h3>
                            ${video.title}
                        </h3>

                        <p>
                            ${video.description}
                        </p>

                    </div>
                `;

                videosContainer.appendChild(card);

            });

        }

    }


    /* =========================
       روابط التواصل
    ========================= */

    const youtubeLink = document.getElementById("youtube-link");

    if (youtubeLink && socialLinks.youtube) {
        youtubeLink.href = socialLinks.youtube;
    }


    const facebookLink = document.getElementById("facebook-link");

    if (facebookLink && socialLinks.facebook) {
        facebookLink.href = socialLinks.facebook;
    }

});


/* =====================================================
   استخراج ID فيديو YouTube
===================================================== */

function getYouTubeID(url) {

    if (!url) {
        return null;
    }

    try {

        const parsedURL = new URL(url);

        if (parsedURL.hostname.includes("youtu.be")) {

            return parsedURL.pathname.substring(1);

        }

        if (parsedURL.hostname.includes("youtube.com")) {

            return parsedURL.searchParams.get("v");

        }

    } catch (error) {

        return null;

    }

    return null;
}
