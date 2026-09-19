/* Projects data + rendering.
   To add a project: append an object to PROJECTS. It appears on projects.html automatically,
   and on the home page too when featured: true (first 3 featured are shown there).
   visual: name of a mockup in VISUALS, or null (generic placeholder).
   images: optional [{ src, he, en }] real screenshots (he/en = alt text). Put files in assets/projects/<id>/.
   DETAILS[id] holds the text and tech stack for the project's own page (project.html?id=<id>). */
(function () {
  const WA = 'https://wa.me/972542332845';

  const LABELS = {
    he: {
      challenge: 'האתגר', solution: 'הפתרון', result: 'התוצאה',
      all: 'הכל', bot: 'בוטים', system: 'מערכות ניהול', ai: 'עוזרי AI', integration: 'חיבורים ואינטגרציות',
      details: 'פרטי הפרויקט', hide: 'סגירה',
      filterLabel: 'סינון פרויקטים לפי סוג',
      ghostKicker: 'החלק הבא',
      ghostTitle: 'הפרויקט הבא יכול להיות שלכם',
      ghostText: 'ספרו במשפט אחד מה חוזר אצלכם כל יום.',
      ghostBtn: 'פתחו שיחה בוואטסאפ',
      preview: 'תצוגה של המערכת',
      view: 'לעמוד הפרויקט', back: 'כל הפרויקטים', next: 'הפרויקט הבא',
      what: 'מה הפרויקט', audience: 'מי קהל היעד', stack: 'הסט הטכנולוגי', goal: 'מה המטרה',
      saves: 'איך זה חוסך זמן', resultTitle: 'התוצאה',
      ctaTitle: 'יש לכם בעיה דומה?', ctaText: 'ספרו במשפט אחד מה חוזר אצלכם כל יום, ונחשוב יחד איך לפתור אותה.',
      ctaBtn: 'פתחו שיחה בוואטסאפ', shot: 'תמונה', of: 'מתוך', screenshots: 'תמונות מהפרויקט',
    },
    en: {
      challenge: 'Challenge', solution: 'Solution', result: 'Results',
      all: 'All', bot: 'Bots', system: 'Management systems', ai: 'AI assistants', integration: 'Integrations',
      details: 'Project details', hide: 'Close',
      filterLabel: 'Filter projects by type',
      ghostKicker: 'Next piece',
      ghostTitle: 'The next project could be yours',
      ghostText: 'Tell me in one sentence what keeps repeating in your day.',
      ghostBtn: 'Start a WhatsApp chat',
      preview: 'System preview',
      view: 'View project', back: 'All projects', next: 'Next project',
      what: 'What it is', audience: 'Who it is for', stack: 'Tech stack', goal: 'The goal',
      saves: 'How it saves time', resultTitle: 'The result',
      ctaTitle: 'Have a similar problem?', ctaText: 'Tell me in one sentence what keeps repeating in your day, and we will think together about how to solve it.',
      ctaBtn: 'Start a WhatsApp chat', shot: 'Image', of: 'of', screenshots: 'Project images',
    },
  };

  const PROJECTS = [
    {
      id: 'print-manager', types: ['system'], featured: true, visual: 'mock3d',
      tags: ['Airtable', 'n8n', 'Web App', 'Automation'],
      he: {
        client: 'ניר, בעל עסק להדפסות תלת-מימד',
        title: 'מערכת ניהול הדפסות<br>תלת-מימד',
        challenge: 'ניר לא הצליח לנהל את המלאי, לעקוב אחרי הפרויקטים וההדפסות. הוא לא ידע אילו חומרים עומדים להגמר ואילו פרויקטים נמצאים בתהליך.',
        solution: 'בנינו מערכת מרכזית שמאפשרת ניהול מלאי, מעקב סטטוס הדפסות והמלצות חכמות. הכל במקום אחד, בזמן אמת, עם ממשק פשוט וברור.',
        results: ['ניהול מלאי מדויק יותר', 'מעקב בזמן אמת', 'חיסכון בזמן עבודה', 'פחות טעויות ואובדן חומרים'],
      },
      en: {
        client: 'Nir, 3D Printing Business Owner',
        title: '3D Printing<br>Management System',
        challenge: "Nir struggled to manage inventory, track projects and print jobs. He didn't know which materials were running low or which projects were in progress.",
        solution: 'We built a central system for inventory management, print status tracking, and smart recommendations, all in one place, in real time, with a simple and clear interface.',
        results: ['More accurate inventory management', 'Real-time tracking', 'Saved work hours', 'Fewer errors and material loss'],
      },
    },
    {
      id: 'status-bot', types: ['bot'], featured: true, visual: 'mocktg2',
      tags: ['Telegram', 'n8n', 'Airtable', 'API', 'Automation'],
      he: {
        client: 'חנות אונליין למוצרי עיצוב',
        title: 'בוט סטטוס<br>משימות חכם',
        challenge: 'ללקוחות שלחו עשרות הודעות ביום לשאול על סטטוס הזמנה. זה יצר עומס, בזבז זמן וגרם לחוויית שירות לקויה.',
        solution: 'בנינו בוט חכם ב-Telegram שמאפשר ללקוחות לברר סטטוס הזמנה, לקבל עדכונים אוטומטיים בזמן ולקבל מענה מיידי.',
        results: ['ירידה של 80% בהודעות', 'שירות 24/7 ללקוחות', 'חיסכון משמעותי בזמן', 'שביעות רצון גבוהה יותר'],
      },
      en: {
        client: 'Online Design Products Store',
        title: 'Smart Task<br>Status Bot',
        challenge: 'Customers were sending dozens of messages a day asking about order status. This created overload, wasted time, and led to a poor service experience.',
        solution: 'We built a smart Telegram bot that lets customers check order status, receive automatic updates on time, and get immediate responses.',
        results: ['80% drop in support messages', '24/7 customer service', 'Significant time savings', 'Higher customer satisfaction'],
      },
    },
    {
      id: 'trainer-bot', types: ['bot', 'ai'], featured: true, visual: 'mocktg',
      tags: ['OpenAI', 'n8n', 'WhatsApp', 'Airtable', 'Automation'],
      he: {
        client: 'מאמן כושר אישי',
        title: 'מאמן כושר<br>אישי דיגיטלי',
        challenge: 'המאמן השקיע שעות בכל שבוע במענה ללקוחות, שליחת תוכניות ומעקב אחרי אימונים. זה גזל זמן ממה שחשוב באמת.',
        solution: 'בנינו עוזר AI שמנהל את התקשורת עם המתאמנים, שולח תוכניות מותאמות, עוקב אחרי התקדמות ומזכיר תזכורות באופן אוטומטי.',
        results: ['חיסכון שעות עבודה בשבוע', 'זמן לאימונים ופיתוח עסק', 'מעקב אישי לכל מתאמן', 'שביעות רצון גבוהה יותר'],
      },
      en: {
        client: 'Personal Fitness Trainer',
        title: 'Digital Personal<br>Fitness Trainer',
        challenge: 'The trainer spent hours each week responding to clients, sending workout plans, and tracking training sessions. This took time away from what really matters.',
        solution: 'We built an AI assistant that manages communication with trainees, sends personalized plans, tracks progress, and sends reminders automatically.',
        results: ['Saved hours of work per week', 'More time for training and business growth', 'Personal tracking for each trainee', 'Higher satisfaction'],
      },
    },
    {
      id: 'shift-scheduler', types: ['system'], featured: false, visual: 'mockshifts',
      tags: ['Web App', 'Automation'],
      he: {
        client: 'עסק עם צוות שעובד במשמרות',
        title: 'מערכת שמקצה<br>עובדים למשמרות',
        challenge: 'סידור העבודה נעשה ידנית, מול הזמינות והאילוצים של כל עובד. זה לקח שעות בכל שבוע וגרם לטעויות ולחוסר בהירות בצוות.',
        solution: 'בנינו מערכת שמקצה עובדים למשמרות לפי זמינות ואילוצים, ומציגה לכל הצוות סידור עבודה ברור.',
        results: ['שיבוץ מהיר יותר', 'אילוצים והעדפות נלקחים בחשבון', 'סידור עבודה ברור לכולם', 'פחות טעויות בשיבוץ'],
      },
      en: {
        client: 'A business with a shift-based team',
        title: 'A System that Assigns<br>Employees to Shifts',
        challenge: "The work schedule was built by hand, around each employee's availability and constraints. It took hours every week and led to mistakes and confusion in the team.",
        solution: 'We built a system that assigns employees to shifts based on availability and constraints, and shows the whole team a clear schedule.',
        results: ['Faster scheduling', 'Constraints and preferences are taken into account', 'A clear schedule for everyone', 'Fewer scheduling mistakes'],
      },
    },
    {
      id: 'monday-sync', types: ['integration'], featured: false, visual: 'mockboard',
      tags: ['monday.com', 'API', 'n8n', 'Automation'],
      he: {
        client: 'עסק שמנהל משימות ב-monday',
        title: 'חיבור ל-monday<br>שמתעדכן לבד',
        challenge: 'הצוות עדכן סטטוסים ידנית בכמה מקומות במקביל, ולפעמים כל מקום הראה מצב אחר.',
        solution: 'חיברנו את הלוח ב-monday לשאר הכלים בעסק, כך ששינוי במקום אחד מתעדכן אוטומטית בשאר.',
        results: ['מקור אחד לאמת', 'פחות עדכונים ידניים', 'פחות טעויות ופערי מידע'],
      },
      en: {
        client: 'A business that manages tasks in monday',
        title: 'A monday Integration<br>that Updates Itself',
        challenge: 'The team updated statuses by hand in several places at once, and sometimes each place showed a different state.',
        solution: 'We connected the monday board to the rest of the business tools, so a change in one place updates the others automatically.',
        results: ['One source of truth', 'Fewer manual updates', 'Fewer mistakes and information gaps'],
      },
    },
    {
      id: 'sheets-api', types: ['integration'], featured: false, visual: 'mocksheets',
      tags: ['Google Sheets', 'API', 'n8n', 'Automation'],
      he: {
        client: 'עסק שמנהל נתונים בגיליונות',
        title: 'חיבור API<br>ל-Google Sheets',
        challenge: 'נתונים הגיעו ממערכות שונות והועתקו לגיליון ידנית, שוב ושוב.',
        solution: 'בנינו חיבור API שמזין את הגיליון אוטומטית בפורמט קבוע ומסודר, וקורא ממנו כשצריך.',
        results: ['בלי העתקה ידנית', 'נתונים מעודכנים', 'פחות טעויות הקלדה'],
      },
      en: {
        client: 'A business that manages data in spreadsheets',
        title: 'An API Connection<br>to Google Sheets',
        challenge: 'Data arrived from different systems and was copied into a spreadsheet by hand, over and over.',
        solution: 'We built an API connection that feeds the sheet automatically in a fixed, tidy format, and reads from it when needed.',
        results: ['No manual copying', 'Up-to-date data', 'Fewer typing mistakes'],
      },
    },
  ];

  const DETAILS = {
    'print-manager': {
      stack: [
        { name: 'Airtable', he: 'בסיס הנתונים של המלאי וההדפסות', en: 'The database for inventory and print jobs' },
        { name: 'n8n', he: 'האוטומציות והחיבורים', en: 'Automations and connections' },
        { name: 'Web App', he: 'הממשק שבו עובדים כל יום', en: 'The interface used every day' },
      ],
      he: {
        what: 'מערכת ניהול מרכזית לעסק הדפסות תלת-מימד: מלאי גלילי החומר, סטטוס ההדפסות והפרויקטים במקום אחד, עם המלצות חכמות.',
        audience: 'בעלי עסקים קטנים ובתי מלאכה שמדפיסים בתלת-מימד ומנהלים במקביל גלילי חומר, לקוחות והדפסות.',
        goal: 'לדעת בכל רגע מה יש במלאי ומה קורה בכל הדפסה, בלי לרדוף אחרי הפרטים.',
        saves: 'אין יותר בדיקות ידניות של המלאי ורישום ההדפסות בכמה מקומות. הכל מתעדכן במקום אחד, וההמלצות עוזרות להבין מתי כדאי להשלים חומר.',
      },
      en: {
        what: 'A central management system for a 3D printing business: filament inventory, print status and projects in one place, with smart recommendations.',
        audience: 'Small businesses and workshops that 3D print and manage filament, customers and print jobs at the same time.',
        goal: 'To know at any moment what is in stock and what is happening with every print, without chasing details.',
        saves: 'No more manual stock checks or logging prints in several places. Everything updates in one place, and the recommendations help decide when to restock.',
      },
    },
    'status-bot': {
      stack: [
        { name: 'Telegram', he: 'ממשק הבוט ללקוחות', en: 'The bot interface for customers' },
        { name: 'n8n', he: 'הלוגיקה והאוטומציות', en: 'Logic and automations' },
        { name: 'Airtable', he: 'נתוני ההזמנות והסטטוסים', en: 'Order and status data' },
        { name: 'API', he: 'החיבור בין הבוט לנתונים', en: 'The link between the bot and the data' },
      ],
      he: {
        what: 'בוט טלגרם שעונה ללקוחות על סטטוס הזמנה, שולח עדכונים אוטומטיים ומאפשר לפתוח קריאה.',
        audience: 'חנויות אונליין ועסקים קטנים שהלקוחות שלהם שואלים שוב ושוב איפה ההזמנה.',
        goal: 'להעביר את שאלות הסטטוס לבוט, כדי שלקוחות יקבלו תשובה מיד והצוות יתפנה לעבודה.',
        saves: 'הבוט עונה במקום הצוות, בכל שעה, על השאלות שחוזרות. במקום עשרות הודעות ביום, הצוות מטפל רק במה שבאמת דורש אדם.',
      },
      en: {
        what: 'A Telegram bot that answers customers about order status, sends automatic updates and lets them open a ticket.',
        audience: 'Online stores and small businesses whose customers keep asking where their order is.',
        goal: 'To move status questions to the bot, so customers get an answer right away and the team can get back to work.',
        saves: 'The bot answers in place of the team, at any hour, the questions that keep coming back. Instead of dozens of messages a day, the team handles only what truly needs a person.',
      },
    },
    'trainer-bot': {
      stack: [
        { name: 'OpenAI', he: 'הבנת הודעות וניסוח תשובות', en: 'Understanding messages and writing replies' },
        { name: 'n8n', he: 'האוטומציות והתזכורות', en: 'Automations and reminders' },
        { name: 'WhatsApp', he: 'ערוץ תקשורת עם המתאמנים', en: 'A channel to reach trainees' },
        { name: 'Airtable', he: 'נתוני המתאמנים וההתקדמות', en: 'Trainee data and progress' },
      ],
      he: {
        what: 'עוזר AI שמנהל את התקשורת עם המתאמנים: שולח סיכומי אימונים, מתעד משקל וצעדים ומזכיר תזכורות.',
        audience: 'מאמני כושר אישיים ובעלי סטודיו קטנים שמלווים מתאמנים אחד-אחד.',
        goal: 'לתת לכל מתאמן ליווי אישי יומיומי, בלי שהמאמן יצטרך להיות זמין לכל הודעה.',
        saves: 'התוכניות, התזכורות והמעקב נשלחים אוטומטית. המאמן חוסך שעות בשבוע של מענה ידני ומעקב, ומקדיש אותן לאימונים ולפיתוח העסק.',
      },
      en: {
        what: 'An AI assistant that manages communication with trainees: it sends workout summaries, logs weight and steps, and sends reminders.',
        audience: 'Personal trainers and small studio owners who coach trainees one on one.',
        goal: 'To give every trainee daily personal guidance, without the trainer having to be available for every message.',
        saves: 'Plans, reminders and tracking go out automatically. The trainer saves hours every week of manual replies and follow-up, and spends them on training and growing the business.',
      },
    },
    'shift-scheduler': {
      stack: [
        { name: 'Web App', he: 'הממשק לשיבוץ ולצפייה בסידור', en: 'The interface for scheduling and viewing the roster' },
        { name: 'Automation', he: 'חישוב השיבוץ לפי אילוצים', en: 'Calculating the schedule from constraints' },
      ],
      he: {
        what: 'מערכת שמקצה עובדים למשמרות לפי זמינות ואילוצים, ומציגה לכל הצוות סידור עבודה ברור.',
        audience: 'עסקים עם צוות שעובד במשמרות, שבונים סידור עבודה שבועי.',
        goal: 'להפוך את סידור העבודה השבועי ממשימה של שעות לפעולה קצרה.',
        saves: 'המערכת מחשבת את השיבוץ בעצמה ומתחשבת באילוצים, במקום שיבנו אותו ידנית כל שבוע.',
      },
      en: {
        what: 'A system that assigns employees to shifts based on availability and constraints, and shows the whole team a clear schedule.',
        audience: 'Businesses with a shift-based team that build a weekly work schedule.',
        goal: 'To turn the weekly schedule from a task of hours into a short action.',
        saves: 'The system calculates the schedule itself and takes constraints into account, instead of it being built by hand every week.',
      },
    },
    'monday-sync': {
      stack: [
        { name: 'monday.com', he: 'לוח המשימות של הצוות', en: "The team's task board" },
        { name: 'API', he: 'החיבור בין הכלים', en: 'The link between the tools' },
        { name: 'n8n', he: 'האוטומציות שמעבירות את העדכונים', en: 'Automations that pass the updates along' },
      ],
      he: {
        what: 'חיבור בין לוח ה-monday של העסק לשאר הכלים, כך שסטטוסים ומשימות מתעדכנים בין המערכות אוטומטית.',
        audience: 'צוותים שמנהלים עבודה ב-monday ומשתמשים גם בכלים נוספים.',
        goal: 'שכל הצוות יראה את אותו מצב, בלי לעדכן את אותו דבר בכמה מקומות.',
        saves: 'שינוי בלוח מתעדכן לבד בשאר הכלים, ואין צורך להעתיק סטטוסים ידנית.',
      },
      en: {
        what: "A connection between the business's monday board and its other tools, so statuses and tasks update between the systems automatically.",
        audience: 'Teams that manage work in monday and also use other tools.',
        goal: 'For the whole team to see the same picture, without updating the same thing in several places.',
        saves: 'A change on the board updates the other tools on its own, with no need to copy statuses by hand.',
      },
    },
    'sheets-api': {
      stack: [
        { name: 'Google Sheets', he: 'הגיליון שבו עובדים', en: 'The spreadsheet people work in' },
        { name: 'API', he: 'החיבור למערכות המקור', en: 'The link to the source systems' },
        { name: 'n8n', he: 'האוטומציה שמזינה את הנתונים', en: 'The automation that feeds the data' },
      ],
      he: {
        what: 'חיבור API שמזין גיליון Google Sheets בנתונים ממערכות אחרות, אוטומטית ובפורמט קבוע.',
        audience: 'עסקים שמנהלים דוחות ונתונים בגיליונות ומקבלים מידע ממערכות שונות.',
        goal: 'שהגיליון יהיה תמיד מעודכן, בלי העתקה ידנית.',
        saves: 'הנתונים נכנסים לגיליון לבד, וחוסכים את ההעתקה החוזרת ואת בדיקת הטעויות.',
      },
      en: {
        what: 'An API connection that feeds a Google Sheet with data from other systems, automatically and in a fixed format.',
        audience: 'Businesses that manage reports and data in spreadsheets and receive information from different systems.',
        goal: 'For the sheet to always be up to date, without manual copying.',
        saves: 'The data enters the sheet on its own, saving the repeated copying and the checking for mistakes.',
      },
    },
  };

  const VISUALS = {
    mock3d: {
      chrome: 'd-printer-manager.web.app', wrap: 'mock-3d-wrap',
      html: `<div class="mock-3d">
        <div class="m3-head"><button class="m3-new-btn" tabindex="-1">+ גליל חדש</button><div class="m3-search">חפש צבע, חומר, מותג...</div><div class="m3-chips"><span>PLA</span><span class="active">PETG</span><span>TPU</span><span>PLA HS</span></div></div>
        <div class="m3-grid">
          <div class="m3-card"><div class="m3-row"><span class="m3-pct">100%</span><span class="m3-tag pla">PLA</span><span class="m3-name">Isanmate black</span><span class="m3-dot" style="background:#111;border:1px solid #444"></span></div><div class="m3-bar"><div style="width:100%"></div></div><div class="m3-foot"><span>0 פריקטים</span><span>1000g</span></div></div>
          <div class="m3-card"><div class="m3-row"><span class="m3-pct">96%</span><span class="m3-tag pla">PLA</span><span class="m3-name">Silk matte black</span><span class="m3-dot" style="background:#222;border:1px solid #444"></span></div><div class="m3-bar"><div style="width:96%"></div></div><div class="m3-foot"><span>1 פריקטים</span><span>2400g</span></div></div>
          <div class="m3-card"><div class="m3-row"><span class="m3-pct">100%</span><span class="m3-tag pla">PLA</span><span class="m3-name">Yellow</span><span class="m3-dot" style="background:#F6D32D"></span></div><div class="m3-bar"><div style="width:100%"></div></div><div class="m3-foot"><span>0 פריקטים</span><span>700g</span></div></div>
          <div class="m3-card"><div class="m3-row"><span class="m3-pct">100%</span><span class="m3-tag petg">PETG</span><span class="m3-name">Petg White</span><span class="m3-dot" style="background:#eee"></span></div><div class="m3-bar"><div style="width:100%"></div></div><div class="m3-foot"><span>0 פריקטים</span><span>780g</span></div></div>
          <div class="m3-card"><div class="m3-row"><span class="m3-pct">100%</span><span class="m3-tag pla">PLA</span><span class="m3-name">Pla gray matte</span><span class="m3-dot" style="background:#888"></span></div><div class="m3-bar"><div style="width:100%"></div></div><div class="m3-foot"><span>0 פריקטים</span><span>1000g</span></div></div>
          <div class="m3-card"><div class="m3-row"><span class="m3-pct low">74%</span><span class="m3-tag plahs">PLA HS</span><span class="m3-name">HS PLA black</span><span class="m3-dot" style="background:#1a1a1a;border:1px solid #444"></span></div><div class="m3-bar"><div style="width:74%;background:#F6A321"></div></div><div class="m3-foot"><span>1 פריקטים</span><span>1485g</span></div></div>
        </div>
      </div>`,
    },
    mockshifts: {
      chrome: 'Shift Planner', wrap: 'mock-shift-wrap',
      html: `<div class="mock-shift">
        <div class="sh-head"><span class="sh-title">סידור עבודה · שבוע 12</span><span class="sh-btn">שבץ אוטומטית</span></div>
        <div class="sh-grid">
          <span></span><b>א׳</b><b>ב׳</b><b>ג׳</b><b>ד׳</b><b>ה׳</b>
          <em>דנה</em><i class="m">בוקר</i><i class="m">בוקר</i><i></i><i class="e">ערב</i><i class="e">ערב</i>
          <em>יוסי</em><i class="e">ערב</i><i></i><i class="m">בוקר</i><i class="m">בוקר</i><i></i>
          <em>מיכל</em><i></i><i class="e">ערב</i><i class="e">ערב</i><i></i><i class="m">בוקר</i>
          <em>עמית</em><i class="m">בוקר</i><i></i><i class="e">ערב</i><i class="e">ערב</i><i class="m">בוקר</i>
          <em>נועה</em><i class="e">ערב</i><i class="m">בוקר</i><i class="m">בוקר</i><i></i><i class="e">ערב</i>
        </div>
        <div class="sh-foot"><span><u class="m"></u>בוקר</span><span><u class="e"></u>ערב</span><span class="sh-ok">כל האילוצים מולאו ✓</span></div>
      </div>`,
    },
    mockboard: {
      chrome: 'Team Board', wrap: 'mock-board-wrap',
      html: `<div class="mock-board">
        <div class="bd-head"><span class="bd-title">לוח משימות</span><span class="bd-sync">מסונכרן ✓</span></div>
        <div class="bd-group"><span class="bd-dot o"></span>בתהליך</div>
        <div class="bd-row"><span>הצעת מחיר ללקוח</span><i class="st o">בעבודה</i><i class="av">ד</i></div>
        <div class="bd-row"><span>הזמנת חומרים</span><i class="st r">תקוע</i><i class="av">י</i></div>
        <div class="bd-row"><span>תיאום משלוח</span><i class="st o">בעבודה</i><i class="av">מ</i></div>
        <div class="bd-group"><span class="bd-dot g"></span>הושלם</div>
        <div class="bd-row"><span>שליחת חשבונית</span><i class="st g">הושלם</i><i class="av">ע</i></div>
        <div class="bd-row"><span>עדכון לקוח</span><i class="st g">הושלם</i><i class="av">נ</i></div>
      </div>`,
    },
    mocksheets: {
      chrome: 'Google Sheets', wrap: 'mock-sheets-wrap',
      html: `<div class="mock-sheets">
        <div class="sx-head"><span class="sx-api">API</span><span class="sx-arrow">→</span><span class="sx-title">הזמנות</span><span class="sx-time">עודכן לפני 2 דק׳</span></div>
        <div class="sx-grid">
          <b></b><b>A</b><b>B</b><b>C</b><b>D</b>
          <b>1</b><u>תאריך</u><u>מס׳ הזמנה</u><u>סכום</u><u>סטטוס</u>
          <b>2</b><span>12/03</span><span>#1041</span><span>₪ 320</span><span class="ok">שולם</span>
          <b>3</b><span>12/03</span><span>#1042</span><span>₪ 185</span><span class="ok">שולם</span>
          <b>4</b><span>13/03</span><span>#1043</span><span>₪ 540</span><span class="wait">ממתין</span>
          <b>5</b><span>13/03</span><span>#1044</span><span>₪ 260</span><span class="ok">שולם</span>
          <b>6</b><span class="new">14/03</span><span class="new">#1045</span><span class="new">₪ 410</span><span class="new wait">ממתין</span>
        </div>
      </div>`,
    },
    mocktg2: {
      chrome: 'Telegram Bot', wrap: 'mock-tg2-wrap',
      html: `<div class="mock-tg2">
        <div class="tg2-head"><div class="tg2-back">‹</div><div class="tg2-av">T</div><div class="tg2-info"><div class="tg2-name">Team Assistant</div><div class="tg2-sub">בוט</div></div></div>
        <div class="tg2-msgs"><div class="tg2-bubble">👋 שבוע טוב!<br>איך אפשר לעזור לך היום?<div class="tg2-ts">09:00</div></div></div>
        <div class="tg2-btns"><span class="tg2-btn">פתיחת קריאה</span><span class="tg2-btn">סטטוס משימות</span><span class="tg2-btn">דוחות יומיים</span></div>
        <div class="tg2-input">הודעה</div>
      </div>`,
    },
    mocktg: {
      chrome: 'Telegram · Personal Trainer Bot', wrap: 'mock-tg-wrap',
      html: `<div class="mock-tg">
        <div class="tg-head"><div class="tg-av">PT</div><div class="tg-head-info"><div class="tg-bot-name">Personal Trainer</div><div class="tg-bot-sub">בוט</div></div></div>
        <div class="tg-msgs">
          <div class="tg-msg tg-in"><div class="tg-bubble">📊 סיכום שבוע 14–20 ביוני<br><span class="tg-dim">ראשון–שלישי, התחלה חזקה:</span><br>• ראשון: 31 דק׳ | ✅ 5,723 צעדים<br>• שני: 59 דק׳ | ✅ 9,368 צעדים</div><div class="tg-time">13:00</div></div>
          <div class="tg-msg tg-out"><div class="tg-bubble">/weight 71.40</div><div class="tg-time">8:07 ✓✓</div></div>
          <div class="tg-msg tg-in"><div class="tg-bubble">71.4kg (−1.1kg) 🎉</div><div class="tg-time">8:07</div></div>
        </div>
        <div class="tg-input-bar"><span>כתוב הודעה...</span></div>
      </div>`,
    },
  };

  let activeFilter = 'all';
  let slideIndex = 0;

  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'he');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nodeId = (p) => 'PIECE ' + String(PROJECTS.indexOf(p) + 1).padStart(2, '0');
  const stripBr = (s) => s.replace(/<br>/g, ' ');
  const href = (p) => 'project.html?id=' + encodeURIComponent(p.id);

  function placeholder(p) {
    return `<div class="frame-body ph" aria-hidden="true">
      <svg viewBox="0 0 320 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <path d="M70 210 C 120 210, 120 90, 160 90 S 200 210, 250 210" fill="none" stroke="#2F6BFF" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="4 5"/>
        <circle cx="70" cy="210" r="9" fill="#0B1126" stroke="#2F6BFF" stroke-width="2"/>
        <circle cx="160" cy="90" r="11" fill="#0B1126" stroke="#FF7A1A" stroke-width="2"/><circle cx="160" cy="90" r="4" fill="#FF7A1A"/>
        <circle cx="250" cy="210" r="9" fill="#0B1126" stroke="#2F6BFF" stroke-width="2"/>
      </svg>
      <span class="ph-type">${esc(p.types[0].toUpperCase())}</span>
    </div>`;
  }

  function visualHTML(p, t) {
    const v = VISUALS[p.visual];
    if (!v) {
      return `<div class="frame" role="img" aria-label="${esc(stripBr(p[lang()].title))}">${placeholder(p)}</div>`;
    }
    return `<div class="frame" role="img" aria-label="${esc(stripBr(p[lang()].title) + ', ' + t.preview)}">
      <div class="frame-chrome" aria-hidden="true"><div class="chrome-dots"><span></span><span></span><span></span></div><div class="chrome-url">${esc(v.chrome)}</div></div>
      <div class="frame-body ${v.wrap}" aria-hidden="true">${v.html}</div>
    </div>`;
  }

  const tagsHTML = (p) => `<ul class="tags">${p.tags.map((x) => `<li class="tag">${esc(x)}</li>`).join('')}</ul>`;
  const typesHTML = (p, t) => `<span class="type-tags">${p.types.map((x) => `<span class="type-tag">${esc(t[x])}</span>`).join('')}</span>`;
  const resultsHTML = (c, limit) => `<ul class="results">${c.results.slice(0, limit || 99).map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
  const linkHTML = (p, t, cls) => `<a class="btn-text ${cls}" href="${href(p)}">${t.view}<span class="arrow" aria-hidden="true"></span></a>`;

  /* Home: preview card */
  function fullCard(p, t, delay) {
    const c = p[lang()];
    return `<article class="project fade-up" id="p-${p.id}" style="--delay:${delay}s">
      <div class="project-main">
        <header class="project-head">
          <div class="project-meta"><span class="node-id">${nodeId(p)}</span>${typesHTML(p, t)}</div>
          <p class="project-client">${esc(c.client)}</p>
          <h3 class="project-title"><a href="${href(p)}">${c.title}</a></h3>
        </header>
        <p class="project-summary">${esc(c.solution)}</p>
        ${resultsHTML(c, 3)}
        ${tagsHTML(p)}
        ${linkHTML(p, t, 'project-link')}
      </div>
      <a class="project-visual" href="${href(p)}" tabindex="-1" aria-hidden="true">${visualHTML(p, t)}</a>
    </article>`;
  }

  /* Projects page: compact tile */
  function tileCard(p, t, delay) {
    const c = p[lang()];
    return `<article class="tile fade-up" id="p-${p.id}" style="--delay:${delay}s">
      <a class="tile-stage" href="${href(p)}" tabindex="-1" aria-hidden="true">${visualHTML(p, t)}</a>
      <div class="tile-body">
        <div class="project-meta"><span class="node-id">${nodeId(p)}</span>${typesHTML(p, t)}</div>
        <p class="project-client">${esc(c.client)}</p>
        <h3 class="project-title"><a href="${href(p)}">${c.title}</a></h3>
        <p class="tile-result">${esc(c.results[0])}</p>
        ${tagsHTML(p)}
        ${linkHTML(p, t, 'tile-link')}
      </div>
    </article>`;
  }

  function ghostTile(t, delay) {
    return `<a class="tile tile-ghost fade-up" href="${WA}" target="_blank" rel="noopener" data-wa-source="projects_ghost" style="--delay:${delay}s">
      <span class="node-id">${t.ghostKicker}</span>
      <span class="project-title">${t.ghostTitle}</span>
      <span class="ghost-text">${t.ghostText}</span>
      <span class="btn-primary ghost-btn">${t.ghostBtn}</span>
    </a>`;
  }

  function renderFilters(el, t) {
    const present = ['bot', 'system', 'ai', 'integration'].filter((k) => PROJECTS.some((p) => p.types.includes(k)));
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', t.filterLabel);
    el.innerHTML = ['all'].concat(present)
      .map((k) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${k === activeFilter}">${t[k]}</button>`)
      .join('');
  }

  /* Project page */
  function slidesOf(p) {
    const list = [];
    if (VISUALS[p.visual] || !(p.images && p.images.length)) list.push({ type: 'mock' });
    (p.images || []).forEach((im) => list.push({ type: 'img', src: im.src, alt: im[lang()] || '' }));
    return list;
  }

  function galleryHTML(p, t) {
    const slides = slidesOf(p);
    if (slideIndex >= slides.length) slideIndex = 0;
    const cur = slides[slideIndex];
    const stage = cur.type === 'mock'
      ? visualHTML(p, t)
      : `<img class="gallery-img" src="${esc(cur.src)}" alt="${esc(cur.alt)}">`;
    const thumbs = slides.length < 2 ? '' : `<div class="gallery-thumbs" role="group" aria-label="${t.screenshots}">${slides.map((s, i) => `
      <button type="button" class="gallery-thumb" data-slide="${i}" aria-pressed="${i === slideIndex}" aria-label="${t.shot} ${i + 1} ${t.of} ${slides.length}">
        ${s.type === 'img' ? `<img src="${esc(s.src)}" alt="">` : `<span class="thumb-mock">${esc(VISUALS[p.visual] ? VISUALS[p.visual].chrome : nodeId(p))}</span>`}
      </button>`).join('')}</div>`;
    return `<div class="gallery-stage">${stage}</div>${thumbs}`;
  }

  function detailHTML(p, t) {
    const c = p[lang()];
    const d = DETAILS[p.id] ? DETAILS[p.id][lang()] : null;
    const stack = DETAILS[p.id] ? DETAILS[p.id].stack : p.tags.map((n) => ({ name: n, he: '', en: '' }));
    const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];
    const nc = next[lang()];
    const row = (label, body) => `<div class="detail-row fade-up"><h2 class="detail-label">${label}</h2><div class="detail-body">${body}</div></div>`;
    const rows = [
      d && row(t.what, `<p>${esc(d.what)}</p>`),
      d && row(t.audience, `<p>${esc(d.audience)}</p>`),
      row(t.stack, `<ul class="stack-list">${stack.map((s) => `<li><span class="tag">${esc(s.name)}</span>${s[lang()] ? `<span>${esc(s[lang()])}</span>` : ''}</li>`).join('')}</ul>`),
      d && row(t.goal, `<p>${esc(d.goal)}</p>`),
      d && row(t.saves, `<p>${esc(d.saves)}</p>`),
      row(t.resultTitle, resultsHTML(c)),
    ].filter(Boolean).join('');

    return `<section class="detail-head">
        <div class="container">
          <a class="back-link" href="projects.html"><span class="arrow arrow-back" aria-hidden="true"></span>${t.back}</a>
          <div class="project-meta"><span class="node-id">${nodeId(p)}</span>${typesHTML(p, t)}</div>
          <p class="project-client">${esc(c.client)}</p>
          <h1 class="display detail-title">${c.title}</h1>
        </div>
      </section>
      <section>
        <div class="container"><div class="gallery" id="gallery">${galleryHTML(p, t)}</div></div>
      </section>
      <section>
        <div class="container"><div class="detail-rows">${rows}</div></div>
      </section>
      <section class="detail-end">
        <div class="container detail-end-grid">
          <a class="detail-next fade-up" href="${href(next)}">
            <span class="node-id">${t.next}</span>
            <span class="project-title">${nc.title.replace(/<br>/g, ' ')}</span>
            <span class="arrow" aria-hidden="true"></span>
          </a>
          <div class="detail-cta fade-up">
            <h2 class="display">${t.ctaTitle}</h2>
            <p>${t.ctaText}</p>
            <a href="${WA}" class="btn-primary" target="_blank" rel="noopener" data-wa-source="project_detail">${t.ctaBtn}</a>
          </div>
        </div>
      </section>`;
  }

  function render() {
    const t = LABELS[lang()];

    const featuredEl = document.getElementById('featuredProjects');
    if (featuredEl) {
      const list = PROJECTS.filter((p) => p.featured).slice(0, 3);
      featuredEl.innerHTML = list.map((p, i) => fullCard(p, t, i * 0.08)).join('');
    }

    const gridEl = document.getElementById('projectsGrid');
    if (gridEl) {
      const filtersEl = document.getElementById('projectFilters');
      if (filtersEl) renderFilters(filtersEl, t);
      const list = PROJECTS.filter((p) => activeFilter === 'all' || p.types.includes(activeFilter));
      gridEl.innerHTML =
        list.map((p, i) => tileCard(p, t, i * 0.06)).join('') + ghostTile(t, list.length * 0.06);
    }

    const detailEl = document.getElementById('projectDetail');
    if (detailEl) {
      const id = new URLSearchParams(location.search).get('id');
      const p = PROJECTS.find((x) => x.id === id);
      if (!p) { location.replace('projects.html'); return; }
      detailEl.innerHTML = detailHTML(p, t);
      document.title = stripBr(p[lang()].title) + ' | Focus Digitali';
    }

    if (window.__reveal) window.__reveal(document);
  }

  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip[data-filter]');
    if (chip) {
      activeFilter = chip.dataset.filter;
      render();
      return;
    }
    const thumb = e.target.closest('.gallery-thumb');
    if (thumb) {
      const id = new URLSearchParams(location.search).get('id');
      const p = PROJECTS.find((x) => x.id === id);
      slideIndex = Number(thumb.dataset.slide);
      document.getElementById('gallery').innerHTML = galleryHTML(p, LABELS[lang()]);
      document.querySelector('.gallery-thumb[aria-pressed="true"]')?.focus();
    }
  });

  window.renderProjects = render;
})();
