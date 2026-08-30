# שאלון שביעות רצון - ד"ר דודו יגודייב

טופס שביעות רצון קצר לשליחה למטופלים אחרי טיפול. התשובות מיועדות להיכתב
אוטומטית לגיליון Google Sheets:

https://docs.google.com/spreadsheets/d/1NghViUEwnLqLv4cAblYyNiyFzjltRer13Y0mQP956C0/edit?usp=sharing

- `index.html` - עמוד הטופס עצמו
- `apps-script.gs` - הקוד שרץ בתוך Google Apps Script ומקבל את התשובות
- `README.md` - ההוראות האלה

## קישור לעמוד

העמוד פורסם ב-GitHub Pages כאן:

https://duduyag.github.io/DUDUJAG/drdudu.co.il/

## חיבור הטופס לגיליון

1. פותחים את הגיליון.
2. נכנסים ל-**Extensions -> Apps Script**.
3. מוחקים את הקוד הקיים ומדביקים את כל התוכן של `apps-script.gs`.
4. שומרים.
5. לוחצים **Deploy -> New deployment**.
6. ליד "Select type" לוחצים על גלגל השיניים ובוחרים **Web app**.
7. מגדירים:
   - **Execute as:** Me
   - **Who has access:** Anyone
8. לוחצים **Deploy** ומאשרים הרשאות.
9. מעתיקים את כתובת ה-Web app שמסתיימת ב-`/exec`.
10. מחליפים ב-`index.html` את:

```js
const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

בכתובת ה-Web app שקיבלת.

## עמודות הגיליון

הגיליון מסודר עם הכותרות:

- זמן שליחה
- איך שמעת עלינו
- מה הכריע להגיע אלינו
- דירוג שביעות רצון
- הערות
- כתובת העמוד
- דפדפן

## בדיקה

אחרי חיבור `SCRIPT_URL`, פותחים את העמוד, ממלאים את הטופס ושולחים. בגיליון
אמורה להופיע שורה חדשה בלשונית `Sheet1`.
