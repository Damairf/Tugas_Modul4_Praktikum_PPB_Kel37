// src/data/semua-resep.js
import { ResepMakanan } from "./makanan";
import { ResepMinuman } from "./minuman";

const semuaMakanan = Object.values(ResepMakanan.resep).map((resep) => ({
  ...resep,
  kategori: "makanan",
}));

const semuaMinuman = Object.values(ResepMinuman.resep).map((resep) => ({
  ...resep,
  kategori: "minuman",
}));

export const semuaResep = [...semuaMakanan, ...semuaMinuman];
