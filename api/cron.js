// ตัวอย่างตรรกะใน api/cron.js
export default async function handler(req, res) {
    // 1. ดึงข้อมูลจาก Database ว่ามีใครจองเวลานี้ไหม
    // 2. ถ้ามี ให้ใช้คำสั่งส่ง LINE (เหมือนโค้ดเดิมของพี่) ยิงหาลูกค้า
    // 3. ตอบกลับ 200
    res.status(200).send("Cron Job ทำงานแล้ว");
}
