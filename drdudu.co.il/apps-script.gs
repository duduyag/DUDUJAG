/**
 * שאלון שביעות רצון - ד"ר דודו יגודייב
 * הקוד רץ בתוך Google Apps Script ומקבל את התשובות מהטופס ב-index.html.
 */

const SPREADSHEET_ID = '1q-2ykgkSbvvopJQUwcQLYnBw5pkYpV3OWlsk02eFoEU';
const SHEET_NAME = 'תשובות';
const HEADERS = [
  'התקבל בשרת',
  'חותמת זמן מהדפדפן',
  'איך שמע/ה עלינו',
  'מה הכריע את ההחלטה',
  'דירוג שביעות רצון',
  'הערות',
  'כתובת העמוד',
  'דפדפן'
];

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
      new Date(),
      data.timestamp || '',
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

function test_doPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'גוגל / חיפוש באינטרנט',
        reason: 'מוניטין / ביקורות',
        rating: '5',
        comments: 'בדיקה',
        pageUrl: 'https://duduyag.github.io/DUDUJAG/drdudu.co.il/',
        userAgent: 'Apps Script manual test'
      })
    }
  };

  doPost(fakeEvent);
}
