import { useEffect, useMemo, useState } from 'react';
import {
  Banknote,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Facebook,
  Flower,
  Heart,
  Landmark,
  LineChart,
  Loader2,
  MapPin,
  Menu,
  Phone,
  QrCode,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  Wifi,
} from 'lucide-react';

const SHEET_ID = '1SUxJaPWNNUWT2H1l0jgulf9ITJWhfOl97lvfKjttoAQ';
const SHEET_GID = '23339672';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;

const iconMap = {
  Smartphone,
  BookOpen,
  Wifi,
  ShieldCheck,
  Camera,
  Heart,
  Flower,
  Landmark,
  CalendarDays,
  Banknote,
  Sparkles,
  MapPin,
};

const fallbackSettings = {
  'ชื่อเว็บ': 'กฐิน 2569 วัดหลวงพ่อสดธรรมกายาราม',
  subtitle: 'Wat Luang Pho Sod Dhammakayaram',
  'ชื่อกิจกรรมหลัก': 'กฐิน 2569',
  'ชื่อกิจกรรมรอง': 'ขอเชิญร่วมทำบุญทอดกฐินสามัคคี',
  'งานบุญประจำปี': 'งานกฐินสามัคคี ประจำปี 2569',
  'คำอธิบายป้ายหลัก':
    'ร่วมสืบสานพุทธประเพณีอันงดงาม สร้างบุญใหญ่หลังออกพรรษา เพื่อทำนุบำรุงพระพุทธศาสนาและเสนาสนะของวัด',
  'แนวคิดของงาน': 'ศรัทธาร่วมใจ สืบทอดบุญกฐินอย่างสงบ งดงาม และโปร่งใส',
  'วันที่จัดงาน': 'วันอาทิตย์ที่ 1 พฤศจิกายน 2569',
  'เวลาเริ่มงาน': '09.00 น.',
  'สถานที่': 'วัดหลวงพ่อสดธรรมกายาราม',
  'สถานที่จัดงาน': 'วัดหลวงพ่อสดธรรมกายาราม ตำบลแพงพวย อำเภอดำเนินสะดวก จังหวัดราชบุรี',
  'สถานที่ด้านล่าง': 'ตำบลแพงพวย อำเภอดำเนินสะดวก จังหวัดราชบุรี',
  'หัวข้อวัตถุประสงค์': 'วัตถุประสงค์ของงานกฐิน',
  'คำอธิบายวัตถุประสงค์': 'ทุกปัจจัยร่วมบุญจะนำไปใช้ตามวัตถุประสงค์ของวัดอย่างเหมาะสม',
  'เนื้อหาวัตถุประสงค์': 'ร่วมเป็นกำลังในการทำนุบำรุงวัด พระภิกษุสามเณร และกิจกรรมเผยแผ่ธรรมะ',
  'หัวข้อร่วมทำบุญ': 'ร่วมทำบุญทอดกฐินสามัคคี',
  'ธนาคาร': 'ธนาคารกรุงไทย',
  'เลขบัญชี': '000-0-00000-0',
  'ชื่อบัญชี': 'วัดหลวงพ่อสดธรรมกายาราม',
  'ลิงก์ QR ทำบุญ': 'https://api.qrserver.com/v1/create-qr-code/?size=720x900&data=Wat%20Luang%20Pho%20Sod%20Kathin%202569',
  'ลิงก์โลโก้วัด': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Dharmachakra.svg/512px-Dharmachakra.svg.png',
  'ลิงก์รูปหน้าปก':
    'https://images.unsplash.com/photo-1590418606746-018840f9cd0f?auto=format&fit=crop&w=1200&q=85',
  'Line ID': '@info.wat06',
  'โทร': '090-595-5162',
  Facebook: 'วัดหลวงพ่อสดฯ',
  TikTok: '',
  'แผนที่': 'https://maps.google.com/?q=วัดหลวงพ่อสดธรรมกายาราม',
  'หัวข้อก่อนตาราง': 'รายชื่อเจ้าภาพและผู้ร่วมทำบุญกฐิน',
  'พุทธพจน์': 'สพฺพทานํ ธมฺมทานํ ชินาติ',
  quote: 'การให้ธรรมะ ชนะการให้ทั้งปวง',
  'ชื่อวัดไทย': 'วัดหลวงพ่อสดธรรมกายาราม',
  'ชื่อวัดอังกฤษ': 'Wat Luang Pho Sod Dhammakayaram',
  'เมนูหน้าแรก': 'หน้าแรก',
  'เมนูรายชื่อ': 'รายชื่อ',
  'เมนูทำบุญ': 'ทำบุญ',
  'เมนูกำหนดการ': 'กำหนดการ',
  'เมนูติดต่อ': 'ติดต่อ',
  'ปุ่มร่วมทำบุญ': 'ร่วมทำบุญ',
  'ปุ่มดูรายชื่อ': 'ดูรายชื่อ',
  'ป้ายแนวคิดของงาน': 'แนวคิดของงาน',
  'ป้ายอัปเดตล่าสุด': 'อัปเดตล่าสุด',
  'หัวข้อย่อยรายชื่อ': 'อนุโมทนาบุญ',
  'ช่องค้นหารายชื่อ': 'ค้นหาชื่อ / คณะ / ประเภท',
  'ป้ายจำนวนรายการ': 'จำนวนรายการ',
  'หัวตารางลำดับ': 'ลำดับ',
  'หัวตารางประเภท': 'ประเภท',
  'หัวตารางชื่อคณะ': 'ชื่อ / คณะ',
  'หัวตารางจำนวนทำบุญ': 'จำนวนทำบุญ',
  'ข้อความกำลังโหลดรายชื่อ': 'กำลังโหลดรายชื่อจาก Google Sheet',
  'ข้อความไม่มีรายชื่อ': 'ยังไม่มีรายชื่อที่ตรงกับการค้นหา',
  'ประเภทรายชื่อเริ่มต้น': 'เจ้าภาพกองกฐิน',
  'ข้อความชื่อว่างรายชื่อ': '-',
  'ข้อความจำนวนว่างรายชื่อ': '',
  'ป้ายรายชื่อทั้งหมด': 'รายชื่อทั้งหมด',
  'ป้ายระบุชื่อแล้ว': 'ระบุชื่อแล้ว',
  'ป้ายกองที่ยังว่าง': 'กองที่ยังว่าง',
  'หัวข้อกองที่ยังรอระบุชื่อ': 'กองที่ยังรอระบุชื่อ',
  'คำอธิบายกองที่ยังรอระบุชื่อ': 'อ้างอิงจากเลขกองและประเภทใน Google Sheet',
  'ป้ายกองที่': 'กองที่',
  'ป้ายอีก': 'อีก',
  'ป้ายกอง': 'กอง',
  'ป้ายFacebook': 'Facebook',
  'ปุ่มคัดลอกเลขบัญชี': 'คัดลอกเลขบัญชี',
  'หัวข้อย่อยวัตถุประสงค์': 'เจตนาบุญ',
  'หัวข้อย่อยร่วมทำบุญ': 'ช่องทางร่วมบุญ',
  'คำอธิบายร่วมทำบุญ': 'สแกน QR Code หรือโอนผ่านบัญชีธนาคารของวัด แล้วส่งหลักฐานการทำบุญผ่าน Line OA',
  'ป้ายQRCode': 'QR Code ทำบุญ',
  'คำแนะนำQRCode': 'กรุณาตรวจสอบชื่อบัญชีก่อนโอนทุกครั้ง',
  'ป้ายชื่อบัญชี': 'ชื่อบัญชี',
  'ปุ่มส่งหลักฐาน': 'ส่งหลักฐาน',
  'หัวข้อย่อยกำหนดการ': 'ลำดับพิธี',
  'หัวข้อกำหนดการ': 'กำหนดการงานกฐิน',
  'คำอธิบายกำหนดการ': 'เวลาและรายละเอียดสามารถปรับแก้ได้จาก Google Sheet',
  'หัวข้อย่อยกิจกรรม': 'ภายในงาน',
  'หัวข้อกิจกรรม': 'กิจกรรมภายในงาน',
  'หัวข้อย่อยติดต่อ': 'สอบถามข้อมูล',
  'หัวข้อติดต่อ': 'ติดต่อสอบถาม',
  'คำอธิบายติดต่อ': 'สอบถามรายละเอียดการร่วมบุญ การเดินทาง และการส่งหลักฐานได้ตามช่องทางด้านล่าง',
  'ป้ายLineOA': 'Line OA',
  'ปุ่มเปิดแผนที่': 'เปิดแผนที่',
  'ป้ายพุทธพจน์': 'พุทธพจน์',
  'ป้ายณ': 'ณ',
  'ข้อความAltโลโก้วัด': 'โลโก้วัดหลวงพ่อสดธรรมกายาราม',
  'ข้อความโหลดSheetไม่สำเร็จ': 'โหลด Google Sheet ไม่สำเร็จ กำลังแสดงข้อมูลเริ่มต้น',
  'ข้อความโหลดข้อมูลไม่สำเร็จ': 'โหลดข้อมูลไม่สำเร็จ',
};

