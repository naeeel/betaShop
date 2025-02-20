Panduan Clone Repository

Panduan ini menjelaskan langkah-langkah untuk meng-clone repository dari GitHub ke lokal.

Persyaratan

Pastikan Anda telah menginstal:

Git: Download Git

SSH Key (Opsional): Jika repository bersifat privat dan menggunakan autentikasi SSH

Langkah-Langkah Clone Repository

1. Buka Terminal atau Command Prompt

Pada Windows, gunakan Command Prompt atau Git Bash. Pada macOS dan Linux, gunakan Terminal.

2. Pindah ke Direktori Tempat Repository Akan Disimpan

cd /path/to/directory

Gantilah /path/to/directory dengan lokasi folder yang diinginkan.

3. Clone Repository

Menggunakan HTTPS

git clone https://github.com/username/repository.git

Menggunakan SSH (Jika telah mengatur SSH Key)

git clone git@github.com:username/repository.git

Gantilah username dan repository dengan nama pengguna dan repository yang sesuai.

4. Masuk ke Direktori Repository

cd repository

Gantilah repository dengan nama repository yang di-clone.

5. Konfigurasi Remote (Opsional)

Untuk memastikan remote repository sudah dikonfigurasi dengan benar:

git remote -v

6. Pull Update Terbaru (Opsional)

Jika ingin memastikan repository sudah update:

git pull origin main

Gantilah main dengan nama branch default repository jika berbeda.

Troubleshooting

Jika terjadi error saat cloning, coba periksa:

Apakah URL repository benar?

Apakah Anda memiliki akses ke repository (khusus private repository)?

Jika menggunakan SSH, pastikan SSH key telah ditambahkan ke GitHub.

Untuk informasi lebih lanjut, kunjungi: GitHub Docs

Sekian panduan clone repository ini. Semoga bermanfaat!

