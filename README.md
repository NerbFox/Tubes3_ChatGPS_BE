# Tubes3_13521043

# CHATGPS
> Disusun untuk memenuhi Tugas Besar 3 Mata Kuliah Strategi Algoritma

## Daftar Isi
* [Deskripsi Singkat Program](#deskripsi-singkat-program)
* [Struktur Program](#struktur-program)
* [Requirement Program](#requirement-program)
* [Cara Menyiapkan *Environment*](#cara-menyiapkan-environment)
* [Cara Menjalankan Backend](#cara-menjalankan-Backend)
* [Cara Menggunakan Backend](#cara-menggunakan-Backend)
* [Author](#author)

## Deskripsi Singkat Program
Repository ini berisi backend yang digunakan untuk tugas besar 3 ini, Repository berisi beberapa file penting yaitu algo.js yang berisi fungsi-fungsi yang digunakan untuk string matching dan fungsi-fungsi yang dipakai di program, classification.js yang berisi program yang dapat mengklasifikasi input pengguna menjadi tipe pertanyaan apa, responseContoller.js untuk mengirim hal-hal yang perlu ditunjukkan ke frontend sekaligus untuk menyimpan data ke database, dan index.js dimana inti backend berada. <br/>


## Struktur Program
```bash
.
│   
│   
└───doc
│   Tubes3_K1_13521043_ChatGPS.pdf
│  
└───src
    │   .DS_Store
    │   .gitignore
    │   index.js
    │   package-lock.json
    │   package.json
    │   README.md
    │   
    ├───config
    │       .env
    │
    ├───controllers
    │       responseController.js
    │
    ├───functions
    │       algo.js
    │       classification.js
    │
    ├───models
    │       History.js
    │       Question.js
    │
    └───node_modules

```

## Requirement Program
* npm
* Internet yang berjalan
* nodemon

## Cara Menyiapkan *Environment*
1. Bikin folder config dan bikin file .env di dalamnya.
2. Pakai terminal dan pindah ke dalam directory src repository ini, dan jalankan perintah
```bash
npm install
```
3. Buka terminal lagi dan jalankan perintah di directory apa saja
```bash
npm i -g nodemon
```

## Cara Menjalankan Backend Di Lokal
1. Siapkan dua terminal yang berbeda
2. Pindah ke directory dimana beradanya index.js
3. Ketika sudah berada di dalam directory tersebut, jalankan perintah
``` bash
nodemon index.js
```
4. Tunggu sampai ada tulisan "listening on port..." pada terminal anda

## Cara Menggunakan Backend
1. Masukkan curl http://localhost:{digit host anda}/?question={input} pada terminal anda yang bukan terminal dimana anda melakukan nodemon index.js, {input} bisa diganti menjadi masukkan anda dan {digit host anda} harus diganti dengan angka host yang sesuai.


## Author
* [Nigel Sahl - 13521043]
* [Ariel Jovananda - 13521086]
* [Rava Maulana Azzikri - 13521149]
