document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       السنة
    ========================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       عرض الدورات
    ========================== */

    const coursesContainer =
        document.getElementById("courses-container");


    if (coursesContainer) {

        coursesContainer.innerHTML = "";


        if (courses.length === 0) {

            coursesContainer.innerHTML = `
                <div class="loading">
                    لا توجد دورات متاحة حاليًا.
                </div>
            `;

        } else {

            courses.forEach(function (course) {

                let action = "";

                if (course.link && course.link.trim() !== "") {

                    action = `
                        <a
                            href="${course.link}"
                            target="_blank"
                            rel="noopener"
                            class="btn primary">

                            ${course.button || "الدخول إلى الدورة"}

                        </a>
                    `;

                } else {

                    action = `
                        <span class="course-status">
                            ${course.button || "قريبًا"}
                        </span>
                    `;

                }


                coursesContainer.innerHTML += `

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

                        ${action}

                    </div>

                `;

            });

        }

    }


    /* =========================
       عرض ملفات PDF
    ========================== */

    const filesContainer =
        document.getElementById("files-container");


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

                filesContainer.innerHTML += `

                    <div class="file-card">

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${item.description}
                        </p>

                        <a
                            href="${item.file}"
                            target="_blank"
                            rel="noopener"
                            class="download-btn">

                            تحميل PDF

                        </a>

                    </div>

                `;

            });

        }

    }


    /* =========================
       تحويل رابط YouTube
       إلى رابط Embed
    ========================== */

    function getYouTubeEmbedUrl(url) {

        try {

            const parsedUrl = new URL(url);

            let videoId = "";


            /* youtube.com/watch?v= */

            if (parsedUrl.hostname.includes("youtube.com")) {

                videoId = parsedUrl.searchParams.get("v");

            }


            /* youtu.be/ */

            if (parsedUrl.hostname === "youtu.be") {

                videoId = parsedUrl.pathname.substring(1);

            }


            if (!videoId) {
                return "";
            }


            return "https://www.youtube.com/embed/" + videoId;

        } catch (error) {

            return "";

        }

    }


    /* =========================
       عرض فيديوهات YouTube
    ========================== */

    const videosContainer =
        document.getElementById("videos-container");


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

                const embedUrl =
                    getYouTubeEmbedUrl(video.youtube);


                if (!embedUrl) {
                    return;
                }


                videosContainer.innerHTML += `

                    <div class="video-card">

                        <div class="video-frame">

                            <iframe
                                src="${embedUrl}"
                                title="${video.title}"
                                loading="lazy"
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

            });

        }

    }

});
