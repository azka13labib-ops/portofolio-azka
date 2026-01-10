#!/usr/bin/env bash
# mint-neon.sh — Linux Mint ASCII logo dengan animasi typing + neon glow
# Run: chmod +x mint-neon.sh && ./mint-neon.sh

# --------- Pengaturan Cepat ---------
TITLE="Linux Mint"
TYPE_SPEED=0.03    # detik per karakter (efek typing)
CYCLES=2           # berapa kali glow berdenyut
FRAME_DELAY=0.07   # jeda antar frame glow
NEON_COLORS=(46 82 118 154 118 82 46)  # 256-color (hijau -> kuning lembut -> balik)
TITLE_COLOR=46

# --------- Utilitas ---------
has() { command -v "$1" >/dev/null 2>&1; }
trap 'tput cnorm 2>/dev/null' EXIT
tput civis 2>/dev/null || true
COLS=$(tput cols 2>/dev/null || echo 80)
ROWS=$(tput lines 2>/dev/null || echo 24)

# ASCII art logo (LM dalam bentuk “daun”/rounded shape)
read -r -d '' ART <<'ASCII'
              .-=-=-=-=-=-=-=-=-=-=-=-=-=-.
           .-'                             '-.
         .'        _       __      __         '.
        /         | |     / /__   / /  ___      \
       ;          | | /| / / _ \ / /  / _ \      ;
       |          | |/ |/ /  __// /__|  __/      |
       ;          |__/|__/\___/ \____/\___|      ;
        \        _______  _        _             /
         '.     |__   __|(_)      | |          .'
           '-.     | |    _   ___ | |__     .-'
              '-.   | |  | | / _ \| '_ \ .-'
                 '-.| |  | ||  __/| | | |-.
                    '\_|  |_| \___||_| |_/
ASCII

# Hitung data untuk center
mapfile -t ART_LINES <<< "$ART"
ART_HEIGHT=${#ART_LINES[@]}
ART_WIDTH=0
for line in "${ART_LINES[@]}"; do
  (( ${#line} > ART_WIDTH )) && ART_WIDTH=${#line}
done

vcenter_pad() {
  local total="$1"
  local box="$2"
  local pad=$(( (total - box) / 2 ))
  (( pad < 0 )) && pad=0
  echo "$pad"
}

repeat_newlines() {
  local n="$1"
  for ((i=0;i<n;i++)); do printf "\n"; done
}

center_line() {
  local text="$1"
  local pad=$(( (COLS - ${#text}) / 2 ))
  (( pad < 0 )) && pad=0
  printf "%*s%s\n" "$pad" "" "$text"
}

print_art_color() {
  local color="$1"
  local top_pad
  local vbox=$((ART_HEIGHT + 6)) # + ruang judul & jarak
  top_pad=$(vcenter_pad "$ROWS" "$vbox")
  clear
  repeat_newlines "$top_pad"

  # Judul (tanpa typing di frame animasi)
  printf "\e[1m"; center_line "$TITLE"; printf "\e[0m\n"

  # Cetak ART terpusat dengan warna
  local pad=$(( (COLS - ART_WIDTH) / 2 ))
  (( pad < 0 )) && pad=0
  for line in "${ART_LINES[@]}"; do
    printf "%*s" "$pad" ""
    printf "\e[38;5;%sm%s\e[0m\n" "$color" "$line"
  done
  printf "\n"
}

type_print_center() {
  local text="$1" speed="$2" color="$3"
  local pad=$(( (COLS - ${#text}) / 2 ))
  (( pad < 0 )) && pad=0
  printf "%*s" "$pad" ""
  for ((i=0;i<${#text};i++)); do
    printf "\e[38;5;%sm%s\e[0m" "$color" "${text:i:1}"
    sleep "$speed"
  done
  printf "\n"
}

# --------- Eksekusi ---------
clear
# 1) Ketik judulnya dulu
type_print_center "$TITLE" "$TYPE_SPEED" "$TITLE_COLOR"
sleep 0.3

# 2) Tampilkan logo statis sekali (cantik) sebelum glow
print_art_color "${NEON_COLORS[0]}"
sleep 0.25

# 3) Animasi pulsating glow
for ((loop=0; loop<CYCLES; loop++)); do
  for col in "${NEON_COLORS[@]}"; do
    print_art_color "$col"
    sleep "$FRAME_DELAY"
  done
done

# 4) Tutup dengan frame akhir + sistem info opsional
print_art_color "${NEON_COLORS[2]}"

# Jika ada neofetch, tampilkan info sistem (theme mint)
if has neofetch; then
  echo ""
  neofetch --ascii_distro mint --disable packages --colors 46 46 46 46 46 46
fi

# Tampilkan kursor kembali
tput cnorm 2>/dev/null || true
