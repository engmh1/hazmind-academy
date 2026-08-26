/* =========================================================================
   HazMind Academy — script.js
   -------------------------------------------------------------------------
   يقرأ البيانات من content.js ويعرضها في الصفحة.
   لا تحتاج لتعديل هذا الملف عند إضافة محتوى جديد — عدّل content.js فقط.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
    renderCourses();
    renderFiles();
    renderVideos();
    renderSocialLinks();
    setupMobileMenu();
    setYear();
});

/* -------------------------------------------------------------------------
   الدورات
------------------------------------------------------------------------- */
function renderCourses() {
    var container = document.getElementById("courses-container");
    if (!container) return;

    if (!Array.isArray(courses) || courses.length === 0) {
        container.innerHTML = '<p class="empty-state">لا توجد دورات متاحة حاليًا.</p>';
        return;
    }

    var html = "";

    courses.forEach(function (course) {
        var hasLink = course.link && course.link.trim() !== "";
        var buttonLabel = hasLink ? "الدخول إلى الدورة" : (course.button || "قريبًا");

        html += '<article class="course-card">';
        html += '<span class="course-number">' + escapeHTML(course.number || "") + "</span>";
        html += "<h3>" + escapeHTML(course.title || "") + "</h3>";
        html += "<p>" + escapeHTML(course.description || "") + "</p>";

        if (hasLink) {
            html +=
                '<a class="course-btn" href="' +
                escapeAttr(course.link) +
                '" target="_blank" rel="noopener noreferrer">' +
                escapeHTML(buttonLabel) +
                "</a>";
        } else {
            html += '<span class="course-btn disabled">' + escapeHTML(buttonLabel) + "</span>";
        }

        html += "</article>";
    });

    container.innerHTML = html;
}

/* -------------------------------------------------------------------------
   الملفات التعليمية (PDF)
------------------------------------------------------------------------- */
function renderFiles() {
    var container = document.getElementById("files-container");
    if (!container) return;

    if (!Array.isArray(files) || files.length === 0) {
        container.innerHTML = '<p class="empty-state">لا توجد ملفات متاحة حاليًا.</p>';
        return;
    }

    var html = "";

    files.forEach(function (item) {
        var fileURL = buildFileURL(item.file);

        html += '<article class="file-card">';
        html += '<div class="file-icon">PDF</div>';
        html += "<h3>" + escapeHTML(item.title || "") + "</h3>";
        html += "<p>" + escapeHTML(item.description || "") + "</p>";

        if (fileURL) {
            html += '<div class="file-actions">';
            html +=
                '<a class="file-btn" href="' +
                escapeAttr(fileURL) +
                '" target="_blank" rel="noopener noreferrer">فتح الملف</a>';
            html +=
                '<a class="file-btn outline" href="' +
                escapeAttr(fileURL) +
                '" download>تحميل الملف</a>';
            html += "</div>";
        } else {
            html += '<p class="video-invalid">تعذر تحديد مسار الملف.</p>';
        }

        html += "</article>";
    });

    container.innerHTML = html;
}

/**
 * يبني رابط ملف PDF بشكل صحيح انطلاقًا من اسم الملف فقط،
 * مع التعامل الصحيح مع المسافات والأحرف العربية والخاصة،
 * ومنع تكرار "files/" أو فقدانها.
 */
function buildFileURL(fileName) {
    if (!fileName || typeof fileName !== "string") return null;

    var clean = fileName.trim();

    // إزالة أي "files/" مكتوبة يدويًا في content.js حتى لا يتكرر المسار
    clean = clean.replace(/^(\.?\/)?files\//i, "");

    // إزالة أي "/" في البداية
    clean = clean.replace(/^\/+/, "");

    if (clean === "") return null;

    // ترميز كل جزء من اسم الملف (يدعم المسافات والعربية والرموز الخاصة)
    var encoded = clean
        .split("/")
        .map(function (part) {
            return encodeURIComponent(part);
        })
        .join("/");

    return "files/" + encoded;
}

/* -------------------------------------------------------------------------
   فيديوهات YouTube
------------------------------------------------------------------------- */
function renderVideos() {
    var container = document.getElementById("videos-container");
    if (!container) return;

    if (!Array.isArray(videos) || videos.length === 0) {
        container.innerHTML = '<p class="empty-state">لا توجد فيديوهات متاحة حاليًا.</p>';
        return;
    }

    var html = "";

    videos.forEach(function (video) {
        var videoId = getYouTubeID(video.youtube);

        html += '<article class="video-card">';
        html += '<div class="video-frame-wrap">';

        if (videoId) {
            html +=
                '<iframe src="https://www.youtube.com/embed/' +
                encodeURIComponent(videoId) +
                '" title="' +
                escapeAttr(video.title || "فيديو تعليمي") +
                '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } else {
            html += '<div class="video-invalid">رابط الفيديو غير صالح.</div>';
        }

        html += "</div>";
        html += '<div class="video-body">';
        html += "<h3>" + escapeHTML(video.title || "") + "</h3>";
        html += "<p>" + escapeHTML(video.description || "") + "</p>";
        html += "</div>";
        html += "</article>";
    });

    container.innerHTML = html;
}

/**
 * يستخرج Video ID من مختلف صيغ روابط يوتيوب:
 * watch?v=, shorts/, embed/, youtu.be/
 * يعيد null إذا كان الرابط غير صالح.
 */
function getYouTubeID(url) {
    if (!url || typeof url !== "string") return null;

    try {
        var patterns = [
            /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{6,})/,
            /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/,
            /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/,
            /(?:youtu\.be\/)([a-zA-Z0-9_-]{6,})/
        ];

        for (var i = 0; i < patterns.length; i++) {
            var match = url.match(patterns[i]);
            if (match && match[1]) {
                return match[1];
            }
        }

        return null;
    } catch (e) {
        return null;
    }
}

/* -------------------------------------------------------------------------
   الروابط الاجتماعية
------------------------------------------------------------------------- */
function renderSocialLinks() {
    var container = document.getElementById("social-container");
    if (!container) return;

    if (typeof socialLinks !== "object" || socialLinks === null) {
        container.innerHTML = "";
        return;
    }

    var labels = {
        youtube: "YouTube",
        facebook: "Facebook",
        twitter: "X (Twitter)",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        telegram: "Telegram"
    };

    var html = "";

    Object.keys(socialLinks).forEach(function (key) {
        var link = socialLinks[key];
        if (!link || link.trim() === "") return;

        var label = labels[key] || key;

        html +=
            '<a class="social-btn" href="' +
            escapeAttr(link) +
            '" target="_blank" rel="noopener noreferrer">' +
            escapeHTML(label) +
            "</a>";
    });

    container.innerHTML = html || '<p class="empty-state">لا توجد روابط متاحة حاليًا.</p>';
}

/* -------------------------------------------------------------------------
   قائمة الهاتف (Mobile Menu)
------------------------------------------------------------------------- */
function setupMobileMenu() {
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("open");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* -------------------------------------------------------------------------
   السنة الحالية في الـ Footer
------------------------------------------------------------------------- */
function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}

/* -------------------------------------------------------------------------
   أدوات مساعدة (لمنع كسر الصفحة بسبب محتوى غير متوقع)
------------------------------------------------------------------------- */
function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeAttr(str) {
    if (typeof str !== "string") return "";
    return escapeHTML(str);
}
