const https = require('https');

export default function handler(req, res) {
    // รองรับการยิงมาจากหน้าเว็บ (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { package: pkg, time } = req.body;
        
        // ข้อมูลของพี่
        const TOKEN = 'LQNwHAxoHm4bMDXxl8qqDD0NnOdfjztKFDulaY2ExHn3bTQSr/A8jujYjHVM4XDpWwB/zN43ATmJSU8ne+vj+RqMTb1iq0qy94ldu60t/Cljv3D4FstkthEcbS0aSASwJxzOlBSW7VZEbQ78kPvGQQdB04t89/1O/w1cDnyilFU=';
        const MY_USER_ID = 'U45e317046162394602c619e078736a61'; // ผมดึงจากข้อมูลที่พี่ให้ไว้

        const data = JSON.stringify({
            to: MY_USER_ID,
            messages: [{
                type: 'text',
                text: `📢 มีคนจองคิวใหม่!\n📦 แพ็กเกจ: ${pkg || 'ไม่ได้ระบุ'}\n⏰ เวลา: ${time || 'ไม่ได้ระบุ'}`
            }]
        });

        const options = {
            hostname: 'api.line.me',
            path: '/v2/bot/message/push',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        };

        const lineReq = https.request(options, (lineRes) => {
            lineRes.on('data', () => {
                res.status(200).json({ success: true });
            });
        });

        lineReq.on('error', (error) => {
            res.status(500).json({ error: error.message });
        });

        lineReq.write(data);
        lineReq.end();
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
