import Link from "../link/component";
import React from "react";

const localization = {
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
  emptyWorkspace_openTheme: () => `Mavjud temalarni ochish`,

  theme_defaultName: () => `Ajoyib tema`,

  workspace_themeNameLabel: () => `Tema nomi`,
  workspace_closeTheme: () => `Temani yopish`,
  workspace_closeThemePrompt: () => `Temani yopmoqchiliginggizga ishonchingiz komilmi?`,
  workspace_downloadThemeFile: () => `To'g'ridan - to'g'ri.attheme yuklab olish`,
  workspace_createPreview: () => `Oldindan ko'rinishini yaratish`,
  workspace_testTheme: () => `Temani sinab ko'rish`,
  workspace_runScript: () => `Skriptni ishga tushirish`,
  workspace_downloadWorkspace: () => `Ish muhitini yuklab olish`,
  workspace_unaddedVariable: () => `Qo'shilmadi`,
  workspace_unusedVariable: () => `Telegram orqali foydalanilmaydi`,
  workspace_obsoleteVariable: () => `Eskirgan`,
  workspace_nonStandardVariable: () => `Nostandart`,
  workspace_search: () => `Qidirish`,

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

  scriptRunner_title: () => `Skriptni ishga tushirish`,
  scriptRunner_description: () => <React.Fragment>
    .attheme editor EcmaScript 2017 yordamida yozilgan skriptni oson ishga tushirish imkonini yaratib beradi va tema yaratish vaqtini qisqaytiradi. API redaktori haqida bu yerdan ma&apos;lumot olishingiz mumkin <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">wiki GitHub redaktor ma&apos;lumotlar omborxonasi</Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Yopish`,
  scriptRunner_run: () => `Boshlash`,
  scriptRunner_isEvaluating: () => `Skript yuklanmoqda…`,
  scriptRunner_isEvaluated: () => `Skript muvaffaqiyatli yuklandi!`,
  scriptRunner_runtimeError: () => `Oops, skriptda xatolik ro'y berdi:`,
  scriptRunner_syntaxError: () => `Oops, skriptda xato sintaksis:`,
  scriptRunner_logMessage: () => `Sizning skriptinggiz konsolga yubordi:`,
  scriptRunner_babelLoadingFailed: () => `Yuklab bo'lmadi Babel. Aloqani tekshiring va sahifani qayta yuklang.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `CSS ranglar`,
  palettes_themeColors: () => `Tema ranglari`,
  palettes_themeCustomPalette: () => ` Maxsus temani palitrasi`,
};

export default localization;