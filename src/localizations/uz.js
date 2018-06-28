import Link from "../link/component";
import { ReactComponent as LoveEmoji } from "../empty-workspace/love.svg";
import React from "react";

const pluralRules = new Intl.PluralRules(`uz`);

const localization = {
  dropHint: () => `Fayllarni bu yerga o'tkazing .attheme или .attheme-editor `,

  error_title: () => `Uzur, xatolik ro'y berdi`,
  error_description: () => <React.Fragment>
    Iltimos, xato skrinshotini Telegram {}
    <Link href="//t.me/snejugal" isWhite={true}>
      orqali ishlab chiqaruvchiga yuboring
    </Link>
    {} i Xato paydo bo&apos;lishidan oldin, nima qilganinggiz, qaysi harakatlarni bajarganinggizni ta&apos;riflab bering. Ehtimol, siz ishlatgan original tema faylini yuborishishga t&apos;g&apos;ri keladi.
  </React.Fragment>,
  error_dismiss: () => `Xatolik haqidagi habarni o'chirish uchun, shunchaki buning ustiga bosing.`,

  emptyWorkspace_title: () => `O'z temangiz ustida ishlashni boshlang`,
  emptyWorkspace_createTheme: () => `Yangi tema yaratish`,
  emptyWorkspace_openTheme: () => `Mavjud temalarni oching`,
  emptyWorkspace_credits: () => <React.Fragment>
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
  </React.Fragment>,
  emptyWorkspace_uploadWaysHint: () => <React.Fragment>
    Bundan tashqari, faylni bu yerga tashlang yoki foydalaning {}
    <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>,
    {} Telegram orqali temalarni ochish.
  </React.Fragment>,

  theme_defaultName: () => `Ajoyib tema`,

  workspace_themeNameLabel: () => `Tema nomi`,
  workspace_closeTheme: () => `Temani yopish`,
  workspace_closeThemePrompt: () => `Temani yopmoqchiliginggizga ishonchingiz komilmi?`,
  workspace_downloadThemeFile: () => `To'g'ridan - to'g'ri.attheme yuklab olish`,
  workspace_createPreview: () => `Oldindan ko'rinishini yaratish`,
  workspace_testTheme: () => `Temani sinab ko'rish`,
  workspace_runScript: () => `Skriptni ishga tushirish`,
  workspace_editPalette: () => `Maxsus tema palitrasini tahrirlash`,
  workspace_downloadWorkspace: () => `Ish muhitini yuklab olish`,
  workspace_unaddedVariable: () => `Qo'shilmadi`,
  workspace_unusedVariable: () => `Telegram orqali foydalanilmaydi`,
  workspace_obsoleteVariable: () => `Eskirgan`,
  workspace_nonStandardVariable: () => `Nostandart`,
  workspace_search: () => `Qidirish`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      one: `${theme} ning ${total} o'zgarmaydigan tema qo'shiladi`,
      other: `${theme} ning ${total} o'zgaruvchiga tema qo'shiladi`,
    };

    return forms[pluralRules.select(theme)];
  },
  workspace_noVariablesPlaceholder: () => `Temada hech qanday o'zgaruvchan narsa yo'q. :( Yuqoridagi qidirish qutisiga ularni qo'shing!`,
  workspace_noResultsPlaceholder: () => `Afsuski, qidiruv hech qanday natija bermadi. Ehtimol, so'rovda typo bormi?`,
  workspace_uploadError: () => `Xato, muharriri temani botga yuklab bo'lmadi. Ulanishni tekshiring va qaytadan urinib ko'ring.`,

  confirmDialog_yes: () => `Ha`,
  confirmDialog_no: () => `Yo'q`,

  variableEditor_cancel: () => `Bekor qilish`,
  variableEditor_save: () => `Saqlash`,
  variableEditor_delete: () => `O'chirish`,
  variableEditor_red: () => `Qizil`,
  variableEditor_green: () => `Yashil`,
  variableEditor_blue: () => `Moviy`,
  variableEditor_hue: () => `Ton`,
  variableEditor_lightness: () => `Yorqinlik, %`,
  variableEditor_saturation: () => `To'yinganlik, %`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Alfa`,
  variableEditor_uploadImage: () => `Rasm yuklash`,
  variableEditor_imageTab: () => `Rasm`,
  variableEditor_colorModelsTab: () => `Rangli modellar`,
  variableEditor_palettesTab: () => `Ranglar`,
  variableEditor_wallpaperColorsHint: () => `Mana bir nechta ranglash fon rasmladan. Temani sxemasiga qo'shish uchun rangni bosing:`,
  variableEditor_editPalette: () => `Paletlarni tahrirlash`,
  variableEditor_themeColorsPlaceholder: () => `Afsuski, tema bo'yicha hech qanday rang yo'q`,
  variableEditor_themeCustomPalettePlaceholder: () => `Oops, maxsus palitrada gullar yo'q ... hozir. Yuqoridagi «Paletni tahrirlash» tugmasini bosing!`,

  scriptRunner_title: () => `Skriptni ishga tushirish`,
  scriptRunner_description: () => <React.Fragment>
    .attheme editor EcmaScript 2017 yordamida yozilgan skriptni oson ishga tushirish imkonini yaratib beradi va tema yaratish vaqtini qisqaytiradi. API redaktori haqida bu yerdan ma&apos;lumot olishingiz mumkin <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">wiki GitHub redaktor ma&apos;lumotlar omborxonasi</Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Yopish`,
  scriptRunner_run: () => `Boshlash`,
  scriptRunner_isEvaluated: () => `Skript muvaffaqiyatli yuklandi!`,
  scriptRunner_runtimeError: () => `Oops, skriptda xatolik ro'y berdi:`,
  scriptRunner_syntaxError: () => `Oops, skriptda xato sintaksis:`,
  scriptRunner_logMessage: () => `Sizning skriptinggiz konsolga yubordi:`,
  scriptRunner_babelLoadingFailed: () => `Yuklab bo'lmadi Babel. Aloqani tekshiring va sahifani qayta yuklang.`,
  scriptRunner_interpreterLoadingFailed: () => `Tarjimonni yuklab bo'lmadi. Ulanishni tekshiring va sahifani qayta kiriting.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `CSS ranglar`,
  palettes_themeColors: () => `Tema ranglari`,
  palettes_themeCustomPalette: () => ` Maxsus temani palitrasi`,

  paletteEditor_close: () => `Yopish`,
  paletteEditor_cancel: () => `Otmena qilish`,
  paletteEditor_save: () => `Saqlash`,
  paletteEditor_delete: () => `Udalit`,
  paletteEditor_back: () => `O'zgaruvchilarga qaytish`,
  paletteEditor_newColor: () => `Yangi rang qo'shing`,
  paletteEditor_title: () => `Maxsus tema palitrasi`,
  paletteEditor_defaultColorName: () => `Yaxshi rang`,
  paletteEditor_placeholder: () => `Oops, palitra bo'sh ... hozir. «Yangi rang qo'shish» tugmasini bosing, agar chat_wallpaper-da rasm bo'lsa, bu o'zgaruvchining muharriri-ni oching va taklif qilayotgan ranglarni qo'shing!`,
};

export default localization;