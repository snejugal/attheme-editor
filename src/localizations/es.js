import Link from "../link/component";
import { ReactComponent as LoveEmoji } from "../empty-workspace/love.svg";
import React from "react";

const pluralRules = new Intl.PluralRules(`es`);

const localization = {
  dropHint: () => `Coloque los archivos .attheme o .attheme-editor aquí`,

  error_title: () => `Vaya, parece que ha habido un error.`,
  error_description: () => <React.Fragment>
    Envie una captura de pantalla del siguiente error a {}
    <Link href="//t.me/snejugal" isWhite={true}>
      el desarrollador en Telegram
    </Link>
    {} y describe lo que hiciste para que ocurriera el error. Es posible que también deba enviar el archivo del tema oirginal que utilizó.
  </React.Fragment>,
  error_dismiss: () => `Para descartar el error, solo tócalo.`,

  emptyWorkspace_title: () => `Comienza a trabajar en tu tema`,
  emptyWorkspace_createTheme: () => `Crear nuevo tema`,
  emptyWorkspace_openTheme: () => `Abrir temas existentes`,
  emptyWorkspace_credits: () => <React.Fragment>
    Creador por {}
    <Link href="//t.me/snejugal">@snejugal</Link>
    {} y {}
    <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
    {} con {}
    <LoveEmoji className="emoji" />.
    {} Verifica {}
    <Link href="//github.com/snejugal/attheme-editor">
      el código fuente del editor en Github
    </Link>
    {} y suscribete a {}
    <Link href="//t.me/atthemeeditor">
      nuestro canal en Telegram
    </Link>!
  </React.Fragment>,
  emptyWorkspace_uploadWaysHint: () => <React.Fragment>
    También puede arrastrar y soltar {}
    <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>
    {} para abrir los temas a traves de Telegram.
  </React.Fragment>,

  theme_defaultName: () => `Tema increible`,

  workspace_themeNameLabel: () => `Nombre del tema`,
  workspace_closeTheme: () => `Cerrar el tema`,
  workspace_closeThemePrompt: () => `¿Estás seguro de que quieres cerrar el tema?`,
  workspace_downloadThemeFile: () => `Descargar .attheme directamente`,
  workspace_createPreview: () => `Crear un vista previa`,
  workspace_testTheme: () => `Prueba el tema`,
  workspace_downloadWorkspace: () => `Descargar espacio de trabajo`,
  workspace_runScript: () => `Ejecuta un script`,
  workspace_editPalette: () => `Edite la paleta personaliza del tema`,
  workspace_unaddedVariable: () => `Sin añadir`,
  workspace_unusedVariable: () => `No utilizado por Telegram`,
  workspace_obsoleteVariable: () => `Obsoleta`,
  workspace_nonStandardVariable: () => `No Estándar`,
  workspace_search: () => `Buscar`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      "one one": `${theme} of ${total} variable se agrega al tema`,
      "one other": `${theme} of ${total} variables se agregan al tema`,
      "other one": `${theme} of ${total} variable se agrega al tema`,
      "other other": `${theme} of ${total} las variables se agregan al tema`,
    };

    return forms[`${pluralRules.select(theme)} ${pluralRules.select(total)}`];
  },
  workspace_noVariablesPlaceholder: () => `El tema aun no tiene variables, agrega alguna a traves del campo de búsqueda de arriba`,
  workspace_noResultsPlaceholder: () => `Vaya, la búsqueda no dió ningun resultado. ¿Estás seguro de haber introducido bien los datos?`,
  workspace_uploadError: () => `Vaya, el editor no pudo subir el tema al robot. Revisa tu conexión a Internet y vuelve a intentarlo.`,

  confirmDialog_yes: () => `Si`,
  confirmDialog_no: () => `No`,

  variableEditor_cancel: () => `Cancelar`,
  variableEditor_save: () => `Guardar`,
  variableEditor_delete: () => `Eliminar`,
  variableEditor_red: () => `Rojo`,
  variableEditor_green: () => `Verde`,
  variableEditor_blue: () => `Azul`,
  variableEditor_hue: () => `Hue`,
  variableEditor_lightness: () => `Luminosidad, %`,
  variableEditor_saturation: () => `Saturación, %`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Alpha`,
  variableEditor_uploadImage: () => `Subir una imagen`,
  variableEditor_imageTab: () => `Imagen`,
  variableEditor_colorModelsTab: () => `Modelos de colores`,
  variableEditor_palettesTab: () => `Paletas`,
  variableEditor_wallpaperColorsHint: () => `Aquí hay algunos colores de fondo de pantalla. Haz clic en uno para agregarlo a la paleta de tu tema:`,
  variableEditor_editPalette: () => `Edita la paleta`,
  variableEditor_themeColorsPlaceholder: () => `Vaya, todavía no hay colores en el tema.`,
  variableEditor_themeCustomPalettePlaceholder: () => `Vaya, todavía no hay colores en la paleta personalizada. Haz clic en el boton "Editar la paleta."`,

  scriptRunner_title: () => `Ejecuta un script`,
  scriptRunner_description: () => <React.Fragment>
    .attheme editor le permite ejecutar facilemente scripts escritos en EcmaScript 2017 para acelerar el desarrollo de temas. Puede leer mas sobre la API que proporciona el editor <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation"> en la wiki de su repositorio de Github </Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Cerrar`,
  scriptRunner_run: () => `Ejecutar`,
  scriptRunner_isEvaluated: () => `El script se ejecutó con exito`,
  scriptRunner_runtimeError: () => `Vaya, hay en error en tu script: `,
  scriptRunner_syntaxError: () => `Vaya, tu script tiene una sintaxis incorrecta`,
  scriptRunner_logMessage: () => `Su script está conectado`,
  scriptRunner_babelLoadingFailed: () => `Error al cargar Babel. Verifique su conexión a internet y vuelva a cargar la página`,
  scriptRunner_interpreterLoadingFailed: () => `Error al carga el intérprete. Verifique su conexión a internet y vuelva a cargar la página.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `Colores CSS`,
  palettes_themeColors: () => `Los colores del tema`,
  palettes_themeCustomPalette: () => `La paleta personalizada del tema`,

  paletteEditor_close: () => `Cerrar`,
  paletteEditor_cancel: () => `Cancelar`,
  paletteEditor_save: () => `Guardar`,
  paletteEditor_delete: () => `Eliminar`,
  paletteEditor_back: () => `Volver a la variable`,
  paletteEditor_newColor: () => `Añade color nuevo`,
  paletteEditor_title: () => `La paleta personalizada el tema`,
  paletteEditor_defaultColorName: () => `Color Hermoso`,
  paletteEditor_placeholder: () => `Vaya, la paleta está vacía. Sin embargo, haz clic en el boton "Añade color nuevo" en la parte inferior o, si chat_wallpaper tiene asignada una imagen, abre su editor y añade los colores que sugiere a esta paleta.`,
};

export default localization;
