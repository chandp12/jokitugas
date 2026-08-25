/**
 * Google Apps Script - Web App
 * Deploy sebagai Web App dengan akses "Anyone"
 */

const SPREADSHEET_ID = '15RMtdccbkBFPBLm0AR58xjhcPxKI8rR3HLFlxc6NL0E';
const SHEET_NAME = 'Pesanan';

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
        
        if (!sheet) {
            const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
            ss.insertSheet(SHEET_NAME);
            const newSheet = ss.getSheetByName(SHEET_NAME);
            const headers = [
                'Timestamp', 'Nama', 'WhatsApp', 'Universitas', 'Fakultas',
                'Program Studi', 'Semester', 'Mata Kuliah', 'Jenis Layanan',
                'Pertemuan', 'Deadline', 'Tingkat Kesulitan', 'Instruksi Tugas',
                'Link E-Learning', 'Catatan', 'File URL', 'Status'
            ];
            newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
            newSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
            appendData(newSheet, data);
        } else {
            appendData(sheet, data);
        }
        
        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);
            
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function appendData(sheet, data) {
    const row = [
        data.timestamp || new Date().toISOString(),
        data.nama || '',
        data.whatsapp || '',
        data.universitas || '',
        data.fakultas || '',
        data.program_studi || '',
        data.semester || '',
        data.mata_kuliah || '',
        data.jenis_layanan || '',
        data.pertemuan || '',
        data.deadline || '',
        data.tingkat_kesulitan || '',
        data.instruksi_tugas || '',
        data.link_elearning || '',
        data.catatan || '',
        data.file_url || '',
        data.status || 'Pesanan Baru'
    ];
    sheet.appendRow(row);
}

function doGet() {
    return ContentService
        .createTextOutput('Google Apps Script berjalan!')
        .setMimeType(ContentService.MimeType.TEXT);
}