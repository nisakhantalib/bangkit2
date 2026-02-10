/* eslint-disable max-len */

export const chapter3 = {
  id: 3,
  title: "Bab 3: Kelestarian Alam Sekitar",
  icon: "🌍",
  subchapters: [
    {
      id: 3.1,
      title: "3.1 Kitaran Hayat Produk",
      content: `
# Kitaran Hayat Produk

## Jejak Karbon

Jejak karbon merujuk kepada jumlah karbon dioksida yang dibebaskan ke atmosfera hasil daripada aktiviti individu atau produk.

**Formula Pengiraan:**

    Tenaga elektrik (kWj) = Kuasa alat (kW) × Masa (jam)
    CO₂ dibebaskan (g) = (Tenaga (kWj) / 50) × 39

## Konsep 5R

| 5R | Maksud | Contoh |
|----|--------|--------|
| Refuse | Tolak | Tolak beg plastik, guna beg kain |
| Reduce | Kurangkan | Kurang penggunaan air, elektrik |
| Recycle | Kitar semula | Kitar kertas, plastik, aluminium |
| Reuse | Guna semula | Balang kaca untuk bekas stor |
| Rot | Kompos | Sisa organik jadi kompos |

## Mikroplastik

Mikroplastik adalah kepingan plastik kurang dari 5mm yang memasuki rantaian makanan.
      `,
      videoUrl: "",
      quiz: {
        questions: [
          {
            id: 1,
            question: "Apakah yang dimaksudkan dengan jejak karbon?",
            options: [
              "Jumlah plastik yang digunakan",
              "Jumlah CO₂ yang dibebaskan ke atmosfera",
              "Jumlah air yang digunakan",
              "Jumlah tenaga yang digunakan"
            ],
            correctAnswer: 1,
            explanation: "Jejak karbon adalah jumlah karbon dioksida yang dibebaskan ke atmosfera dari aktiviti individu atau produk."
          }
        ]
      }
    },
    {
      id: 3.2,
      title: "3.2 Pencemaran Alam Sekitar",
      content: `
# Pencemaran Alam Sekitar

## Jenis Pencemaran

1. **Pencemaran Udara** - Gas ekzos, industri
2. **Pencemaran Air** - Sisa kumbahan, detergen
3. **Pencemaran Tanah** - Baja berlebihan, sisa pepejal
4. **Pencemaran Terma** - Peningkatan suhu

## Eutrofikasi

Respons ekosistem terhadap penambahan ion fosfat dan nitrat yang menyebabkan pertumbuhan alga pesat.

## BOD (Biochemical Oxygen Demand)

Jumlah oksigen terlarut yang diperlukan mikroorganisma untuk menguraikan bahan organik dalam air.

BOD tinggi = Pencemaran tinggi

## Ujian Metilena Biru

| Sampel Air | Masa Luntur | Tahap |
|------------|-------------|-------|
| Air sungai tercemar | 1 jam | Tinggi |
| Air kolam | 2 jam | Sederhana |
| Air paip | 4 jam | Rendah |
| Air suling | Tidak luntur | Bersih |
      `,
      videoUrl: "",
      quiz: {
        questions: [
          {
            id: 1,
            question: "Apakah yang dimaksudkan dengan eutrofikasi?",
            options: [
              "Pencemaran udara",
              "Respons ekosistem terhadap penambahan fosfat/nitrat",
              "Pencemaran tanah",
              "Peningkatan suhu"
            ],
            correctAnswer: 1,
            explanation: "Eutrofikasi adalah respons ekosistem terhadap penambahan ion fosfat dan nitrat yang menyebabkan pertumbuhan alga pesat."
          }
        ]
      }
    },
    {
      id: 3.3,
      title: "3.3 Pemeliharaan dan Pemuliharaan Alam Sekitar",
      content: `
# Pemeliharaan dan Pemuliharaan Alam Sekitar

## Teknologi Emisi Negatif (NET)

Teknologi yang menyingkirkan CO₂ dari atmosfera. Contoh: Mikroalga marin.

## Teknologi Hijau

### 1. Teknologi Solar
- Panel solar menukar cahaya ke elektrik
- Tenaga bersih, tidak bebaskan CO₂

### 2. Bangunan Hijau
- Kecekapan tenaga tinggi
- Panel solar, kitar semula air hujan
- Taman bumbung (rooftop garden)

### 3. Kereta Hibrid
- Enjin petrol + motor elektrik
- Jimat bahan api 30-50%
- Regenerative braking

| Aspek | Petrol | Hibrid | Elektrik |
|-------|--------|--------|----------|
| Jimat | Rendah | Sederhana | Tinggi |
| CO₂ | Tinggi | Sederhana | Sifar (guna) |
| Jarak | Jauh | Jauh | Terhad |

## Peranan PBB

### Persidangan Rio (1992)
- Agenda 21
- Pembangunan lestari

### Protokol Kyoto (1997)
- Kurangkan emisi 5%
- Perdagangan karbon

### Perjanjian Paris (2016)
- Had kenaikan suhu 1.5°C
- Sifar emisi bersih 2050
      `,
      videoUrl: "",
      quiz: {
        questions: [
          {
            id: 1,
            question: "Apakah NET?",
            options: [
              "Teknologi yang bebaskan CO₂",
              "Teknologi yang singkirkan CO₂ dari atmosfera",
              "Teknologi yang hasilkan oksigen",
              "Teknologi yang tingkatkan suhu"
            ],
            correctAnswer: 1,
            explanation: "NET (Negative Emission Technologies) adalah teknologi yang menyingkirkan CO₂ dari atmosfera, seperti penggunaan mikroalga."
          }
        ]
      }
    }
  ]
};