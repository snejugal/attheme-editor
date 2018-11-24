import React from "react";
import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import { PartialLocalization, VariablesAmountProp } from "./types";

// eslint-disable-next-line quotes
type Forms = "one" | "other";

const pluralRules = new Intl.PluralRules(`uz`);
const select = (num: number): Forms => pluralRules.select(num) as Forms;

const localization: PartialLocalization = {
  dragAndDrop: {
    hint: `Fayllarni bu yerga o'tkazing .attheme или .attheme-editor `,
  },
  error: {
    title: `Uzur, xatolik ro'y berdi`,
    description: <>
      Iltimos, xato skrinshotini Telegram {}
      <Link href="//t.me/snejugal" isWhite={true}>
        orqali ishlab chiqaruvchiga yuboring
      </Link>
      {} i Xato paydo bo&apos;lishidan oldin, nima qilganinggiz, qaysi harakatlarni bajarganinggizni ta&apos;riflab bering. Ehtimol, siz ishlatgan original tema faylini yuborishishga t&apos;g&apos;ri keladi.
    </>,
    dismiss: `Xatolik haqidagi habarni o'chirish uchun, shunchaki buning ustiga bosing.`,
  },
  emptyWorkspace: {
    title: `O'z temangiz ustida ishlashni boshlang`,
    createTheme: `Yangi tema yaratish`,
    openTheme: `Mavjud temalarni oching`,
    credits: <>
      Tahrirlovchisi yaratildi {}
      <Link href="//t.me/snejugal">@snejugal</Link>
      {} va {}
      <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
      {} va o&apos;zbek tiliga tarjima qilingan {}
      <Link href="//t.me/DeduwkA_gg">@DeduwkA_gg</Link>
      {} i {}
      <Link href="//t.me/akaRamzEE">@akaRamzEE</Link>
      {} s {}
      <LoveEmoji className="emoji" />.
      {} Qarang {}
      <Link href="//github.com/snejugal/attheme-editor">
        GitHub-da manba kodi tahrirlovchisi
      </Link>
      {} va obuna bo&apos;ling {}
      <Link href="//t.me/atthemeeditor">
        Telegramdagi bizning kanalimiz
      </Link>!
    </>,
    uploadWaysHint: <>
      Bundan tashqari, faylni bu yerga tashlang yoki foydalaning {}
      <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>,
      {} Telegram orqali temalarni ochish.
    </>,
  },
  theme: {
    defaultName: `Ajoyib tema`,
  },
  workspace: {
    themeNameLabel: `Tema nomi`,
    closeTheme: `Temani yopish`,
    closeThemePrompt: `Temani yopmoqchiliginggizga ishonchingiz komilmi?`,
    downloadThemeFile: `To'g'ridan - to'g'ri.attheme yuklab olish`,
    createPreview: `Oldindan ko'rinishini yaratish`,
    testTheme: `Temani sinab ko'rish`,
    runScript: `Skriptni ishga tushirish`,
    editPalette: `Maxsus tema palitrasini tahrirlash`,
    downloadWorkspace: `Ish muhitini yuklab olish`,
    unaddedVariable: `Qo'shilmadi`,
    unusedVariable: `Telegram orqali foydalanilmaydi`,
    obsoleteVariable: `Eskirgan`,
    nonStandardVariable: `Nostandart`,
    search: `Qidirish`,
    variablesAmount({ total, theme }: VariablesAmountProp) {
      const forms = {
        one: `${theme} ning ${total} o'zgarmaydigan tema qo'shiladi`,
        other: `${theme} ning ${total} o'zgaruvchiga tema qo'shiladi`,
      };

      return forms[select(theme)];
    },
    noVariablesPlaceholder: `Temada hech qanday o'zgaruvchan narsa yo'q. :( Yuqoridagi qidirish qutisiga ularni qo'shing!`,
    noResultsPlaceholder: `Afsuski, qidiruv hech qanday natija bermadi. Ehtimol, so'rovda typo bormi?`,
    uploadError: `Xato, muharriri temani botga yuklab bo'lmadi. Ulanishni tekshiring va qaytadan urinib ko'ring.`,
  },
  confirmDialog: {
    yes: `Ha`,
    no: `Yo'q`,
  },
  variableEditor: {
    cancel: `Bekor qilish`,
    save: `Saqlash`,
    delete: `O'chirish`,
    red: `Qizil`,
    green: `Yashil`,
    blue: `Moviy`,
    hue: `Ton`,
    lightness: `Yorqinlik, %`,
    saturation: `To'yinganlik, %`,
    hex: `HEX`,
    alpha: `Alfa`,
    uploadImage: `Rasm yuklash`,
    downloadImage: `Rasmni yuklab olish`,
    imageTab: `Rasm`,
    colorModelsTab: `Rangli modellar`,
    palettesTab: `Ranglar`,
    wallpaperColorsHint: `Mana bir nechta ranglash fon rasmladan. Temani sxemasiga qo'shish uchun rangni bosing:`,
    editPalette: `Paletlarni tahrirlash`,
    themeColorsPlaceholder: `Afsuski, tema bo'yicha hech qanday rang yo'q`,
    themeCustomPalettePlaceholder: `Oops, maxsus palitrada gullar yo'q ... hozir. Yuqoridagi “Paletni tahrirlash” tugmasini bosing!`,
  },
  scriptRunner: {
    title: `Skriptni ishga tushirish`,
    description: <>
      .attheme editor EcmaScript 2017 yordamida yozilgan skriptni oson ishga tushirish imkonini yaratib beradi va tema yaratish vaqtini qisqaytiradi. API redaktori haqida bu yerdan ma&apos;lumot olishingiz mumkin <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">wiki GitHub redaktor ma&apos;lumotlar omborxonasi</Link>.
    </>,
    close: `Yopish`,
    run: `Boshlash`,
    isEvaluated: `Skript muvaffaqiyatli yuklandi!`,
    runtimeError: `Oops, skriptda xatolik ro'y berdi:`,
    syntaxError: `Oops, skriptda xato sintaksis:`,
    logMessage: `Sizning skriptinggiz konsolga yubordi:`,
    babelLoadingFailed: `Yuklab bo'lmadi Babel. Aloqani tekshiring va sahifani qayta yuklang.`,
    interpreterLoadingFailed: `Tarjimonni yuklab bo'lmadi. Ulanishni tekshiring va sahifani qayta kiriting.`,
  },
  palettes: {
    apple: `Apple`,
    materialDesign: `Material Design`,
    css: `CSS ranglar`,
    themeColors: `Tema ranglari`,
    themeCustomPalette: ` Maxsus temani palitrasi`,
  },
  paletteEditor: {
    close: `Yopish`,
    cancel: `Otmena qilish`,
    save: `Saqlash`,
    delete: `Udalit`,
    back: `O'zgaruvchilarga qaytish`,
    newColor: `Yangi rang qo'shing`,
    title: `Maxsus tema palitrasi`,
    defaultColorName: `Yaxshi rang`,
    placeholder: `Oops, palitra bo'sh ... hozir. “Yangi rang qo'shish” tugmasini bosing, agar chat_wallpaper-da rasm bo'lsa, bu o'zgaruvchining muharriri-ni oching va taklif qilayotgan ranglarni qo'shing!`,
  },
};

export default localization;
