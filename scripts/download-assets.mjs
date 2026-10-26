import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const imgDir = path.join(root, "public", "media", "images");
const vidDir = path.join(root, "public", "media", "video");
fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(vidDir, { recursive: true });

// Unsplash photo IDs -> local filenames (photos.unsplash.com, Unsplash License)
const images = {
  "hero-poster.jpg": "1503376780353-7e6692767b70",
  "reveal-car.jpg": "1533106418989-88406c7cc8ca",
  "design-profile.jpg": "1485291571150-772bcfc10da5",
  "detail-headlight.jpg": "1554744512-d6c603f27c54",
  "detail-wheel.jpg": "1613214149922-f1809c99b414",
  "detail-grille.jpg": "1606664515524-ed2f786a0bd6",
  "detail-interior.jpg": "1610647752706-3bb12232b3ab",
  "detail-cockpit.jpg": "1449965408869-eaa3f722e40d",
  "detail-texture.jpg": "1550684376-efcbd6e3f031",
  "performance-car.jpg": "1549927681-0b673b8243ab",
  "final-reveal.jpg": "1542362567-b07e54358753",
  "card-supercar.jpg": "1525609004556-c46c7d6cf023",
  "card-electric.jpg": "1580654712603-eb43273aff33",
  "card-luxury.jpg": "1546614042-7df3c24c9e5d",
  "card-offroad.jpg": "1533473359331-0135ef1b58bf",
  "card-future.jpg": "1519245659620-e859806a8d3b",
  "car-laferrari.jpg": "1583121274602-3e2820c69888",
  "car-gt3-white.jpg": "1594502184342-2e12f877aa73",
  "car-911-black.jpg": "1611821064430-0d40291d0f0b",
  "car-gwagon.jpg": "1520031441872-265e4ff70366",
  "car-q7-snow.jpg": "1517524008697-84bbe3c3fd98",
  "car-roadster.jpg": "1617788138017-80ad40651399",
  "car-model3.jpg": "1560958089-b8a1929cea89",
  "car-sedan-teal.jpg": "1601362840469-51e4d8d58785",
  "car-f8-red.jpg": "1592198084033-aade902d1aae",
  "car-i8.jpg": "1469285994282-454ceb49e63c",
  "car-c63-neon.jpg": "1590362891991-f776e747a588",
  "car-challenger-neon.jpg": "1626668893632-6f3a4466d22f",
  "car-aventador-doors.jpg": "1571607388263-1044f9ea01dd",
  "car-huracan-side.jpg": "1514316703755-dca7d7d9d882",
  "car-amg-harbor.jpg": "1617814076367-b759c7d7e738",
  "car-modely-sunset.jpg": "1571987502227-9231b837d92a",
  "car-charger-night.jpg": "1593941707882-a5bba14938c7",
  "night-city.jpg": "1493238792000-8113da705763",
  "car-warehouse.jpg": "1607603750909-408e193868c7",
  "lab-tech.jpg": "1517420704952-d9f39e95b43e",
};

const videos = {
  "night-drive.mp4": "https://cdn.coverr.co/videos/coverr-driving-past-a-building-at-night-9184/720p.mp4",
  "coastal-drive.mp4": "https://cdn.coverr.co/videos/coverr-driving-near-the-beach-6722/1080p.mp4",
};

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

for (const [name, id] of Object.entries(images)) {
  const dest = path.join(imgDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
    console.log(`skip ${name}`);
    continue;
  }
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=78`;
  try {
    const size = await download(url, dest);
    console.log(`img ${name} ${(size / 1024).toFixed(0)}kb`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}

for (const [name, url] of Object.entries(videos)) {
  const dest = path.join(vidDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
    console.log(`skip ${name}`);
    continue;
  }
  try {
    const size = await download(url, dest);
    console.log(`vid ${name} ${(size / 1024 / 1024).toFixed(1)}mb`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}