const fallbackDonors = [
  ['1', 'ประธานกฐิน', 'คณะศิษยานุศิษย์วัดหลวงพ่อสดธรรมกายาราม', '100,000 บาท'],
  ['2', 'เจ้าภาพร่วม', 'ครอบครัวผู้มีจิตศรัทธา', '20,000 บาท'],
  ['3', 'ผู้ร่วมทำบุญ', 'กัลยาณมิตร', ''],
];

const fallbackSchedule = [
  ['08.30 น.', 'ลงทะเบียนเจ้าภาพและผู้ร่วมทำบุญ'],
  ['09.30 น.', 'พิธีเจริญพระพุทธมนต์'],
  ['10.30 น.', 'ถวายผ้ากฐินสามัคคีและเครื่องบริวารกฐิน'],
  ['11.00 น.', 'ถวายภัตตาหารเพลแด่พระภิกษุสงฆ์'],
];

const fallbackActivities = [
  [
    'พิธีถวายผ้ากฐิน',
    'ร่วมถวายผ้ากฐินและเครื่องบริวารกฐินด้วยจิตศรัทธา',
    'https://images.unsplash.com/photo-1604668234793-bf808d9884ec?auto=format&fit=crop&w=900&q=85',
  ],
  [
    'สวดมนต์และเจริญภาวนา',
    'สงบใจร่วมกันก่อนพิธีสำคัญของงานบุญประจำปี',
    'https://images.unsplash.com/photo-1528357136257-0c25517acfea?auto=format&fit=crop&w=900&q=85',
  ],
  [
    'โรงทานและจิตอาสา',
    'ร่วมแบ่งปันอาหาร เครื่องดื่ม และน้ำใจแก่ผู้มาร่วมงาน',
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=85',
  ],
];

