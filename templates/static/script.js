// إضافة تأثيرات التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// إضافة تأثيرات الظهور عند التمرير
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.feature-card, .section-title, .rights-content, .footer-column').forEach(el => {
    observer.observe(el);
});

// إظهار اسم الملف عند الرفع
const fileInput = document.getElementById('image');
const fileLabel = document.querySelector('.file-upload-label span');

fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
        fileLabel.textContent = this.files[0].name;
        fileLabel.parentElement.querySelector('i').className = 'fas fa-check-circle';
        fileLabel.parentElement.querySelector('i').style.color = '#4CAF50';
    }
});

// تمكين سحب وإفلات الملفات
const dropArea = document.querySelector('.file-upload-label');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.style.borderColor = '#D4AF37';
    dropArea.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
}

function unhighlight() {
    dropArea.style.borderColor = 'rgba(212, 175, 55, 0.3)';
    dropArea.style.backgroundColor = 'rgba(20, 20, 20, 0.6)';
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files;
    
    if (files.length > 0) {
        fileLabel.textContent = files[0].name;
        dropArea.querySelector('i').className = 'fas fa-check-circle';
        dropArea.querySelector('i').style.color = '#4CAF50';
    }
}

// إضافة تأثيرات عند التحميل
window.addEventListener('load', () => {
    document.querySelectorAll('.animate').forEach(el => {
        el.style.opacity = '1';
    });
});
