import { useState, useEffect } from "react";

const phases = [
  { id: 1, name: "FONDASI", days: "1–20", color: "#C8A96E", bg: "#1a1410", desc: "Math, Probability & Mindset Dasar" },
  { id: 2, name: "STRATEGI INTI", days: "21–40", color: "#7EB8C9", bg: "#0d1a1f", desc: "GTO, Ranges & Betting Theory" },
  { id: 3, name: "GAME THEORY", days: "41–60", color: "#9B7EC8", bg: "#130d1f", desc: "Solver, Blockers & Advanced Concepts" },
  { id: 4, name: "PSIKOLOGI", days: "61–80", color: "#C87E7E", bg: "#1f0d0d", desc: "Mental Game, Reads & Table Dynamics" },
  { id: 5, name: "INTEGRASI", days: "81–100", color: "#7EC87E", bg: "#0d1f0d", desc: "Mastery, Leak Fixing & Beyond" },
];

const allDays = [
  { day: 1, phase: 1, title: "Self-Assessment & Orientasi", category: "Mindset", duration: "30 menit", task: "Tulis jurnal jujur: apa 3 kelemahan terbesar Anda di meja? Rekonstruksi 2 hand besar yang pernah hilang karena over-bluff. Tulis apa yang seharusnya dilakukan.", tool: "Jurnal / Buku catatan", focus: "Kesadaran diri adalah langkah pertama. Jangan mulai dengan teori sebelum tahu di mana leak Anda." },
  { day: 2, phase: 1, title: "Hand Rankings & Starting Hand Chart", category: "Fondasi", duration: "30 menit", task: "Hafal chart preflop GTO untuk 6-max (RFI ranges per posisi). Download chart dari Upswing/GTO Wizard. Latih hafalan dengan flash card — bisa pakai Anki.", tool: "Anki / GTO Wizard", focus: "Preflop adalah fondasi segalanya. Range yang benar di sini menghemat banyak kesalahan postflop." },
  { day: 3, phase: 1, title: "Pot Odds & Basic Math", category: "Matematika", duration: "35 menit", task: "Pelajari cara kalkulasi pot odds dalam 3 detik. Latih 20 soal: jika pot $200 dan call $50, berapa pot odds Anda? (200:50 = 4:1 = 20%). Latih sampai otomatis.", tool: "Kalkulator / Latihan manual", focus: "Pot odds adalah keputusan call/fold yang paling basic. Ini harus menjadi refleks, bukan kalkulasi sadar." },
  { day: 4, phase: 1, title: "Expected Value (EV)", category: "Matematika", duration: "35 menit", task: "Pahami formula EV = (prob menang × pot yang didapat) − (prob kalah × yang dipertaruhkan). Latih 15 soal EV sederhana. Mulai berpikir setiap keputusan sebagai EV+/EV−.", tool: "Spreadsheet atau latihan tulis tangan", focus: "Setiap keputusan poker adalah kalkulasi EV. Pemain yang memaksimalkan EV jangka panjang adalah pemenang." },
  { day: 5, phase: 1, title: "Position: Senjata Paling Kuat", category: "Fondasi", duration: "30 menit", task: "Pelajari mengapa BTN adalah posisi terbaik. Analisis bagaimana winrate berubah per posisi (BTN vs UTG bisa beda 20+ BB/100). Review 5 hand di mana posisi seharusnya mempengaruhi keputusan Anda.", tool: "Jurnal hand history", focus: "Position = informasi. Bertindak terakhir memberikan Anda data lebih banyak dari semua lawan." },
  { day: 6, phase: 1, title: "Bankroll Management (BRM)", category: "Risk Management", duration: "30 menit", task: "Tetapkan aturan BRM personal: minimum 20 buy-in untuk cash game, 100 untuk MTT. Hitung berapa bankroll yang dibutuhkan untuk stakes yang Anda mainkan. Tulis stop-loss harian (misalnya: max loss 3 buy-in/hari).", tool: "Spreadsheet BRM", focus: "BRM bukan soal takut — ini soal memastikan Anda masih ada di meja untuk profit jangka panjang." },
  { day: 7, phase: 1, title: "Review Minggu 1 + Journaling", category: "Review", duration: "30 menit", task: "Tulis di jurnal: apa yang paling mengejutkan dari minggu pertama? Quiz diri sendiri: pot odds 5 soal, EV 5 soal. Identifikasi 1 area yang paling butuh perbaikan.", tool: "Jurnal", focus: "Review mingguan lebih penting dari belajar harian. Tanpa review, ilmu tidak masuk ke long-term memory." },
  { day: 8, phase: 1, title: "Preflop Ranges: Setiap Posisi", category: "Strategi", duration: "40 menit", task: "Pelajari RFI (Raise First In) ranges untuk UTG, HJ, CO, BTN, SB. Latih dengan quiz chart. Perhatikan perbedaan tight UTG vs loose BTN. Commit ranges ke memori.", tool: "GTO Wizard / Poker Ranger", focus: "Playing proper ranges preflop langsung menghilangkan banyak post-flop masalah sebelum terjadi." },
  { day: 9, phase: 1, title: "The Art of Folding", category: "Mindset", duration: "30 menit", task: "Pelajari mengapa fold adalah keputusan paling menguntungkan yang sering diabaikan. Analisis 5 spot dari permainan masa lalu di mana fold adalah jawaban yang benar. Apa yang membuat Anda tidak fold?", tool: "Jurnal hand history", focus: "Pemain yang bisa fold strong hands di spot yang tepat adalah pemain yang berbahaya." },
  { day: 10, phase: 1, title: "Continuation Betting (C-bet) Basics", category: "Strategi", duration: "35 menit", task: "Pelajari kapan c-bet: HU vs multiway, dry vs wet board, posisi vs OOP. Pelajari sizing standar: 33%, 50%, 75% pot. Latih identifikasi situasi 'never c-bet' dan 'always c-bet'.", tool: "Video training (Upswing/Run It Once)", focus: "C-bet adalah weapon utama aggressor. Tapi c-bet sembarangan adalah kebocoran besar." },
  { day: 11, phase: 1, title: "Flop Texture Analysis", category: "Strategi", duration: "35 menit", task: "Pelajari perbedaan: dry board (A72r) vs wet board (JT9ss), static vs dynamic boards. Latih 20 board: siapa yang diuntungkan, dan bagaimana sizing berubah? Kerjakan dengan cepat.", tool: "Flashcard board texture", focus: "Board texture menentukan segalanya: siapa yang punya range advantage, seberapa agresif harus bet." },
  { day: 12, phase: 1, title: "Outs & Rule of 2 and 4", category: "Matematika", duration: "30 menit", task: "Hafal rule of 2 and 4: di flop dengan 2 kartu tersisa kalikan outs × 4; di turn kalikan × 2. Latih 20 skenario drawing hand. Berapa equity flush draw di flop? (9 outs × 4 = ~36%).", tool: "Latihan tulis tangan", focus: "Kalkulasi cepat equity adalah fondasi semi-bluff, hero call, dan fold decision yang benar." },
  { day: 13, phase: 1, title: "Pot Control", category: "Strategi", duration: "30 menit", task: "Kapan check behind sebagai aggressor? Kapan value bet tipis di river? Pelajari SPR (Stack-to-Pot Ratio) dan bagaimana ia mempengaruhi commitment. Analisis 3 hand dengan SPR berbeda.", tool: "Jurnal + video", focus: "Pot control mencegah pot membesar saat Anda punya medium hand yang bisa dikalahkan." },
  { day: 14, phase: 1, title: "Review Minggu 2", category: "Review", duration: "30 menit", task: "Self-quiz: 5 soal pot odds, 5 soal outs/equity, 5 soal board texture identification. Tulis jurnal: apakah ada konsep minggu ini yang masih buram? Jadwalkan re-review jika perlu.", tool: "Jurnal + quiz card", focus: "" },
  { day: 15, phase: 1, title: "Range Thinking: Berpikir dalam Distribusi", category: "Game Theory", duration: "35 menit", task: "Latih untuk berhenti berpikir 'lawan punya AK' dan mulai berpikir 'lawan punya range: {AK, AQ, JJ+, beberapa bluff}'. Latih range assignment untuk 5 betting line yang berbeda.", tool: "Whiteboard / Poker Ranger", focus: "Range thinking adalah perbedaan terbesar antara pemain intermediate dan advanced." },
  { day: 16, phase: 1, title: "Aggression: Mengapa Bet/Raise Menang", category: "Strategi", duration: "30 menit", task: "Pahami mengapa passive play (call-call-call) adalah jalan menuju kekalahan. Pelajari dua cara untuk menang: (1) lawan fold, (2) showdown terbaik. Passive play hanya bisa menang dengan cara ke-2.", tool: "Video / artikel", focus: "Aggression menciptakan jalan menang ekstra. Pemain pasif hanya bisa menang di showdown." },
  { day: 17, phase: 1, title: "Bluffing Fundamentals & Ratio", category: "Strategi", duration: "35 menit", task: "Pelajari ratio bluff:value yang tepat berdasarkan bet sizing. Jika bet 50% pot, ratio ideal 1:2 (1 bluff per 2 value bet). Latih memilih bluff candidate yang tepat — hand dengan equity + fold equity.", tool: "Kalkulator / latihan", focus: "Bluff bukan soal nekat — ini soal matematika yang tepat dan timing yang presisi." },
  { day: 18, phase: 1, title: "Semi-Bluffing: Bluff Terkuat", category: "Strategi", duration: "35 menit", task: "Pahami mengapa semi-bluff (flush draw, straight draw) lebih kuat dari pure bluff: menang dengan (1) fold equity ATAU (2) complete the draw. Latih spot identifikasi semi-bluff optimal.", tool: "Hand analysis", focus: "Semi-bluff adalah tool terbaik pemain agresif karena memiliki dua cara untuk menang." },
  { day: 19, phase: 1, title: "Reading the Board: Siapa Diuntungkan?", category: "Strategi", duration: "35 menit", task: "Untuk setiap board, tanya: siapa yang range-nya lebih diuntungkan? Preflop aggressor atau caller? Latih 20 board texture analysis: board A72r favors PFR, board 876ss favors caller.", tool: "Flashcard / drill", focus: "Range advantage menentukan siapa yang harus bet dan seberapa agresif." },
  { day: 20, phase: 1, title: "Phase 1: Final Assessment", category: "Review", duration: "40 menit", task: "Self-test komprehensif: pot odds (5 soal), EV (5 soal), range thinking (3 soal), board texture (5 soal), bluff ratio (3 soal). Tulis jurnal: apa yang sudah dikuasai? Apa yang masih lemah? Bawa ke Phase 2.", tool: "Jurnal + quiz", focus: "" },

  { day: 21, phase: 2, title: "GTO Introduction: Nash Equilibrium", category: "Game Theory", duration: "35 menit", task: "Pelajari konsep GTO: strategi yang tidak bisa dieksploitasi. Pahami Nash Equilibrium dalam poker — tidak ada lawan yang bisa untung dengan mengubah strategi mereka melawan GTO. Kenapa ini penting?", tool: "Artikel / buku 'Modern Poker Theory'", focus: "GTO bukan tujuan akhir, tapi fondasi. Anda perlu tahu 'garis dasarnya' sebelum bisa menyimpang secara profitable." },
  { day: 22, phase: 2, title: "GTO vs Exploitative: Kapan Pakai Mana?", category: "Game Theory", duration: "35 menit", task: "Pelajari perbedaan mendasar: GTO = tidak bisa dieksploitasi, Exploitative = maksimalkan EV melawan lawan spesifik. Latih identifikasi situasi kapan exploit vs GTO lebih baik.", tool: "Video / diskusi hand", focus: "Melawan fish: exploit sepenuhnya. Melawan unknown: lean GTO. Melawan reg yang imbang: mix." },
  { day: 23, phase: 2, title: "3-Betting Strategy", category: "Strategi", duration: "40 menit", task: "Bangun 3-bet range dari setiap posisi: value (QQ+, AK) + bluff (suited connectors, suited Ax). Pelajari sizing: IP 2.5-3x, OOP 3-4x. Mengapa 3-bet bluff butuh blockers yang baik?", tool: "GTO Wizard / Poker Ranger", focus: "3-bet adalah weapon ofensif terkuat. Range yang seimbang membuat Anda tidak bisa dieksploitasi." },
  { day: 24, phase: 2, title: "Facing 3-Bets: Defense Strategy", category: "Strategi", duration: "35 menit", task: "Bangun 4-bet range (QQ+, AK, beberapa bluff seperti A5s), calling range, dan folding range. Hitung MDF (Minimum Defense Frequency) melawan 3-bet sizing tertentu.", tool: "GTO Wizard", focus: "Over-folding melawan 3-bet adalah leak besar. Anda harus defend cukup sering agar tidak bisa di-exploit." },
  { day: 25, phase: 2, title: "Defending the Blinds", category: "Strategi", duration: "35 menit", task: "BB mendapat pot odds terbaik untuk defend. Pelajari BB defense range yang GTO: calling range vs 3-bet range. SB: posisi terburuk postflop, harus 3-bet or fold lebih sering.", tool: "Chart preflop BB/SB defense", focus: "Blind defense yang baik langsung meningkatkan winrate. Terlalu tight di BB adalah leak umum." },
  { day: 26, phase: 2, title: "Turn Play: Double Barrel & Check-Raise", category: "Strategi", duration: "40 menit", task: "Kapan double barrel? (board yang connect dengan preflop range, turn card yang membantu range Anda). Kapan delayed c-bet? Kapan check-raise di turn sebagai bluff atau value?", tool: "Hand history analysis", focus: "Turn adalah street di mana banyak uang bergerak. Keputusan di sini sering lebih besar impaknya dari flop." },
  { day: 27, phase: 2, title: "River Play: Value & Bluff Selection", category: "Strategi", duration: "40 menit", task: "Di river: tidak ada lagi equity, semua keputusan adalah value atau bluff murni. Pelajari thin value betting (bet hand yang menang 60-65%), bluff selection (hand dengan blockers terbaik), dan sizing untuk max EV.", tool: "Hand history review", focus: "River adalah tempat di mana keuntungan terbesar dibuat atau dihancurkan. Sizing harus tepat." },
  { day: 28, phase: 2, title: "Review Minggu 4", category: "Review", duration: "30 menit", task: "Review 5 hand dari sesi terakhir: apakah 3-bet range benar? Apakah blind defense cukup? Apakah double barrel tepat? Tulis jurnal: mana dari konsep minggu ini yang paling sulit dieksekusi?", tool: "Hand history + jurnal", focus: "" },
  { day: 29, phase: 2, title: "Bet Sizing Theory", category: "Game Theory", duration: "40 menit", task: "Pelajari mengapa sizing berbeda untuk range berbeda: small bet = merged range (banyak hand lemah ke kuat), large bet = polarized range (nut hands + bluff, sedikit middle). Latih 10 spot: berapa sizing yang tepat?", tool: "Solver / drill latihan", focus: "Sizing adalah bahasa. Ukuran bet Anda mengkomunikasikan range Anda — pastikan komunikasinya benar." },
  { day: 30, phase: 2, title: "Check-Raising: Weapon OOP", category: "Strategi", duration: "35 menit", task: "Bangun check-raise range di flop: strong value (sets, two pair) + bluff draw (flush draw, combo draw). Kapan check-raise sebagai trap? Kapan check-raise untuk fold equity? Sizing: 2.5-3x bet.", tool: "GTO Wizard / hand analysis", focus: "Check-raise OOP adalah cara utama untuk fight back dan protect range di posisi lemah." },
  { day: 31, phase: 2, title: "Multiway Pots: Range Adjustment", category: "Strategi", duration: "35 menit", task: "Di multiway pot: tighten range secara signifikan, kurangi bluff frequency, nilai hand naik (set > two pair lebih penting). Pelajari mengapa c-bet di 3-way pot butuh hand yang lebih kuat.", tool: "Artikel / video multiway", focus: "Multiway pots mengubah semua kalkulasi. Bluff yang profitable HU bisa menjadi bencana 3-way." },
  { day: 32, phase: 2, title: "Short Stack Play (<40BB)", category: "Strategi", duration: "35 menit", task: "Pahami bagaimana SPR rendah mengubah strategi: tangan dengan implied odds turun nilainya (set mining), push/fold become primary weapon, dan commitment threshold lebih rendah. Latih push/fold chart.", tool: "Push/fold calculator (ICMIZER)", focus: "Stack depth adalah konteks segalanya. Strategi yang benar di 100BB bisa salah total di 25BB." },
  { day: 33, phase: 2, title: "Deep Stack Play (150BB+)", category: "Strategi", duration: "35 menit", task: "Di deep stack: implied odds naik dramatically, suited connectors naik nilainya, post-flop skill lebih krusial. Pelajari mengapa slow-playing lebih viable di deep stack dan bagaimana bluff range melebar.", tool: "Video / artikel deep stack", focus: "Deep stack poker adalah chess — lebih banyak dimensi, lebih banyak ruang untuk kreativitas." },
  { day: 34, phase: 2, title: "Heads-Up Fundamentals", category: "Strategi", duration: "35 menit", task: "HU poker: range melebar dramatically (BTN/SB open ~100%, BB defend lebar). Pelajari adjustment utama: aggression naik, c-bet frequency naik, fold equity turun. Latih HU preflop ranges.", tool: "GTO Wizard HU mode", focus: "HU adalah poker paling murni — tidak ada yang bisa bersembunyi. Skill gap terekspos sempurna." },
  { day: 35, phase: 2, title: "Tournament vs Cash Game", category: "Strategi", duration: "35 menit", task: "Perbedaan kritis: di tournament, chip EV ≠ $ EV karena ICM. Antes meningkatkan pot dan mendorong aggression. Stack preservation di late game. Identifikasi: gaya mana yang lebih Anda sukai?", tool: "Artikel ICM / video", focus: "Tanpa memahami ICM, keputusan tournament Anda akan selalu suboptimal di late stages." },
  { day: 36, phase: 2, title: "ICM Basics", category: "Risk Management", duration: "40 menit", task: "Pelajari cara ICM mengubah nilai chip. Latih: di final table bubble, apakah call all-in dengan KK vs chip leader yang dominan selalu benar? (Tidak selalu — ICM pressure bisa membenarkan fold!) Gunakan ICMIZER.", tool: "ICMIZER calculator", focus: "ICM adalah alasan mengapa banyak pemain cash game gagal di tournament — mereka tidak tahu ICM." },
  { day: 37, phase: 2, title: "Squeeze Play", category: "Strategi", duration: "35 menit", task: "Squeeze = 3-bet setelah open + satu atau lebih caller. Mengapa squeeze lebih profitable dari 3-bet biasa? (Lebih banyak fold equity, pot lebih besar). Bangun squeeze range: lebih tighten value, pilih bluff dengan care.", tool: "Hand analysis / GTO Wizard", focus: "Squeeze yang tepat adalah salah satu play paling profitable di poker, tapi harus dipilih dengan cermat." },
  { day: 38, phase: 2, title: "Probe Bets & Delayed C-bets", category: "Strategi", duration: "35 menit", task: "Probe bet: bet turn sebagai OOP player setelah aggressor check di flop. Kapan profitable? Delayed c-bet: check flop, bet turn sebagai IP. Kondisi optimal untuk keduanya.", tool: "Hand analysis", focus: "Memahami out-of-position play adalah pembeda besar antara pemain baik dan pemain sangat baik." },
  { day: 39, phase: 2, title: "Floating: Call dengan Rencana", category: "Strategi", duration: "35 menit", task: "Float = call bet dengan tangan yang lemah dengan rencana untuk bluff kemudian. Kondisi optimal: IP, lawan yang c-bet terlalu sering, board yang bagus untuk bluff di turn. Latih 5 skenario float.", tool: "Hand analysis", focus: "Float yang tepat mengeksploitasi pemain yang c-bet terlalu sering dan give up di turn." },
  { day: 40, phase: 2, title: "Phase 2: Final Assessment", category: "Review", duration: "40 menit", task: "Review komprehensif Phase 2: 3-bet range quiz, ICM scenario, bet sizing drill (5 soal), HU adjustment. Tulis: mana konsep yang paling mengubah cara berpikir Anda? Mana yang masih perlu drill?", tool: "Jurnal + quiz", focus: "" },

  { day: 41, phase: 3, title: "Solver Introduction: PioSOLVER/GTO+", category: "Game Theory", duration: "40 menit", task: "Setup solver (PioSOLVER free atau GTO+ trial). Jalankan solve pertama: BTN vs BB, flop AK7r. Analisis output: frekuensi bet, sizing yang dipilih solver, bagaimana range berubah di turn berbeda.", tool: "PioSOLVER / GTO+", focus: "Solver adalah gym untuk poker. 30 menit solver = lebih banyak insight dari 5 jam main tanpa analisis." },
  { day: 42, phase: 3, title: "Range Advantage: Siapa yang Dominan?", category: "Game Theory", duration: "35 menit", task: "Pelajari konsep range advantage: siapa yang memiliki lebih banyak strong hands di board ini? Latih 10 board: berikan range advantage assessment untuk PFR dan caller di setiap board.", tool: "Solver / drill", focus: "Range advantage menentukan strategi default: siapa yang harus bet, berapa besar, seberapa sering." },
  { day: 43, phase: 3, title: "Nut Advantage: Siapa yang Punya Lebih Banyak Nut Hands?", category: "Game Theory", duration: "35 menit", task: "Berbeda dari range advantage: nut advantage fokus pada ujung atas range. Latih 10 spot: siapa yang punya lebih banyak nut hands? Bagaimana nut advantage membenarkan overbet?", tool: "Solver analysis", focus: "Nut advantage adalah alasan mengapa overbet kadang optimal — hanya Anda yang bisa punya nuts." },
  { day: 44, phase: 3, title: "Blockers & Unblockers", category: "Game Theory", duration: "40 menit", task: "Pelajari blockers: A blocker memblok AA, AK dari range lawan. Pilih bluff yang memblok calling range terkuat lawan. Latih 10 river spot: bluff mana yang punya blocker terbaik?", tool: "Solver / hand analysis", focus: "Bluff dengan blocker terbaik adalah perbedaan antara bluff 45% success dan 60% success." },
  { day: 45, phase: 3, title: "Mixed Strategies dalam GTO", category: "Game Theory", duration: "35 menit", task: "Mengapa GTO sering mix check/bet dengan frekuensi tertentu (misal bet 60%, check 40%)? Ini untuk membuat range Anda tidak readable. Latih: untuk hand tertentu, apa yang solver rekomendasikan?", tool: "Solver", focus: "Mixed strategy adalah apa yang membuat player GTO tidak bisa dieksploitasi — lawan tidak tahu apa yang Anda lakukan." },
  { day: 46, phase: 3, title: "Polarized vs Condensed (Merged) Range", category: "Game Theory", duration: "35 menit", task: "Polarized = bet besar dengan nut hands + bluff only, hapus middle hands. Merged = bet kecil/medium dengan wide range termasuk middle strength hands. Latih 10 spot: polarized atau merged yang optimal?", tool: "Solver / drill", focus: "Memilih polar vs merged adalah keputusan sizing yang paling fundamental di poker modern." },
  { day: 47, phase: 3, title: "Frequency-Based Thinking", category: "Game Theory", duration: "35 menit", task: "Berhenti berpikir 'hand ini vs hand itu' — mulai berpikir 'apa frekuensi optimal bet/check/raise untuk seluruh range saya di spot ini?' Latih dengan analisis solver: extract frekuensi dari output.", tool: "Solver", focus: "Frequency thinking adalah mental model yang memisahkan pemain GTO dari pemain intuisi." },
  { day: 48, phase: 3, title: "Equity Distribution Analysis", category: "Game Theory", duration: "40 menit", task: "Gunakan solver untuk lihat equity distribution: bagaimana equity terdistribusi antara PFR dan caller di board berbeda? Mana yang lebih flat (equity dekat)? Mana yang lebih skewed? Implikasinya?", tool: "Solver (equity distribution view)", focus: "Equity distribution yang flat membenarkan betting kecil. Yang skewed membenarkan betting besar atau check." },
  { day: 49, phase: 3, title: "Review Minggu 7 + Solver Session", category: "Review", duration: "40 menit", task: "Pilih 2 spot dari hand history minggu ini yang paling confusing. Solve menggunakan solver. Bandingkan keputusan Anda dengan solver output. Tulis di jurnal: apa perbedaannya? Mengapa?", tool: "Solver + jurnal", focus: "" },
  { day: 50, phase: 3, title: "Milestone Day 50: Review Perjalanan", category: "Milestone", duration: "40 menit", task: "Baca kembali jurnal dari Day 1. Apa yang sudah berubah dalam cara Anda berpikir tentang poker? Tulis 5 insight terbesar. Evaluasi: mana area yang masih paling butuh perbaikan? Update action plan.", tool: "Jurnal lengkap", focus: "Hari ke-50 adalah titik tengah. Momentum yang sudah dibangun harus dijaga dengan konsistensi." },
  { day: 51, phase: 3, title: "Board Coverage: Pastikan Range Anda Covered", category: "Game Theory", duration: "35 menit", task: "Pastikan range Anda punya 'representation' di semua board type. Jika Anda tidak pernah bet di board rendah, lawan bisa exploit Anda. Analisis dengan solver: apakah ada board type yang uncovered?", tool: "Solver", focus: "Range yang balanced harus bisa bet di semua board — ini mencegah eksploitasi berdasarkan board texture." },
  { day: 52, phase: 3, title: "Overfolding & Overbluffing: Leak Universal", category: "Analisis", duration: "35 menit", task: "Dua leak paling umum: (1) fold terlalu sering = memberi lawan bluff yang profitable, (2) bluff terlalu sering = seperti pola masa lalu Anda. Analisis hand history: mana yang lebih sering jadi masalah?", tool: "Hand history + solver check", focus: "Mengetahui leak sendiri adalah lebih berharga dari mempelajari konsep baru yang tidak relevan." },
  { day: 53, phase: 3, title: "MDF: Minimum Defense Frequency", category: "Matematika", duration: "35 menit", task: "MDF = 1 − (bet/(bet+pot)). Jika lawan bet 50% pot, MDF = 1 − (0.5/1.5) = 67%. Artinya Anda harus defend (call+raise) minimal 67% dari range. Latih kalkulasi MDF untuk 10 sizing berbeda.", tool: "Kalkulator / latihan manual", focus: "MDF adalah ground truth dari berapa sering Anda harus defend. Fold lebih dari ini = exploitable." },
  { day: 54, phase: 3, title: "Alpha: Break-Even Bluff Percentage", category: "Matematika", duration: "35 menit", task: "Alpha = bet/(bet+pot). Untuk bet 50% pot, bluff butuh fold 33% untuk break-even. Latih 10 spot: berapa fold equity yang dibutuhkan? Apakah bluff ini profitable melawan range lawan yang spesifik?", tool: "Kalkulator / latihan", focus: "Alpha adalah filter untuk setiap bluff. Jika lawan fold kurang dari alpha, bluff tidak profitable." },
  { day: 55, phase: 3, title: "Combo Counting", category: "Matematika", duration: "35 menit", task: "Hafal: pair suited = 4 combos, unsuited = 12 combos, pair = 6 combos. Latih menghitung berapa combo AK ada di lawan range setelah board tertentu (board pairing, flush card, dll mengurangi combo).", tool: "Latihan manual / Poker Ranger", focus: "Combo counting membuat range thinking presisi. Ini adalah diferensiator pemain top dari pemain average." },
  { day: 56, phase: 3, title: "Advanced Hand Reading", category: "Strategi", duration: "40 menit", task: "Narrow range lawan secara sistematis: berdasarkan preflop action → flop action → turn action → river action. Latih dengan 5 hand lengkap: rekonstruksi range lawan di setiap street.", tool: "Hand history + Poker Ranger", focus: "Hand reading adalah seni menggunakan semua informasi yang tersedia untuk membuat keputusan terbaik." },
  { day: 57, phase: 3, title: "River Bluff Selection: Pilih yang Tepat", category: "Strategi", duration: "35 menit", task: "Di river, pilih bluff yang: (1) punya blocker ke calling range terkuat lawan, (2) tidak punya showdown value (tidak rugi jika lawan check back), (3) cocok dengan story yang Anda ceritakan sepanjang hand.", tool: "Solver / hand analysis", focus: "Tidak semua hand yang miss draw adalah bluff kandidat. Pilih secara strategis berdasarkan blockers." },
  { day: 58, phase: 3, title: "Thin Value Betting", category: "Strategi", duration: "35 menit", task: "Bet tipis = bet hand yang menang lebih dari 50% dari calling range lawan, tapi tidak jelas apakah menang atau tidak. Latih identifikasi 10 spot: apakah hand ini thin value, clear value, atau check/fold?", tool: "Solver / hand analysis", focus: "Thin value adalah sumber besar winnings yang sering ditinggalkan pemain karena takut dipanggil oleh better hand." },
  { day: 59, phase: 3, title: "Overbetting: Kapan dan Mengapa", category: "Strategi", duration: "35 menit", task: "Overbet (>100% pot) dimaksudkan ketika Anda punya nut advantage yang signifikan. Latih: di skenario mana overbet justified? Apa yang harus ada dalam range Anda untuk overbet di river?", tool: "Solver analysis", focus: "Overbet yang tepat adalah play paling profitable dalam arsenal — tapi hanya jika kondisinya benar." },
  { day: 60, phase: 3, title: "Phase 3: Final Assessment", category: "Review", duration: "40 menit", task: "Solver session: 3 spot pilihan, analyze output vs keputusan Anda. Quiz: MDF (3 soal), alpha (3 soal), combo counting (3 soal). Tulis: bagaimana GTO thinking mengubah cara Anda melihat poker?", tool: "Solver + jurnal", focus: "" },

  { day: 61, phase: 4, title: "Tilt: Definisi & 5 Tipe Utama", category: "Psikologi", duration: "30 menit", task: "Identifikasi 5 tipe tilt: (1) bad beat tilt, (2) injustice tilt, (3) mistake tilt, (4) entitlement tilt, (5) desperation tilt. Tulis di jurnal: tipe mana yang paling sering Anda alami? Berikan 2 contoh konkret.", tool: "Buku 'The Mental Game of Poker' - Jared Tendler", focus: "Tidak bisa mengidentifikasi tipe tilt Anda sendiri berarti tidak bisa fix it. Kesadaran adalah langkah pertama." },
  { day: 62, phase: 4, title: "Process Goals vs Result Goals", category: "Psikologi", duration: "30 menit", task: "Result goal: 'menang $500 hari ini'. Process goal: 'membuat keputusan GTO di setiap spot'. Tetapkan 3 process goals untuk sesi poker Anda berikutnya. Evaluasi setelah sesi: tercapai?", tool: "Jurnal", focus: "Hasil adalah lagged indicator — hanya process yang bisa Anda kontrol langsung. Fokus di situ." },
  { day: 63, phase: 4, title: "Emotional Regulation di Meja", category: "Psikologi", duration: "30 menit", task: "Latih teknik: (1) 3 deep breath setelah bad beat, (2) physical reset (stand up, walk), (3) focus kembali ke next hand saja. Buat personal protocol: apa yang Anda lakukan tepat setelah mengalami bad beat besar?", tool: "Jurnal + latihan role-play mental", focus: "Emotional regulation adalah skill yang bisa dilatih seperti any poker skill. Tidak ada yang natural." },
  { day: 64, phase: 4, title: "Memproses Bad Beat Secara Rasional", category: "Psikologi", duration: "30 menit", task: "Latih framework: (1) Apakah keputusan saya EV+ dengan informasi yang ada saat itu? (2) Jika ya, hasil tidak relevan untuk evaluasi. Latih reframing 5 bad beat dengan framework ini.", tool: "Jurnal hand history", focus: "Bad beat yang membuat Anda tilt hanya jika Anda salah memproses apa yang terjadi secara rasional." },
  { day: 65, phase: 4, title: "Variance & Standard Deviation", category: "Risk Management", duration: "35 menit", task: "Gunakan variance calculator untuk simulate 10.000 hands dengan winrate +5 BB/100. Lihat seberapa besar swing yang mungkin terjadi bahkan untuk pemain winning. Berapa downswing terbesar yang mungkin?", tool: "Variance calculator (primedope.com)", focus: "Melihat simulasi variance secara visual adalah cara terbaik untuk stop panik saat downswing terjadi." },
  { day: 66, phase: 4, title: "Results-Oriented Thinking: Bahaya Tersembunyi", category: "Psikologi", duration: "30 menit", task: "Pelajari mengapa evaluasi keputusan berdasarkan hasil (bukan process) merusak development Anda. Analisis: pernahkah Anda memuji diri sendiri untuk play yang sebenarnya buruk karena hasilnya bagus?", tool: "Jurnal refleksi", focus: "Results-oriented thinking adalah paling berbahaya karena sering terasa benar — 'kan saya menang?'" },
  { day: 67, phase: 4, title: "Bankroll Psychology", category: "Psikologi", duration: "30 menit", task: "Pelajari hubungan BRM dan mental game: bermain dengan uang yang tidak bisa Anda relakan = automatic tilt. Evaluasi: apakah stakes yang Anda mainkan sekarang benar-benar comfortable secara psikologis?", tool: "Jurnal + evaluasi BRM", focus: "Fear of money adalah tilt source terbesar untuk banyak pemain. Solusi: play stakes di mana setiap hand terasa 'kecil'." },
  { day: 68, phase: 4, title: "Review Minggu 10: Emotional Deep Dive", category: "Review", duration: "35 menit", task: "Buat peta emosi Anda di meja: apa triggers terbesar? Tulis 3 situasi spesifik yang membuat Anda tilt paling parah. Untuk setiap situasi, tulis rencana respons yang rasional untuk saat itu terjadi lagi.", tool: "Jurnal mendalam", focus: "" },
  { day: 69, phase: 4, title: "Live Tells: Physical Reads", category: "Psikologi", duration: "35 menit", task: "Pelajari prinsip dasar: 'strong means weak, weak means strong' untuk player unsophisticated. Tells klasik: shaking hands (kuat, nervous excitement), eye contact (seringkali strong), pulse visible (strong hand). Latih observasi.", tool: "Buku 'Caro's Book of Poker Tells'", focus: "Live tells bukan magic — itu probabilistic information. Jangan over-rely, tapi jangan ignore." },
  { day: 70, phase: 4, title: "Online Tells & Timing Patterns", category: "Psikologi", duration: "35 menit", task: "Online tells: (1) insta-call = drawing hand atau medium, (2) timed check = weakness atau trap, (3) insta-raise = nut hand atau script, (4) bet sizing tells. Latih identifikasi pattern dari HUD jika available.", tool: "HUD data / hand history", focus: "Online tells lebih subtle tapi sangat konsisten karena banyak pemain tidak sadar mereka melakukannya." },
  { day: 71, phase: 4, title: "Table Image Management", category: "Psikologi", duration: "35 menit", task: "Bagaimana lawan melihat Anda? Jika Anda terlihat sebagai maniac, value bet lebih sering, bluff lebih jarang. Jika terlihat sebagai nit, bluff lebih sering, value bet thin lebih berharga. Evaluasi image Anda sekarang.", tool: "Refleksi + observasi", focus: "Table image adalah asset yang harus dikelola secara aktif, bukan sesuatu yang terjadi secara kebetulan." },
  { day: 72, phase: 4, title: "Player Profiling: Kategorisasi Lawan", category: "Psikologi", duration: "35 menit", task: "Latih 6 kategori: (1) Fish/Rec, (2) Nit, (3) LAG, (4) TAG, (5) Maniac, (6) Reg. Untuk setiap type, tulis 3 adjustment utama.", tool: "HUD / observasi / notes", focus: "Player profiling adalah step pertama untuk exploit. Tidak bisa kategorikan lawan = tidak bisa exploit mereka." },
  { day: 73, phase: 4, title: "Exploiting Fish: Adjustment Spesifik", category: "Strategi", duration: "35 menit", task: "Melawan fish: (1) value bet lebih tipis dan lebih sering, (2) STOP bluffing (mereka tidak fold), (3) isolate mereka preflop, (4) bet bigger for value. Tulis 5 adjustment spesifik untuk fish paling umum di game Anda.", tool: "Jurnal + hand analysis", focus: "Uang datang dari ikan. Adjustments terhadap fish adalah langsung ke bottom line Anda." },
  { day: 74, phase: 4, title: "Beating Regs: Exploitative Edges", category: "Strategi", duration: "35 menit", task: "Melawan reg: temukan tendencies mereka — apakah over-fold vs 3-bet? Over-c-bet? Never float? Never check-raise? Pelajari cara mengidentifikasi leak reg dari HUD stats. Satu exploit bisa bernilai besar.", tool: "HUD data / hand history", focus: "Winning melawan reg butuh patience dan data. Satu exploit yang dijalankan konsisten bisa sangat profitable." },
  { day: 75, phase: 4, title: "Meta-game & History dengan Lawan", category: "Psikologi", duration: "30 menit", task: "Jika lawan tahu Anda sering bluff, mereka akan call lebih. Jika mereka tahu Anda tight, bluff lebih. Pelajari cara menggunakan history untuk setup play di masa depan. Tulis 2 contoh dari pengalaman sendiri.", tool: "Jurnal + refleksi", focus: "Meta-game adalah dimensi poker yang most skilled players exploit tapi least studied oleh banyak pemain." },
  { day: 76, phase: 4, title: "Table Selection: Pilih Battle yang Tepat", category: "Risk Management", duration: "30 menit", task: "Aturan emas: jangan duduk di meja yang Anda adalah player terbaik. Pelajari cara assess meja: VPIP rata-rata, stack sizes, player profiles. Kapan harus pindah meja? Ini adalah edge yang sering diabaikan.", tool: "Observasi / HUD", focus: "Table selection adalah edge terbesar yang tidak butuh skill poker. Ini pure game selection wisdom." },
  { day: 77, phase: 4, title: "Session Management: Kapan Stop?", category: "Risk Management", duration: "30 menit", task: "Tetapkan aturan: (1) stop-loss = 3 buy-in per sesi, (2) stop-win = bebas tapi evaluasi A-game, (3) time limit = maksimum 4 jam, (4) tilt stop = jika tilt signs muncul, istirahat 15 menit.", tool: "Jurnal rules personal", focus: "Sesi yang terlalu panjang atau saat tilt menghapus semua keuntungan dari sesi yang baik sebelumnya." },
  { day: 78, phase: 4, title: "Pre-Session Ritual", category: "Psikologi", duration: "25 menit", task: "Desain ritual 10 menit sebelum main: (1) review 3 process goals untuk sesi ini, (2) 5 menit review quick strategy notes, (3) konfirmasi emosi — apakah Anda dalam state optimal? Jika tidak, tunda sesi.", tool: "Checklist / jurnal", focus: "Pre-session ritual adalah apa yang memisahkan pemain profesional dari pemain yang 'just playing'." },
  { day: 79, phase: 4, title: "Post-Session Review Protocol", category: "Analisis", duration: "30 menit", task: "Setelah setiap sesi: (1) tandai 3 hand yang paling confusing untuk direview, (2) catat apakah process goals tercapai, (3) catat emosi dominant selama sesi, (4) satu insight untuk dibawa ke sesi berikutnya.", tool: "Jurnal + hand history tool", focus: "Pemain yang review sesi mereka improve 2-3x lebih cepat dari yang tidak. Ini adalah compound interest of learning." },
  { day: 80, phase: 4, title: "Phase 4: Mental Game Assessment", category: "Review", duration: "35 menit", task: "Self-assessment mental game: (1) tilt frequency dalam 30 hari terakhir (1-10), (2) BRM compliance (%), (3) kemampuan fold di bad spot (1-10), (4) emotional state average per sesi. Tulis plan untuk area yang masih merah.", tool: "Jurnal komprehensif", focus: "" },

  { day: 81, phase: 5, title: "Putting It All Together", category: "Integrasi", duration: "40 menit", task: "Pilih 5 hand kompleks dari history Anda. Analisis setiap hand menggunakan SEMUA tool yang sudah dipelajari: range thinking, GTO check via solver, mental game assessment. Ini adalah test komprehensif pertama.", tool: "Solver + jurnal + hand history", focus: "Integrasi adalah kemampuan menerapkan semua tool secara simultan, bukan bergantian. Ini adalah mastery." },
  { day: 82, phase: 5, title: "3-Bet Pots: Advanced Deep Dive", category: "Strategi", duration: "40 menit", task: "Analisis strategi lengkap dalam 3-bet pot: flop (c-bet frequency, sizing), turn (barrel atau give up?), river (value or bluff). Solve 2 spot 3-bet pot dengan solver. Identifikasi pola.", tool: "Solver", focus: "3-bet pots memiliki SPR lebih rendah dan dinamika yang sangat berbeda dari single-raised pots." },
  { day: 83, phase: 5, title: "4-Bet Pots: Commitment & SPR", category: "Strategi", duration: "35 menit", task: "Di 4-bet pot, SPR sering <3. Pelajari commitment threshold: jika SPR <2 dan Anda bet flop, Anda practically committed untuk pot. Kapan check/fold di 4-bet pot? Analisis 3 skenario SPR berbeda.", tool: "Solver / SPR calculator", focus: "4-bet pots adalah high stakes territory. Satu keputusan salah di flop = stack hilang." },
  { day: 84, phase: 5, title: "Limped & Passive Pots", category: "Strategi", duration: "35 menit", task: "Di limped pots: range semua player lebih lebar dan lebih weak. Isolate limp dengan strong hands. Post-flop: range lebih lemah, bluff less profitable, value bet more thinly. Analisis 3 hand limped pot.", tool: "Hand analysis", focus: "Limped pots adalah teritoris yang berbeda — banyak pemain tidak punya strategi khusus di sini." },
  { day: 85, phase: 5, title: "Ante Effect & Tournament Adjustments", category: "Strategi", duration: "35 menit", task: "Antes meningkatkan pot preflop secara signifikan, mendorong lebih banyak stealing. Pelajari bagaimana antes mengubah RFI ranges, blind defense, dan squeeze frequency. Solve 2 spot dengan dan tanpa antes.", tool: "Solver / chart ante vs non-ante", focus: "Antes adalah multiplier untuk aggression preflop. Failing to adjust di ante game adalah leak besar." },
  { day: 86, phase: 5, title: "Rake Impact & Game Selection", category: "Risk Management", duration: "30 menit", task: "Rake memotong EV setiap pot. Pelajari bagaimana rake mempengaruhi strategy: bet smaller (agar tidak build pot untuk rake), pilih games dengan rake cap, dan identifikasi rake struktur di game yang Anda mainkan.", tool: "Rake calculator / analisis game", focus: "Rake yang tinggi bisa mengubah game EV+ menjadi EV−. Ini adalah bisnis, bukan hanya game." },
  { day: 87, phase: 5, title: "Stats & Data: VPIP, PFR, 3bet, WTSD", category: "Analisis", duration: "35 menit", task: "Pelajari interpretasi HUD stats: VPIP (volume ke pot), PFR (preflop raise%), 3bet%, WTSD (went to showdown%). Tipe pemain berdasarkan VPIP/PFR: nit (12/10), TAG (20/16), LAG (30/25), fish (45/8).", tool: "HUD (PokerTracker/Hold'em Manager)", focus: "Data adalah lawan dari guessing. Pemain yang baca stats dengan benar punya massive edge." },
  { day: 88, phase: 5, title: "Leak Finding Session", category: "Analisis", duration: "40 menit", task: "Gunakan database hand history Anda. Temukan 3 leak spesifik dari data: (1) winrate OOP vs IP, (2) 3-bet frequency, (3) WTSD terlalu tinggi (call station). Quantify setiap leak.", tool: "PokerTracker / Hold'em Manager + solver", focus: "Leak yang terquantifikasi adalah leak yang bisa diperbaiki. Tanpa data, Anda hanya menebak." },
  { day: 89, phase: 5, title: "Plugging Leaks: Action Plan", category: "Analisis", duration: "35 menit", task: "Untuk setiap 3 leak yang ditemukan Day 88: tulis action plan spesifik. Contoh: 'Leak: fold terlalu sering di BB vs BTN steal. Fix: pelajari BB defense range vs BTN, drill 20 spot per hari selama 1 minggu.'", tool: "Jurnal + solver", focus: "Action plan yang spesifik adalah perbedaan antara pemain yang tahu leaknya dan pemain yang actually fix it." },
  { day: 90, phase: 5, title: "90-Day Comprehensive Review", category: "Milestone", duration: "40 menit", task: "Baca jurnal dari Day 1 sampai hari ini. Bandingkan self-assessment Day 1 vs sekarang. Mana yang sudah jauh lebih baik? Mana yang masih perlu waktu? Tulis letter to your past self.", tool: "Jurnal lengkap", focus: "Review compounding adalah salah satu latihan paling powerful untuk melihat pertumbuhan nyata." },
  { day: 91, phase: 5, title: "Advanced Multi-Street Bluffing", category: "Strategi", duration: "40 menit", task: "Pelajari 3-street bluff yang credible: story harus consistent dari flop ke turn ke river. Kapan give up di turn? Kapan barrel ketiga? Analisis dengan solver: frekuensi barrel optimal di berbagai run-out.", tool: "Solver", focus: "Triple barrel yang dipilih dengan tepat adalah play paling profitable — tapi harus coherent dengan range Anda." },
  { day: 92, phase: 5, title: "Live Tournament Strategy: Stack-to-Blind", category: "Strategi", duration: "35 menit", task: "Pelajari adjustment per stack depth dalam tournament: 30BB+ (normal), 20BB (push/call adjusted), 15BB (jam-or-fold for many hands), 10BB (almost pure push/fold). ICM pressure di bubble dan final table.", tool: "ICMIZER / push-fold chart", focus: "Tournament mastery membutuhkan sangat berbeda adjustment per stack depth. Satu chart tidak cukup." },
  { day: 93, phase: 5, title: "Cash Game Optimization", category: "Strategi", duration: "35 menit", task: "Optimasi sesi cash game: seat selection (duduk di kiri fish), buy-in strategy (max buy-in almost always), game selection (pilih game dengan VPIP tertinggi di lobby), time of play (weekends = more fish).", tool: "Checklist + observasi", focus: "Cash game optimization di luar meja bisa meningkatkan winrate sebesar edge yang didapat dari skill improvement." },
  { day: 94, phase: 5, title: "Study Group & Peer Discussion", category: "Komunitas", duration: "40 menit", task: "Cari satu atau dua pemain serius untuk diskusi hand (2+2 forums, Discord poker communities, Reddit r/poker). Post 2 hand confusing dari minggu ini. Baca analisis orang lain. Peer learning accelerates growth dramatically.", tool: "Forum poker / Discord", focus: "Isolated study has ceiling. Peer feedback exposes blind spots yang tidak terlihat dari dalam." },
  { day: 95, phase: 5, title: "Solver Deep Dive: Spot Tersulit", category: "Game Theory", duration: "45 menit", task: "Pilih 3 spot yang PALING membingungkan dari keseluruhan 94 hari study. Solve setiap spot. Analyze secara mendalam: mengapa solver membuat keputusan ini? Apa yang bisa Anda pelajari dari setiap spot?", tool: "Solver — full 45 menit fokus", focus: "Hari solver penuh. Tidak ada distraksi. Ini adalah gym session yang paling intense dalam 100 hari." },
  { day: 96, phase: 5, title: "Personal Poker Philosophy Document", category: "Milestone", duration: "40 menit", task: "Tulis 1-2 halaman: filosofi poker pribadi Anda. Termasuk: (1) prinsip-prinsip yang Anda pegang, (2) adjustments key melawan berbagai player type, (3) mental game principles, (4) kapan Anda bermain terbaik.", tool: "Jurnal / dokumen tertulis", focus: "Pemain terbaik punya filosofi yang jelas. Menulis ini akan crystalize semua yang sudah dipelajari." },
  { day: 97, phase: 5, title: "Final Weakness Elimination", category: "Analisis", duration: "40 menit", task: "Identifikasi satu kelemahan terbesar yang masih ada. Dedicated session untuk address ini secara frontal: solver work, video, drill, atau journaling deep. Buat plan untuk 30 hari setelah program ini selesai.", tool: "Sesuai kelemahan yang diidentifikasi", focus: "One last focused effort di weakness terbesar. Ini adalah sprint terakhir sebelum finish line." },
  { day: 98, phase: 5, title: "Review Seluruh Perjalanan 100 Hari", category: "Review", duration: "40 menit", task: "Baca semua jurnal dari hari 1 sampai 97. Tandai: top 10 insight terbesar. Top 5 moment breakthrough. Top 3 hal yang masih harus dikerjakan setelah program ini. Ini adalah rekap pembelajaran 100 hari.", tool: "Semua jurnal", focus: "" },
  { day: 99, phase: 5, title: "Final Assessment: Self-Test Komprehensif", category: "Milestone", duration: "40 menit", task: "Self-test dari semua area: matematika (pot odds, EV, MDF, alpha — 5 soal masing-masing), strategi (3-bet, river play — 5 soal), GTO (solver interpretation — 3 soal), mental game (scenario response — 3 soal). Score yourself.", tool: "Quiz bank personal + jurnal", focus: "Final test. Ini bukan soal nilai — ini soal melihat dengan jelas di mana Anda berdiri setelah 99 hari kerja keras." },
  { day: 100, phase: 5, title: "Day 100: Rayakan & Set Next Goals", category: "Milestone", duration: "30 menit", task: "Anda telah menyelesaikan 100 hari. Rayakan dengan cara yang meaningful. Lalu: tulis 3 goals untuk 100 hari berikutnya. Apa stakes yang ingin Anda mainkan? Skill apa yang ingin Anda kuasai? Poker journey tidak pernah selesai.", tool: "Jurnal + refleksi", focus: "100 hari adalah fondasi. Yang lebih penting adalah apa yang Anda lakukan dengan fondasi ini selanjutnya." },
];