const fallbackObjectives = [
  ['บำรุงพระพุทธศาสนา', 'ร่วมสนับสนุนกิจของสงฆ์และเสนาสนะภายในวัด', 'Landmark'],
  ['เผยแผ่ธรรมะ', 'ส่งเสริมกิจกรรมศึกษา ปฏิบัติธรรม และงานบุญของวัด', 'BookOpen'],
  ['สืบสานประเพณีกฐิน', 'รักษาพุทธประเพณีหลังออกพรรษาให้มั่นคงงดงาม', 'Flower'],
  ['บริหารอย่างโปร่งใส', 'แสดงรายชื่อผู้ร่วมบุญและข้อมูลจาก Google Sheet', 'ShieldCheck'],
];

const fallbackMerits = [
  ['ร่วมสร้างทานบารมี', 'Heart'],
  ['เป็นเหตุแห่งความสามัคคี', 'Flower'],
  ['เกื้อกูลพระพุทธศาสนา', 'Landmark'],
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quote = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quote && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quote = !quote;
    } else if (char === ',' && !quote) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quote) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function rowsToData(rows) {
  const settings = { ...fallbackSettings };
  const donors = [];
  const schedule = [];
  const activities = [];
  const objectives = [];
  const merits = [];

  rows.forEach((row) => {
    if (row[5] && row[6]) settings[row[5]] = row[6];
  });

  rows.forEach((row) => {
    const donor = normalizeDonorRow(row, settings);
    if (donor) donors.push(donor);
    if (row[8] && row[9]) schedule.push(row.slice(8, 10));
    if (row[11] && row[12]) activities.push(row.slice(11, 14));
    if (row[15] && row[16]) objectives.push(row.slice(15, 18));
    if (row[19]) merits.push(row.slice(19, 21));
  });

  return {
    settings,
    donors: donors.length ? completeDonorGroups(donors, settings) : fallbackDonors,
    schedule: schedule.length ? schedule : fallbackSchedule,
    activities: activities.length ? activities : fallbackActivities,
    objectives: objectives.length ? objectives : fallbackObjectives,
    merits: merits.length ? merits : fallbackMerits,
  };
}

