// DUDUJAG lead endpoint for Google Apps Script
// 1) Create/open the Google Sheet named DUDUJAG
// 2) Copy the spreadsheet ID from its URL and paste it below
// 3) Deploy as Web App: Execute as Me, access Anyone
// 4) Send the /exec URL to OpenClaw so it can be connected to the DUDUJAG page

const SPREADSHEET_ID = 'PASTE_DUDUJAG_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Timestamp',
  'First name',
  'Last name',
  'Region',
  'Phone',
  'Source',
  'Page URL',
  'User agent'
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      service: 'DUDUJAG leads endpoint'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID === 'PASTE_DUDUJAG_SPREADSHEET_ID_HERE') {
      throw new Error('Missing DUDUJAG spreadsheet ID in Apps Script');
    }

    const body = e && e.postData && e.postData.contents
      ? e.postData.contents
      : '{}';

    const data = JSON.parse(body);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      data.ts || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.region || '',
      data.phone || '',
      data.source || 'DUDUJAG',
      data.pageUrl || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: String(err && err.message ? err.message : err)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
