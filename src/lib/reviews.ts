// Recenze klientů — jediný zdroj pro /recenze i ukázku na homepage.
// Přidání další recenze = nový objekt v poli, nic jiného se měnit nemusí.
// Souhlas se zveřejněním má klientka (recenze jí poslali sami autoři).
//
// Pořadí v poli = pořadí na /recenze (nejsilnější/nejkonkrétnější první).

import photoPetraAdamova from "@/assets/review-petra-adamova.webp";
import photoAlenaB from "@/assets/review-alena-b.webp";
import photoPetraS from "@/assets/review-petra-s.webp";

export type Review = {
  // Jak se recenzent podepisuje — celé jméno nebo jméno s iniciálou.
  name: string;
  // Kdo to je / odkud recenze je ("Host akce Velvet Society", "Lžička Café"…).
  role: string;
  // Slug zážitku z experiences.ts — vykreslí se jako odkaz na jeho detail.
  experienceSlug?: string;
  text: string;
  // Zkrácená verze pro homepage u dlouhých recenzí — věrný výňatek z `text`
  // (vynechané části označené „…“), ne přeformulování.
  excerpt?: string;
  // Malá kulatá fotka u jména (čtvercový výřez, ~200px stačí).
  photo?: string;
  // Zobrazit v ukázce na homepage (max. 3).
  featured?: boolean;
};

export const reviews: Review[] = [
  {
    name: "Petra Adamová",
    role: "Founder & CEO Velvet Society",
    photo: photoPetraAdamova,
    text: "Za Velvet Society bych chtěla Lucii Ševčíkové a jejímu projektu Flower Bar z celého srdce poděkovat za krásnou spolupráci na našem Grand Openingu. Flower Bar nebyl jen doplňkem večera – stal se jeho nádhernou součástí. Celý nápad s květinami na naši akci doslova rozzářil a přinesl do ní radost, ženskost a krásnou energii. Dámy byly nadšené, s kytičkami se fotily, odnášely si je domů a bylo vidět, jakou jim udělaly radost. 🌸 Právě takové detaily vytvářejí emoci a vzpomínku, která zůstává ještě dlouho po skončení akce. Flower Bar považuji za originální a unikátní projekt s nádhernou myšlenkou a věřím, že má před sebou skvělou budoucnost. Lucii přeji mnoho úspěchů, štěstí a krásných příležitostí na její další cestě. A za Velvet Society mohu říct jediné – těším se na naši další spolupráci.",
    excerpt:
      "Flower Bar nebyl jen doplňkem večera – stal se jeho nádhernou součástí. … Dámy byly nadšené, s kytičkami se fotily, odnášely si je domů a bylo vidět, jakou jim udělaly radost. 🌸",
    featured: true,
  },
  {
    name: "Denisa V.",
    role: "Lžička Café",
    text: "Ráda bych Lucince poděkovala za úžasný pop-up, který uskutečnila u nás v kavárně. Všichni hosté obdivovali květiny a Lucky obrovský talent a cit pro kombinování barev. Obzvlášť si cením nápadu s osobním vzkazem a na výsledku je znát, že Lucka dělá svojí práci srdcem. U Lucky v baru místo sklenic s rumem, co do hlavy stoupá, se vám pod nohama celá louka houpá.",
    excerpt:
      "Ráda bych Lucince poděkovala za úžasný pop-up, který uskutečnila u nás v kavárně. Všichni hosté obdivovali květiny a Lucky obrovský talent a cit pro kombinování barev.",
    featured: true,
  },
  {
    name: "Petra Š.",
    role: "Host akce Velvet Society",
    photo: photoPetraS,
    text: "Na jedné krásné akci jsem poprvé poznala květinový bar 🌸, o kterém jsem nikdy neslyšela, a byla jsem, a nejen já, velmi nadšená. Vybrala jsem si květiny podle svého vkusu, vytvořila vlastní kytičku, a když vám chybí inspirace, s výběrem i laděním ochotně poradí úžasná Luci. Je krásné přinést si domů něco, co jste si samy vytvořily a co vám připomíná příjemný večer i milá setkání. 🌸🌸🌸 Hlavně velmi originální, v krásné květinové taštičce. Vykouzlí krásný detail celé akce a nezapomenutelný zážitek.",
  },
  {
    name: "Alena B.",
    role: "Host akce Velvet Society",
    photo: photoAlenaB,
    text: "Spojení „květinový bar“ jsem poprvé slyšela a zažila přímo od Lucky na eventu Velvet Society a jako milovnice květin jsem byla nadšená. Možnost poskládat si při odchodu vlastní květinovou taštičku z jejího baru pro mne byla doslova třešničkou na dortu celého večera! Takový odchod z akce přeji zažít každé ženě.",
    excerpt:
      "Možnost poskládat si při odchodu vlastní květinovou taštičku z jejího baru pro mne byla doslova třešničkou na dortu celého večera! Takový odchod z akce přeji zažít každé ženě.",
    featured: true,
  },
  {
    name: "Daniela J.",
    role: "Host akce Velvet Society",
    text: "Květinový bar od Lucie byl velmi milým zpestřením společenské akce. Já osobně květiny miluji, a tak je tento způsob vzpomínky pro mě osobně velmi sympatický. Květinky mi dokonce vydržely na stole několik dnů a všichni se mě na ně ptali, když je viděli.",
  },
  {
    name: "Diana K.",
    role: "Host akce Velvet Society",
    text: "Moc se mi líbil květinový bar. Já si myslím, že takový spot na eventech je skvělá věc. Květinky stále mám doma, vypadá to hezky. 🤍🤍",
  },
];
