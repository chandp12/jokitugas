# AcademicEase - Student Academic Assistance Platform

Platform bantuan tugas dan e-learning untuk mahasiswa dari berbagai universitas di Indonesia.

## ✨ Fitur
- Form pemesanan dengan 2 langkah
- Validasi JavaScript real-time
- Pengiriman data ke Google Sheets via Google Apps Script
- Integrasi WhatsApp otomatis
- Responsive untuk semua device
- SEO-friendly

## 🚀 Cara Setup

### 1. Setup Google Sheets & Google Apps Script

1. Buka [Google Sheets](https://sheets.google.com) dan buat spreadsheet baru
2. Buka **Extensions > Apps Script**
3. Salin semua kode dari `google-apps-script/Code.gs`
4. Ganti `SPREADSHEET_ID` dengan ID spreadsheet Anda
5. Deploy sebagai **Web App**:
   - Klik **Deploy > New Deployment**
   - Pilih **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy**
6. Copy URL Web App

### 2. Konfigurasi Website

1. Buka `js/script.js`
2. Ganti `GOOGLE_APPS_SCRIPT_URL` dengan URL Web App Anda
3. Ganti `ADMIN_WHATSAPP_NUMBER` dengan nomor admin (format: 628xxxxxxxxx)

### 3. Deploy Website

#### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main