function completeDonorGroups(donors, settings) {
  const defaultType = sheetText(settings, 'ประเภทรายชื่อเริ่มต้น', 'เจ้าภาพกองกฐิน');
  const emptyName = sheetText(settings, 'ข้อความชื่อว่างรายชื่อ', '-');
  const emptyAmount = sheetText(settings, 'ข้อความจำนวนว่างรายชื่อ', '');
  const groupLabel = sheetText(settings, 'ป้ายกองที่', 'กองที่');
  const existingNumbers = new Set();
  const normalized = donors.map((row, index) => {
    const number = Number.parseInt(row[0], 10);
    if (Number.isFinite(number)) existingNumbers.add(number);
    return { row, index, number };
  });
  const maxGroup = normalized.reduce((max, item) => (Number.isFinite(item.number) ? Math.max(max, item.number) : max), 0);
  const missing = [];

  for (let number = 1; number <= maxGroup; number += 1) {
    if (!existingNumbers.has(number)) {
      missing.push({
        row: [
          String(number),
          defaultType,
          emptyName,
          emptyAmount,
        ],
        index: donors.length + number,
        number,
      });
    }
  }

  return [...normalized, ...missing]
    .sort((a, b) => {
      if (Number.isFinite(a.number) && Number.isFinite(b.number)) return a.number - b.number || a.index - b.index;
      if (Number.isFinite(a.number)) return -1;
      if (Number.isFinite(b.number)) return 1;
      return a.index - b.index;
    })
    .map((item) => item.row);
}

function sheetText(settings, key, fallback) {
  return settings[key] || fallback;
}

function normalizeDonorRow(row, settings) {
  const [colA = '', colB = '', colC = '', colD = ''] = row;
  const first = colA.trim();
  const second = colB.trim();
  const third = colC.trim();
  const fourth = colD.trim();
  const looksLikeDate = /^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.test(first);
  const hasNumericGroup = /^\d+$/.test(second);
  const defaultType = sheetText(settings, 'ประเภทรายชื่อเริ่มต้น', 'เจ้าภาพกองกฐิน');
  const emptyName = sheetText(settings, 'ข้อความชื่อว่างรายชื่อ', '-');
  const emptyAmount = sheetText(settings, 'ข้อความจำนวนว่างรายชื่อ', '');
  const groupLabel = sheetText(settings, 'ป้ายกองที่', 'กองที่');

  if (looksLikeDate && hasNumericGroup) {
    return [second, defaultType, third || emptyName, fourth || emptyAmount];
  }

  if (!first && hasNumericGroup) {
    return [second, defaultType, third || emptyName, fourth || emptyAmount];
  }

  if (first || second || third || fourth) {
    const number = first || second;
    const type = second || defaultType;
    const name = third || emptyName;
    return [number, type, name, fourth || emptyAmount];
  }

  return null;
}

