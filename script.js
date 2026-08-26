/* =====================================================
   HazMind Academy
   تشغيل محتوى الموقع
===================================================== */


/* =====================================================
   عرض الدورات
===================================================== */

function renderCourses() {

    const container =
        document.getElementById("courses-container");


    if (!container) return;


    if (!courses || courses.length === 0) {

        container.innerHTML =
            '<div class="loading">لا توجد دورات متاحة حاليًا.</div>';

        return;
    }


    container.innerHTML =
        courses.map(course => {


            const button = course.link

                ? `
                    <a
                        href="${course.link}"
                        class="btn primary"
                        target="_blank"
                        rel="noopener noreferrer">

                        ${course.button || "الدخول إلى الدورة"}

                    </a>
                  `

                : `
                    <span class="course-status">

                        ${course.button || "قريبًا"}

                    </span>
                  `;


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



/* =====================================================
   عرض ملفات PDF
===================================================== */

function renderFiles() {

    const container =
        document.getElementById("files-container");


    if (!container) return;


    if (!files || files.length === 0) {

        container.innerHTML =
            '<div class="loading">لا توجد ملفات متاحة حاليًا.</div>';

        return;
    }


    container.innerHTML =
        files.map(file => {


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
    href="${file.file}"
    class="download-btn"
    target="_blank"
    download
>
    تحميل الملف
</a>

                </div>

            `;

        }).join("");

}



/* =====================================================
   استخراج YouTube ID
===================================================== */

function getYouTubeID(url) {

    if (!url) return "";


    try {

        const parsed =
            new URL(url);


        /* YouTube Shorts */

        if (
            parsed.hostname.includes("youtube.com") &&
            parsed.pathname.includes("/shorts/")
        ) {

            return parsed.pathname
                .split("/shorts/")[1]
                .split("/")[0];

        }


        /* YouTube Embed */

        if (
            parsed.hostname.includes("youtube.com") &&
            parsed.pathname.includes("/embed/")
        ) {

            return parsed.pathname
                .split("/embed/")[1]
                .split("/")[0];

        }


        /* YouTube Watch */

        if (
            parsed.hostname.includes("youtube.com")
        ) {

            return parsed.searchParams.get("v") || "";

        }


        /* youtu.be */

        if (
            parsed.hostname.includes("youtu.be")
        ) {

            return parsed.pathname
                .substring(1)
                .split("/")[0];

        }

    }

    catch (error) {

        console.log(
            "رابط YouTube غير صالح"
        );

    }


    return "";

}



/* =====================================================
   عرض فيديوهات YouTube
===================================================== */

function renderVideos() {

    const container = document.getElementById("videos-container");

    if (!container) return;

    if (!videos || videos.length === 0) {

        container.innerHTML =
            '<div class="loading">لا توجد فيديوهات متاحة حاليًا.</div>';

        return;
    }

    container.innerHTML = videos.map(video => {

        let videoId = "";

        if (video.youtube.includes("youtu.be/")) {

            videoId = video.youtube
                .split("youtu.be/")[1]
                .split("?")[0]
                .split("&")[0];

        } else if (video.youtube.includes("watch?v=")) {

            videoId = video.youtube
                .split("watch?v=")[1]
                .split("&")[0];

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

                    <h3>${video.title}</h3>

                    <p>${video.description}</p>

                </div>

            </div>
        `;

    }).join("");

}



/* =====================================================
   الروابط الاجتماعية
===================================================== */

function renderSocialLinks() {

    const youtube =
        document.getElementById("youtube-link");


    const facebook =
        document.getElementById("facebook-link");


    if (
        youtube &&
        socialLinks.youtube
    ) {

        youtube.href =
            socialLinks.youtube;

    }


    if (
        facebook &&
        socialLinks.facebook
    ) {

        facebook.href =
            socialLinks.facebook;

    }

}



/* =====================================================
   السنة الحالية
===================================================== */

function renderYear() {

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}



/* =====================================================
   تشغيل الموقع
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCourses();

        renderFiles();

        renderVideos();

        renderSocialLinks();

        renderYear();

    }
);
