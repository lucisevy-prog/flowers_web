// Recenze klientů — jediný zdroj pro /recenze i ukázku na homepage.
// Přidání další recenze = nový objekt v poli, nic jiného se měnit nemusí.
//
// ⚠️ ZÁSTUPNÝ OBSAH: texty, jména i fotky níže jsou zatím jen ukázka pro
// odladění designu. Před pushem je nahradit skutečnými recenzemi (a mít od
// recenzentů souhlas se zveřejněním jména). Fotky jsou dočasně vypůjčené
// z jiných sekcí webu.
import venueBachelorette from "@/assets/venue-bachelorette.webp";
import premiumFlowerBar from "@/assets/premium-flower-bar.webp";
import flowerFortune from "@/assets/flower-fortune.webp";

export type Review = {
  // Jak se recenzent podepisuje — celé jméno, křestní jméno nebo iniciály.
  name: string;
  // Typ akce, zobrazený pod jménem ("Rozlučka se svobodou", "Firemní event"…).
  occasion: string;
  // Slug zážitku z experiences.ts — vykreslí se jako odkaz na jeho detail.
  experienceSlug?: string;
  text: string;
  // Fotka z akce (volitelná) + popis pro čtečky obrazovky.
  image?: string;
  imageAlt?: string;
  // Zobrazit v ukázce na homepage (ideálně 3 kratší recenze).
  featured?: boolean;
};

export const reviews: Review[] = [
  {
    name: "Jméno Příjmení",
    occasion: "Rozlučka se svobodou",
    experienceSlug: "flower-fortune",
    text: "[Zástupný text 1] Tady bude skutečná recenze. Ukázka má délku běžné recenze, aby bylo vidět, jak bude stránka vypadat se skutečným obsahem — dvě až tři věty o tom, jak akce proběhla a co se hostům líbilo nejvíc.",
    image: flowerFortune,
    imageAlt: "Zástupná fotka — Flower Fortune",
    featured: true,
  },
  {
    name: "Jméno Příjmení",
    occasion: "Svatba",
    experienceSlug: "premium-flower-bar",
    text: "[Zástupný text 2] Krátká recenze o jedné až dvou větách.",
    featured: true,
  },
  {
    name: "Jméno Příjmení",
    occasion: "Firemní event",
    experienceSlug: "premium-flower-bar",
    text: "[Zástupný text 3] Delší recenze pro ověření, jak se karta chová při větším množství textu. Někteří klienti napíšou jen pár slov, jiní celý odstavec — rozložení musí fungovat v obou případech, aniž by se karty rozjely nebo text působil stísněně. Proto je tahle ukázka záměrně delší než ostatní, zhruba jako opravdu podrobná recenze.",
    image: premiumFlowerBar,
    imageAlt: "Zástupná fotka — Premium Flower Bar",
  },
  {
    name: "Jméno Příjmení",
    occasion: "Gender reveal",
    experienceSlug: "baby-shower-bloom",
    text: "[Zástupný text 4] Středně dlouhá recenze, dvě až tři věty. Ukázka pro kartu bez fotky, aby bylo vidět, jak vedle sebe působí textové a fotografické karty.",
    featured: true,
  },
  {
    name: "Jméno Příjmení",
    occasion: "Narozeninová oslava",
    experienceSlug: "hvezdny-flower-bar",
    text: "[Zástupný text 5] Recenze střední délky s fotkou z akce. Fotka dodá stránce život a ukáže skutečnou atmosféru.",
    image: venueBachelorette,
    imageAlt: "Zástupná fotka — oslava",
  },
  {
    name: "Jméno Příjmení",
    occasion: "Rozlučka se svobodou",
    experienceSlug: "diy-flower-bar-kit",
    text: "[Zástupný text 6] Poslední recenze, kratší. Jedna dvě věty stačí.",
  },
];