function normalizeRows(rows) {
  const headerHints = [
    'ลำดับ',
    'ประเภท',
    'ชื่อ / คณะ',
    'จำนวนทำบุญ',
    'เวลา',
    'รายละเอียดกิจกรรม',
    'หัวข้อ',
    'key',
    'value',
    'ว/ด/ป จอง',
    'กองที่',
    'รายชื่อเจ้าภาพ',
  ];
  return rows.filter((row) => {
    if (row[5] || row[6]) return true;
    return !row.some((cell) => headerHints.some((hint) => cell.includes(hint)));
  });
}

function useSheetData() {
  const [data, setData] = useState(rowsToData([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(`${SHEET_CSV_URL}&cacheBust=${Date.now()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const rows = normalizeRows(parseCsv(await response.text()));
        setData(rowsToData(rows));
      } catch (err) {
        if (err.name !== 'AbortError') setError(fallbackSettings['ข้อความโหลดSheetไม่สำเร็จ']);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { ...data, loading, error };
}

function formatToday() {
  return new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Bangkok',
  }).format(new Date());
}

function getIcon(name, className = 'h-5 w-5') {
  const Icon = iconMap[name] || Sparkles;
  return <Icon className={className} strokeWidth={1.8} />;
}

function sectionLabel(text) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mutedGold/30 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-emeraldTemple shadow-sm backdrop-blur-md">
      <Sparkles className="h-4 w-4 text-mutedGold" />
      {text}
    </div>
  );
}

export default function VisakhaLandingPage() {
  const { settings, donors, schedule, activities, objectives, merits, loading, error } = useSheetData();
  const [query, setQuery] = useState('');
  const updatedAt = useMemo(formatToday, []);

  const t = (key) => settings[key] || fallbackSettings[key] || key;
  useEffect(() => {
    const siteTitleKey = '\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e27\u0e47\u0e1a';
    requestAnimationFrame(() => {
      document.title = settings[siteTitleKey] || document.querySelector('h1')?.textContent || fallbackSettings[siteTitleKey] || t(siteTitleKey);
    });
  }, [settings]);

  const filteredDonors = donors.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase()));
  const nav = [
    ['home', t('เมนูหน้าแรก'), Menu],
    ['donors', t('เมนูรายชื่อ'), UserRound],
    ['donate', t('เมนูทำบุญ'), QrCode],
    ['schedule', t('เมนูกำหนดการ'), CalendarDays],
    ['contact', t('เมนูติดต่อ'), Phone],
  ];

  return (
    <div className="min-h-screen overflow-hidden pb-28 text-ink md:pb-0">
      <header className="sticky top-0 z-40 border-b border-mutedGold/20 bg-ivory/78 shadow-[0_14px_42px_rgba(20,84,61,0.08)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <img
              src={t('ลิงก์โลโก้วัด')}
              alt={t('ข้อความAltโลโก้วัด')}
              className="h-12 w-12 rounded-2xl border border-mutedGold/25 bg-white/90 object-contain p-1.5 shadow-sm"
            />
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold text-emeraldTemple">{t('ชื่อวัดไทย')}</span>
              <span className="block truncate text-xs text-moss">{t('ชื่อวัดอังกฤษ')}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-4 py-2 text-sm font-semibold text-emeraldTemple transition hover:bg-white/75 hover:shadow-sm"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-2 md:items-center md:pb-24 md:pt-16 lg:px-8">
          <div className="order-2 md:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mutedGold/30 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-emeraldTemple shadow-sm backdrop-blur-md">
              <CalendarDays className="h-4 w-4 text-mutedGold" />
              {t('งานบุญประจำปี')}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-emeraldTemple sm:text-5xl lg:text-6xl">
              {t('ชื่อกิจกรรมหลัก')}
            </h1>
            <p className="mt-4 text-xl font-medium text-leaf">{t('ชื่อกิจกรรมรอง')}</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink/75">{t('คำอธิบายป้ายหลัก')}</p>

            <div className="mt-7 grid gap-3 text-sm text-ink/80 sm:grid-cols-2">
              <div className="glass-panel lift-card rounded-2xl p-4">
                <Clock className="mb-2 h-5 w-5 text-mutedGold" />
                <div className="font-semibold text-emeraldTemple">{t('วันที่จัดงาน')}</div>
                <div>{t('เวลาเริ่มงาน')}</div>
              </div>
              <div className="glass-panel lift-card rounded-2xl p-4">
                <MapPin className="mb-2 h-5 w-5 text-mutedGold" />
                <div className="font-semibold text-emeraldTemple">{t('ป้ายณ')} {t('สถานที่')}</div>
                <div>{t('สถานที่ด้านล่าง')}</div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#donate" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emeraldTemple to-leaf px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(20,84,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(20,84,61,0.28)]">
                <Heart className="h-4 w-4" />
                {t('ปุ่มร่วมทำบุญ')}
              </a>
              <a href="#donors" className="inline-flex items-center gap-2 rounded-full border border-mutedGold/35 bg-white/82 px-6 py-3 text-sm font-semibold text-emeraldTemple shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white">
                {t('ปุ่มดูรายชื่อ')}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="hero-media glass-panel aspect-[3/2] overflow-hidden rounded-[1.75rem] p-2">
              <img src={t('ลิงก์รูปหน้าปก')} alt={t('ชื่อกิจกรรมหลัก')} className="h-full w-full object-cover" />
            </div>
            <div className="glass-panel mt-4 rounded-2xl p-4">
              <div className="text-sm font-semibold text-mutedGold">{t('ป้ายแนวคิดของงาน')}</div>
              <div className="mt-1 text-emeraldTemple">{t('แนวคิดของงาน')}</div>
              <div className="mt-3 text-xs text-moss">{t('ป้ายอัปเดตล่าสุด')}: {updatedAt}</div>
            </div>
          </div>
        </section>

        <section id="donors" className="hairline-grid border-y border-mutedGold/15 bg-white/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {sectionLabel(t('หัวข้อย่อยรายชื่อ'))}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-emeraldTemple">{t('หัวข้อก่อนตาราง')}</h2>
                <p className="mt-2 text-sm text-moss">{t('ป้ายจำนวนรายการ')}: {filteredDonors.length}</p>
              </div>
              <label className="relative block w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-moss" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('ช่องค้นหารายชื่อ')}
                  className="focus-ring w-full rounded-full border border-mutedGold/25 bg-white/85 px-10 py-3 text-sm shadow-inner backdrop-blur-md"
                />
              </label>
            </div>

            <div className="glass-panel mt-8 overflow-hidden rounded-[1.5rem]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="premium-band text-white">
                    <tr>
                      {[t('หัวตารางลำดับ'), t('หัวตารางประเภท'), t('หัวตารางชื่อคณะ')].map((head) => (
                        <th key={head} className="whitespace-nowrap px-4 py-3 font-semibold">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="3" className="px-4 py-8 text-center text-moss"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />{t('ข้อความกำลังโหลดรายชื่อ')}</td></tr>
                    ) : filteredDonors.length ? (
                      filteredDonors.map((row, index) => (
                        <tr key={`${row[0]}-${row[2]}-${index}`} className="border-t border-mutedGold/15 odd:bg-white/45 transition hover:bg-lotus/45">
                          <td className="whitespace-nowrap px-4 py-3 text-moss">{row[0]}</td>
                          <td className="whitespace-nowrap px-4 py-3">{row[1]}</td>
                          <td className="min-w-56 px-4 py-3 font-medium text-emeraldTemple">{row[2]}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="3" className="px-4 py-8 text-center text-moss">{t('ข้อความไม่มีรายชื่อ')}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {error && <p className="mt-3 text-sm text-mutedGold">{error}</p>}
          </div>
        </section>

        <section id="objectives" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {sectionLabel(t('หัวข้อย่อยวัตถุประสงค์'))}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-emeraldTemple">{t('หัวข้อวัตถุประสงค์')}</h2>
            <p className="mt-3 leading-7 text-ink/70">{t('คำอธิบายวัตถุประสงค์')}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map(([title, detail, icon], index) => (
              <article key={`${title}-${index}`} className="glass-panel lift-card rounded-2xl p-5">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emeraldTemple to-leaf text-white shadow-sm">
                  {getIcon(icon)}
                </div>
                <h3 className="font-semibold text-emeraldTemple">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{detail}</p>
              </article>
            ))}
          </div>
          <div className="premium-band mt-8 rounded-2xl border border-mutedGold/20 p-6 text-white shadow-[0_24px_58px_rgba(20,84,61,0.16)]">
            <p className="leading-7 text-white/90">{t('เนื้อหาวัตถุประสงค์')}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {merits.map(([title, icon], index) => (
                <span key={`${title}-${index}`} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-sm">
                  {getIcon(icon, 'h-4 w-4 text-warmGold')}
                  {title}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="donate" className="hairline-grid border-y border-mutedGold/15 bg-ivory/65 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              {sectionLabel(t('หัวข้อย่อยร่วมทำบุญ'))}
              <h2 className="text-3xl font-semibold text-emeraldTemple">{t('หัวข้อร่วมทำบุญ')}</h2>
              <p className="mt-3 leading-7 text-ink/70">{t('คำอธิบายร่วมทำบุญ')}</p>
              <div className="glass-panel mt-6 space-y-3 rounded-2xl p-5">
                <InfoRow icon={<Landmark />} label={t('ธนาคาร')} value={t('เลขบัญชี')} />
                <InfoRow icon={<UserRound />} label={t('ป้ายชื่อบัญชี')} value={t('ชื่อบัญชี')} />
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(t('เลขบัญชี'))}
                  className="inline-flex items-center gap-2 rounded-full border border-mutedGold/30 bg-white/90 px-4 py-2 text-sm font-semibold text-emeraldTemple shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <Copy className="h-4 w-4" />
                  {t('ปุ่มคัดลอกเลขบัญชี')}
                </button>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-[0.8fr_1fr] sm:items-center">
              <div className="mx-auto w-full max-w-xs">
                <div className="glass-panel aspect-[4/5] overflow-hidden rounded-[1.5rem] p-4">
                  <img src={t('ลิงก์ QR ทำบุญ')} alt={t('ป้ายQRCode')} className="h-full w-full object-contain" />
                </div>
              </div>
              <div className="premium-band rounded-2xl border border-mutedGold/20 p-6 text-white shadow-[0_24px_58px_rgba(20,84,61,0.16)]">
                <QrCode className="h-8 w-8 text-warmGold" />
                <h3 className="mt-4 text-xl font-semibold">{t('ป้ายQRCode')}</h3>
                <p className="mt-3 leading-7 text-white/80">{t('คำแนะนำQRCode')}</p>
                <a href={`https://line.me/R/ti/p/${encodeURIComponent(t('Line ID'))}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emeraldTemple shadow-sm transition hover:-translate-y-0.5">
                  <LineChart className="h-4 w-4" />
                  {t('ปุ่มส่งหลักฐาน')}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="schedule" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {sectionLabel(t('หัวข้อย่อยกำหนดการ'))}
          <h2 className="text-3xl font-semibold text-emeraldTemple">{t('หัวข้อกำหนดการ')}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-ink/70">{t('คำอธิบายกำหนดการ')}</p>
          <div className="mt-8 grid gap-4">
            {schedule.map(([time, detail], index) => (
              <div key={`${time}-${index}`} className="glass-panel lift-card grid gap-3 rounded-2xl p-5 sm:grid-cols-[10rem_1fr] sm:items-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 font-semibold text-mutedGold shadow-sm">
                  <Clock className="h-4 w-4" />
                  {time}
                </div>
                <div className="font-medium text-emeraldTemple">{detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="activities" className="hairline-grid border-y border-mutedGold/15 bg-white/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {sectionLabel(t('หัวข้อย่อยกิจกรรม'))}
            <h2 className="text-3xl font-semibold text-emeraldTemple">{t('หัวข้อกิจกรรม')}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {activities.map(([title, detail, image], index) => (
                <article key={`${title}-${index}`} className="glass-panel lift-card overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] bg-lotus">
                    <img src={image || t('ลิงก์รูปหน้าปก')} alt={title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-emeraldTemple">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            {sectionLabel(t('หัวข้อย่อยติดต่อ'))}
            <h2 className="text-3xl font-semibold text-emeraldTemple">{t('หัวข้อติดต่อ')}</h2>
            <p className="mt-3 leading-7 text-ink/70">{t('คำอธิบายติดต่อ')}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <ContactCard icon={<Phone />} label={t('โทร')} value={t('โทร')} href={`tel:${t('โทร')}`} />
              <ContactCard icon={<LineChart />} label={t('ป้ายLineOA')} value={t('Line ID')} href={`https://line.me/R/ti/p/${encodeURIComponent(t('Line ID'))}`} />
              <ContactCard icon={<Facebook />} label={t('ป้ายFacebook')} value={t('Facebook')} />
              <ContactCard icon={<MapPin />} label={t('สถานที่')} value={t('สถานที่ด้านล่าง')} href={t('แผนที่')} />
            </div>
          </div>
          <div className="premium-band rounded-[1.5rem] border border-mutedGold/20 p-7 text-white shadow-[0_24px_58px_rgba(20,84,61,0.16)]">
            <div className="text-sm font-semibold text-warmGold">{t('ป้ายพุทธพจน์')}</div>
            <blockquote className="mt-4 text-3xl font-semibold leading-tight">{t('พุทธพจน์')}</blockquote>
            <p className="mt-5 leading-8 text-white/80">{t('quote')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={t('แผนที่')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emeraldTemple shadow-sm transition hover:-translate-y-0.5">
                <MapPin className="h-4 w-4" />
                {t('ปุ่มเปิดแผนที่')}
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm text-white/85">
                <CheckCircle2 className="h-4 w-4 text-warmGold" />
                {t('ชื่อเว็บ')}
              </span>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-mutedGold/25 bg-ivory/88 px-2 pb-[calc(env(safe-area-inset-bottom)+0.45rem)] pt-2 shadow-[0_-18px_42px_rgba(20,84,61,0.14)] backdrop-blur-2xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {nav.map(([id, label, Icon]) => (
            <a key={id} href={`#${id}`} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold text-emeraldTemple transition hover:bg-white/80 hover:shadow-sm">
              <Icon className="h-5 w-5 text-mutedGold" />
              <span className="max-w-full truncate px-1">{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-mutedGold">{icon}</span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-moss">{label}</span>
        <span className="block text-lg font-semibold text-emeraldTemple">{value}</span>
      </span>
    </div>
  );
}

function ContactCard({ icon, label, value, href }) {
  const content = (
    <div className="glass-panel lift-card h-full rounded-2xl p-5">
      <div className="mb-3 text-mutedGold">{icon}</div>
      <div className="text-sm font-semibold text-moss">{label}</div>
      <div className="mt-1 font-medium text-emeraldTemple">{value}</div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}
