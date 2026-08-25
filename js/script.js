// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    adminWhatsApp: '6281385253051',
    googleAppsScriptUrl: 'https://script.google.com/macros/s/AKfycbzv3TS8D_WVDikhwhNEgkO_MYpmbKQ5CYx8acfHwSjhGyXMCN93auhzjhbFy2GDFvE2/exec'
};

// ========================================
// DOM ELEMENTS
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const form = document.getElementById('orderForm');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const toStep2 = document.getElementById('toStep2');
const toStep1 = document.getElementById('toStep1');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const stepProgress = document.getElementById('stepProgress');
const stepLabel = document.getElementById('stepLabel');

// ========================================
// NAVIGATION
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ========================================
// FAQ ACCORDION
// ========================================
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// FORM STEP NAVIGATION
// ========================================
function goToStep(step) {
    if (step === 1) {
        step1.style.display = 'block';
        step2.style.display = 'none';
        stepProgress.style.width = '50%';
        stepLabel.textContent = 'Langkah 1 dari 2';
    } else {
        step1.style.display = 'none';
        step2.style.display = 'block';
        stepProgress.style.width = '100%';
        stepLabel.textContent = 'Langkah 2 dari 2';
    }
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';
}

toStep2.addEventListener('click', () => {
    const nama = document.getElementById('nama');
    const whatsapp = document.getElementById('whatsapp');
    const universitas = document.getElementById('universitas');
    const prodi = document.getElementById('prodi');
    let valid = true;

    valid &= validateField(nama, 'namaError', 'Nama wajib diisi');
    valid &= validateField(whatsapp, 'whatsappError', 'Nomor WhatsApp wajib diisi');
    valid &= validateField(universitas, 'universitasError', 'Universitas wajib diisi');
    valid &= validateField(prodi, 'prodiError', 'Program Studi wajib diisi');

    if (valid) {
        goToStep(2);
    }
});

toStep1.addEventListener('click', () => {
    goToStep(1);
});

function validateField(input, errorId, message) {
    const error = document.getElementById(errorId);
    const group = input.closest('.form-group');
    if (!input.value.trim()) {
        group.classList.add('error');
        error.textContent = message;
        return false;
    } else {
        group.classList.remove('error');
        error.textContent = '';
        return true;
    }
}

// ========================================
// WHATSAPP NORMALIZATION
// ========================================
function normalizeWhatsApp(number) {
    let cleaned = number.replace(/\s/g, '').replace(/[^0-9+]/g, '');
    if (cleaned.startsWith('+')) {
        cleaned = cleaned.slice(1);
    }
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.slice(1);
    }
    if (!cleaned.startsWith('62')) {
        cleaned = '62' + cleaned;
    }
    return cleaned;
}

