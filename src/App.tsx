import React, { useState } from "react";

// Data statis paket, mapel, dan link — tidak perlu fetch dari Google Sheets lagi
const STATIC_DATA = [
  {
    paket: "A (SD)",
    mapel: "GURU KELAS SD",
    link: "https://pkbm-absensi-m-said.vercel.app/",
  },
  {
    paket: "A (SD)",
    mapel: "AGAMA",
    link: "https://pkbm-absensi-ayu-andira.netlify.app/",
  },
  {
    paket: "A (SD)",
    mapel: "PENJAS",
    link: "https://pkbm-absensi-kasman.netlify.app/",
  },
  {
    paket: "B (SMP)",
    mapel: "MATEMATIKA",
    link: "https://pkbm-absensi-nasiruddin.netlify.app/",
  },
  {
    paket: "B (SMP)",
    mapel: "IPA",
    link: "https://pkbm-absensi-sulbiah.netlify.app/",
  },
  {
    paket: "B (SMP)",
    mapel: "KET",
    link: "https://pkbm-absensi-sri-wahyuni.netlify.app/",
  },
  {
    paket: "B (SMP)",
    mapel: "AGAMA",
    link: "https://pkbm-absensi-sari-bulang.netlify.app/",
  },
  {
    paket: "B (SMP)",
    mapel: "PENJAS",
    link: "https://pkbm-absensi-kasman.netlify.app/",
  },
  {
    paket: "C (SMA)",
    mapel: "AGAMA",
    link: "https://pkbm-absensi-ismail.netlify.app/",
  },
  {
    paket: "C (SMA)",
    mapel: "PPKN",
    link: "https://pkbm-absensi-sukirman.netlify.app/",
  },
  {
    paket: "C (SMA)",
    mapel: "IPA",
    link: "https://pkbm-absensi-rika.netlify.app/",
  },
  {
    paket: "C (SMA)",
    mapel: "BAHASA INDONESIA",
    link: "https://pkbm-absensi-hasnah.netlify.app/",
  },
  {
    paket: "C (SMA)",
    mapel: "IPS",
    link: "https://pkbm-absensi-mirnawati.netlify.app/",
  },
  {
    paket: "C (SMA)",
    mapel: "PENJAS",
    link: "https://pkbm-absensi-kasman.netlify.app/",
  },
];

function App() {
  const [paket, setPaket] = useState<string>("");
  const [mapel, setMapel] = useState<string>("");
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleNext = () => {
    const selectedRow = STATIC_DATA.find(
      (item) => item.paket === paket && item.mapel === mapel
    );
    if (selectedRow && selectedRow.link && selectedRow.link !== "-") {
      const redirectUrl = `${selectedRow.link}?mapel=${encodeURIComponent(
        mapel
      )}`;
      setActiveLink(redirectUrl); // tampilkan di iframe, URL browser tidak berubah
    } else {
      alert("Tidak ada link yang tersedia untuk pilihan ini.");
    }
  };

  const handleBack = () => {
    setActiveLink(null);
    setPaket("");
    setMapel("");
  };

  // Dapatkan paket unik
  const uniquePakets = STATIC_DATA.map((item) => item.paket).filter(
    (value, index, self) => value && self.indexOf(value) === index
  );

  // Dapatkan mapel unik berdasarkan paket yang dipilih
  const uniqueMapels = paket
    ? STATIC_DATA.filter((item) => item.paket === paket)
        .map((item) => item.mapel)
        .filter((value, index, self) => value && self.indexOf(value) === index)
    : [];

  // Kalau sudah pilih paket & mapel, tampilkan halaman tujuan di dalam iframe
  if (activeLink) {
    return (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <button
          onClick={handleBack}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 10,
            padding: "8px 14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Kembali
        </button>
        <iframe
          src={activeLink}
          title="Absensi"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Form Pilihan Paket dan Mata Pelajaran
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Paket:
        </label>
        <select
          value={paket}
          onChange={(e) => {
            setPaket(e.target.value);
            setMapel("");
          }}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Pilih Paket</option>
          {uniquePakets.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Mata Pelajaran:
        </label>
        <select
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
          disabled={!paket}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: paket ? "white" : "#f5f5f5",
          }}
        >
          <option value="">Pilih Mata Pelajaran</option>
          {uniqueMapels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleNext}
        disabled={!paket || !mapel}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: !paket || !mapel ? 0.6 : 1,
        }}
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default App;
