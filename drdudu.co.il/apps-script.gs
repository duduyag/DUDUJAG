const SPREADSHEET_ID = '1NghViUEwnLqLv4cAblYyNiyFzjltRer13Y0mQP956C0';
const SHEET_NAME = 'Sheet1';
const HEADERS = ['זמן שליחה','איך שמעת עלינו','מה הכריע להגיע אלינו','דירוג שביעות רצון','הערות','כתובת העמוד','דפדפן'];

function ensureSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];

  if (current.join('') === '') {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'drdudu satisfaction endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(body);
    const sheet = ensureSheet_();

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.source || '',
      data.reason || '',
      data.rating || '',
      data.comments || '',
      data.pageUrl || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