// ========================================
// FORM SUBMISSION - UPDATE
// ========================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const required = [
        'nama', 'whatsapp', 'universitas', 'prodi',
        'mataKuliah', 'jenisLayanan', 'deadline', 'instruksi', 'jenisTugas'
    ];
    let valid = true;

    required.forEach(id => {
        const input = document.getElementById(id);
        const errorId = id + 'Error';
        const label = input.previousElementSibling ? input.previousElementSibling.textContent.replace(' *', '').replace(' *', '') : id;
        valid &= validateField(input, errorId, `${label} wajib diisi`);
    });

    const whatsappInput = document.getElementById('whatsapp');
    const waError = document.getElementById('whatsappError');
    const waGroup = whatsappInput.closest('.form-group');
    const waNumber = normalizeWhatsApp(whatsappInput.value.trim());

    if (waNumber.length < 10 || waNumber.length > 15) {
        waGroup.classList.add('error');
        waError.textContent = 'Nomor WhatsApp tidak valid';
        valid = false;
    } else if (!waNumber.startsWith('62')) {
        waGroup.classList.add('error');
        waError.textContent = 'Nomor harus diawali 0 atau +62';
        valid = false;
    } else {
        waGroup.classList.remove('error');
        waError.textContent = '';
    }

    if (!valid) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Mohon lengkapi semua data yang diperlukan.';
        formStatus.style.display = 'block';
        return;
    }

    const data = {
        timestamp: new Date().toISOString(),
        nama: document.getElementById('nama').value.trim(),
        whatsapp: normalizeWhatsApp(document.getElementById('whatsapp').value.trim()),
        universitas: document.getElementById('universitas').value.trim(),
        fakultas: document.getElementById('fakultas').value.trim(),
        program_studi: document.getElementById('prodi').value.trim(),
        semester: document.getElementById('semester').value.trim(),
        mata_kuliah: document.getElementById('mataKuliah').value.trim(),
        jenis_layanan: document.getElementById('jenisLayanan').value,
        pertemuan: document.getElementById('pertemuan').value.trim(),
        deadline: document.getElementById('deadline').value,
        jenis_tugas: document.getElementById('jenisTugas').value,
        instruksi_tugas: document.getElementById('instruksi').value.trim(),
        link_elearning: document.getElementById('linkElearning').value.trim(),
        catatan: document.getElementById('catatan').value.trim(),
        file_url: '',
        status: 'Pesanan Baru'
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    try {
        const response = await fetch(CONFIG.googleAppsScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        formStatus.className = 'form-status success';
        formStatus.textContent = '✅ Data berhasil dikirim! Mengarahkan ke WhatsApp...';
        formStatus.style.display = 'block';

        const message = buildWhatsAppMessage(data);
        const waUrl = `https://wa.me/${CONFIG.adminWhatsApp}?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            window.open(waUrl, '_blank');
            setTimeout(() => {
                form.reset();
                goToStep(1);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesanan';
                formStatus.style.display = 'none';
                document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
            }, 3000);
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Gagal mengirim data. Silakan coba lagi.';
        formStatus.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesanan';
    }
});

// Update WhatsApp message
function buildWhatsAppMessage(data) {
    return `
Halo Admin, saya ingin melakukan pemesanan DiJokiin.site

DATA MAHASISWA
Nama: ${data.nama}
WhatsApp: ${data.whatsapp}
Universitas: ${data.universitas}
Fakultas: ${data.fakultas || '-'}
Program Studi: ${data.program_studi}
Semester: ${data.semester || '-'}

DETAIL PESANAN
Mata Kuliah: ${data.mata_kuliah}
Layanan: ${data.jenis_layanan}
Pertemuan: ${data.pertemuan || '-'}
Deadline: ${data.deadline}
Jenis Tugas: ${data.jenis_tugas}

DETAIL TUGAS
${data.instruksi_tugas}

Link E-Learning:
${data.link_elearning || '-'}

Catatan:
${data.catatan || '-'}

Mohon dibantu untuk pengecekan detail dan estimasi pengerjaannya.
`.trim();
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
document.querySelectorAll('.edu-item, .service-card, .step, .why-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.edu-item, .service-card, .step, .why-item').forEach(el => {
    fadeObserver.observe(el);
});

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = current + '+';
        }
    }, 30);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'statUniv') animateCounter(entry.target, 50);
            else if (id === 'statTasks') animateCounter(entry.target, 1000);
            else if (id === 'statHappy') {
                entry.target.textContent = '98%';
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
});

// ========================================
// DROPDOWN FIX - Default placeholder
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('select').forEach(select => {
        if (select.value === '') {
            const firstOption = select.querySelector('option');
            if (firstOption && firstOption.value === '') {
                firstOption.disabled = true;
                firstOption.selected = true;
            }
        }
    });
});

// ========================================
// FILE UPLOAD HANDLER (opsional)
// ========================================
document.getElementById('fileUpload')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File terlalu besar! Maksimal 10MB.');
            this.value = '';
        }
    }
});

console.log('✅ AcademicEase loaded successfully!');