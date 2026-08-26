/* =====================================================
   HazMind Academy
   تشغيل محتوى الموقع
===================================================== */


/* =========================
   عرض الدورات
========================= */

function renderCourses() {

    const container = document.getElementById("courses-container");

    if (!container) return;

    if (!courses || courses.length === 0) {

        container.innerHTML =
            '<div class="loading">لا توجد دورات متاحة حاليًا.</div>';

        return;
    }

    container.innerHTML = courses.map(course => {

        const button = course.link
            ? `<a href="${course.link}" class="btn primary" target="_blank">${course.button || "الدخول إلى الدورة"}</a>`
            : `<span class="course-status">${course.button || "قريبًا"}</span>`;

        return `
            <div class="course-card">

                <div class="course-number">
                    ${course.number}
                </div>

                <h3>
                    ${course.title}
                </h3>

                <p>
                    ${course.description}
                </p>

                ${button}

            </div>
        `;

    }).join("");
}


/* =========================
   عرض ملفات PDF
========================= */

function renderFiles() {

    const container = document.getElementById("files-container");

    if (!container) return;

    if (!files || files.length === 0) {

        container.innerHTML =
            '<div class="loading">لا توجد ملفات متاحة حاليًا.</div>';

        return;
    }

    container.innerHTML = files.map(file => {

        return `
            <div class="file-card">

                <div class="icon">
                    PDF
                </div>

                <h3>
                    ${file.title}
                </h3>

                <p>
                    ${file.description}
                </p>

                <a
                    href="${encodeURI(file.file)}"
                    class="download-btn"
                    target="_blank"
                    rel="noopener"
                >
                    تحميل الملف
                </a>

            </div>
        `;

    }).join("");
}


/* =========================
   استخراج YouTube ID
========================= */

function getYouTubeID(url) {

    if (!url) return "";

    let videoId = "";

    try {

        const parsed = new URL(url);

        if (parsed.hostname.includes("youtu.be")) {

            videoId = parsed.pathname.substring(1);

        } else if (parsed.hostname.includes("youtube.com")) {

            videoId = parsed.searchParams.get("v") || "";

            if (!videoId && parsed.pathname.includes("/shorts/")) {

                videoId = parsed.pathname.split("/shorts/")[1];

            }

            if (!videoId && parsed.pathname.includes("/embed/")) {

                videoId = parsed.pathname.split("/embed/")[1];

            }

        }

    } catch (error) {

        console.log("رابط YouTube غير صالح");

    }

    return videoId;
}


/* =========================
   عرض فيديوهات YouTube
========================= */

function renderVideos() {

    const container = document.getElementById("videos-container");

    if (!container) return;

    if (!videos || videos.length === 0) {

        container.innerHTML =
            '<div class="loading">لا توجد فيديوهات متاحة حاليًا.</div>';

        return;
    }

    container.innerHTML = videos.map(video => {

        const videoId = getYouTubeID(video.youtube);

        if (!videoId) {

            return `
                <div class="video-card">

                    <div class="video-info">

                        <h3>
                            ${video.title}
                        </h3>

                        <p>
                            رابط الفيديو غير صالح.
                        </p>

                    </div>

                </div>
            `;
        }

        return `
            <div class="video-card">

                <div class="video-frame">

                    <iframe
                        src="https://www.youtube.com/embed/${videoId}"
                        title="${video.title}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

            </div>
        `;

    }).join("");
}


/* =========================
   الروابط الاجتماعية
========================= */

function renderSocialLinks() {

    const youtube = document.getElementById("youtube-link");

    const facebook = document.getElementById("facebook-link");

    if (youtube && socialLinks.youtube) {

        youtube.href = socialLinks.youtube;

    }

    if (facebook && socialLinks.facebook) {

        facebook.href = socialLinks.facebook;

    }
}


/* =========================
   تشغيل الموقع
========================= */

document.addEventListener("DOMContentLoaded", function () {

    renderCourses();

    renderFiles();

    renderVideos();

    renderSocialLinks();

});