const categoryColors = {
  "Fondasi": "#C8A96E", "Matematika": "#7EB8C9", "Strategi": "#9B7EC8",
  "Psikologi": "#C87E7E", "Game Theory": "#7EC87E", "Risk Management": "#C8C87E",
  "Analisis": "#7EAFC8", "Review": "#888", "Milestone": "#FFD700",
  "Mindset": "#C87EB8", "Komunitas": "#7EC8B8", "Integrasi": "#C8A07E",
};

export default function PokerPlan() {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredDays = allDays.filter(d => {
    const matchPhase = selectedPhase === 0 || d.phase === selectedPhase;
    const matchSearch = search === "" || d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    return matchPhase && matchSearch;
  });

  const toggleComplete = (day) => {
    setCompletedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const completedCount = completedDays.length;
  const progressPct = Math.round((completedCount / 100) * 100);
  const currentPhaseData = phases.find(p => p.id === selectedPhase);

  if (selectedDay !== null && view === "detail") {
    const day = allDays.find(d => d.day === selectedDay);
    const phase = phases.find(p => p.id === day.phase);
    const isCompleted = completedDays.includes(day.day);
    const prevDay = selectedDay > 1 ? selectedDay - 1 : null;
    const nextDay = selectedDay < 100 ? selectedDay + 1 : null;

    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e8e0d0", fontFamily: "'Georgia', serif", padding: "24px 16px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <button onClick={() => { setView("grid"); setSelectedDay(null); }} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "8px 16px", cursor: "pointer", borderRadius: 4, marginBottom: 24, fontFamily: "inherit", fontSize: 13 }}>
            ← Kembali ke Daftar
          </button>

          <div style={{ border: `1px solid ${phase.color}33`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: `${phase.color}15`, borderBottom: `1px solid ${phase.color}33`, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11, color: phase.color, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                    Phase {day.phase}: {phase.name} · Hari {day.day}
                  </div>
                  <h1 style={{ margin: 0, fontSize: 22, fontWeight: "normal", color: "#f0e8d8", lineHeight: 1.3 }}>{day.title}</h1>
                </div>
                <span style={{ background: categoryColors[day.category] + "25", color: categoryColors[day.category], border: `1px solid ${categoryColors[day.category]}44`, padding: "4px 10px", borderRadius: 20, fontSize: 11, whiteSpace: "nowrap", marginLeft: 12 }}>
                  {day.category}
                </span>
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 6, padding: "10px 16px", flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>DURASI</div>
                  <div style={{ color: "#C8A96E", fontWeight: "bold" }}>{day.duration}</div>
                </div>
                <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 6, padding: "10px 16px", flex: 2 }}>
                  <div style={{ fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>TOOL / RESOURCE</div>
                  <div style={{ color: "#b8b0a0", fontSize: 13 }}>{day.tool}</div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>TUGAS HARI INI</div>
                <div style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", borderRadius: 6, padding: "16px 20px", color: "#d0c8b8", lineHeight: 1.8, fontSize: 14 }}>
                  {day.task}
                </div>
              </div>

              {day.focus && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>MENGAPA INI PENTING</div>
                  <div style={{ borderLeft: `3px solid ${phase.color}`, paddingLeft: 16, color: "#a8a090", lineHeight: 1.7, fontStyle: "italic", fontSize: 13 }}>
                    {day.focus}
                  </div>
                </div>
              )}

              <button
                onClick={() => toggleComplete(day.day)}
                style={{ width: "100%", padding: "14px", background: isCompleted ? "#1a3a1a" : "#1a1a1a", border: `1px solid ${isCompleted ? "#4a8a4a" : "#333"}`, color: isCompleted ? "#7EC87E" : "#888", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 13, letterSpacing: 1, transition: "all 0.2s" }}>
                {isCompleted ? "✓ SELESAI — Klik untuk batalkan" : "○ Tandai Selesai"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {prevDay && (
              <button onClick={() => setSelectedDay(prevDay)} style={{ flex: 1, padding: "12px", background: "#111", border: "1px solid #222", color: "#666", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
                ← Hari {prevDay}
              </button>
            )}
            {nextDay && (
              <button onClick={() => setSelectedDay(nextDay)} style={{ flex: 1, padding: "12px", background: "#111", border: "1px solid #222", color: "#666", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
                Hari {nextDay} →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#e8e0d0", fontFamily: "'Georgia', serif" }}>
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "32px 24px 24px", background: "linear-gradient(180deg, #0f0a06 0%, #080808 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#C8A96E", textTransform: "uppercase", marginBottom: 8 }}>Texas Hold'em Mastery Program</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: "normal", color: "#f0e8d8" }}>100 Hari Menguasai Poker</h1>
          <p style={{ margin: "0 0 24px", color: "#666", fontSize: 13 }}>30–45 menit per hari · Game Theory · Probability · Psychology · Risk Management</p>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#666" }}>{completedCount} dari 100 hari selesai</span>
              <span style={{ fontSize: 11, color: "#C8A96E" }}>{progressPct}%</span>
            </div>
            <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2 }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg, #C8A96E, #9B7EC8)", borderRadius: 2, width: `${progressPct}%`, transition: "width 0.5s" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {phases.map(p => {
              const pDays = allDays.filter(d => d.phase === p.id);
              const pCompleted = pDays.filter(d => completedDays.includes(d.day)).length;
              return (
                <div key={p.id} style={{ fontSize: 10, color: p.color + "99", background: p.color + "10", border: `1px solid ${p.color}22`, padding: "3px 8px", borderRadius: 20 }}>
                  Phase {p.id}: {pCompleted}/{pDays.length}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedPhase(0)}
            style={{ padding: "8px 16px", background: selectedPhase === 0 ? "#C8A96E" : "#111", border: `1px solid ${selectedPhase === 0 ? "#C8A96E" : "#222"}`, color: selectedPhase === 0 ? "#0a0a0a" : "#666", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontSize: 11, letterSpacing: 1 }}>
            SEMUA
          </button>
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              style={{ padding: "8px 14px", background: selectedPhase === p.id ? p.color + "20" : "#111", border: `1px solid ${selectedPhase === p.id ? p.color : "#222"}`, color: selectedPhase === p.id ? p.color : "#666", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontSize: 11, letterSpacing: 1 }}>
              {p.name}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari topik atau kategori..."
            style={{ width: "100%", boxSizing: "border-box", background: "#0f0f0f", border: "1px solid #1e1e1e", color: "#d0c8b8", padding: "10px 14px", borderRadius: 4, fontFamily: "inherit", fontSize: 13, outline: "none" }}
          />
        </div>

        {selectedPhase !== 0 && currentPhaseData && (
          <div style={{ background: currentPhaseData.color + "10", border: `1px solid ${currentPhaseData.color}22`, borderRadius: 6, padding: "12px 16px", marginBottom: 20 }}>
            <span style={{ color: currentPhaseData.color, fontSize: 11, letterSpacing: 2 }}>HARI {currentPhaseData.days}</span>
            <span style={{ color: "#666", fontSize: 13, marginLeft: 12 }}>{currentPhaseData.desc}</span>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {filteredDays.map(d => {
            const phase = phases.find(p => p.id === d.phase);
            const isCompleted = completedDays.includes(d.day);
            return (
              <div
                key={d.day}
                onClick={() => { setSelectedDay(d.day); setView("detail"); }}
                style={{ background: isCompleted ? "#0d1a0d" : "#0f0f0f", border: `1px solid ${isCompleted ? "#2a4a2a" : "#1a1a1a"}`, borderRadius: 6, padding: "16px", cursor: "pointer", transition: "all 0.15s", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: phase.color + (isCompleted ? "99" : "44") }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: phase.color, letterSpacing: 2 }}>HARI {d.day}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {isCompleted && <span style={{ color: "#4a8a4a", fontSize: 12 }}>✓</span>}
                    <span style={{ fontSize: 9, color: categoryColors[d.category] + "88", background: categoryColors[d.category] + "15", border: `1px solid ${categoryColors[d.category]}25`, padding: "2px 6px", borderRadius: 10 }}>
                      {d.category}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: 14, color: isCompleted ? "#7a9a7a" : "#d0c8b8", marginBottom: 6, lineHeight: 1.3 }}>{d.title}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{d.duration}</div>
              </div>
            );
          })}
        </div>

        {filteredDays.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>Tidak ada hari yang ditemukan.</div>
        )}
      </div>
    </div>
  );
}
