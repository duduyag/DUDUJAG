// DUDUJAG lead endpoint for Google Apps Script
// Recommended setup:
// 1) Open the Google Sheet named DUDUJAG
// 2) Go to Extensions → Apps Script
// 3) Paste this whole code into Code.gs
// 4) Deploy → New deployment → Web app
// 5) Execute as: Me; Who has access: Anyone
// 6) Send OpenClaw the /exec URL so it can be connected to the DUDUJAG page

// If this script is pasted from inside the DUDUJAG Google Sheet, leave this empty.
// If you create a standalone Apps Script, paste the spreadsheet ID here.
const SPREADSHEET_ID = '';
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

function getTargetSheet_() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error('No active spreadsheet found. Paste the spreadsheet ID into SPREADSHEET_ID.');
  }

  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

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
    const body = e && e.postData && e.postData.contents
      ? e.postData.contents
      : '{}';

    const data = JSON.parse(body);
    const sheet = getTargetSheet_();

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
