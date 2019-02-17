import React from "react";
import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import { PartialLocalization, VariablesAmountProp } from "./types";

// eslint-disable-next-line quotes
type Forms = "one" | "other";

const pluralRules = new Intl.PluralRules(`es`);
const select = (num: number): Forms => pluralRules.select(num) as Forms;

const localization: PartialLocalization = {
  dragAndDrop: {
    hint: `Arrastra aquí un archivo .attheme o .attheme-editor`,
  },
  error: {
    title: `Ooops, ocurrió un error`,
    description: <>
      Por favor, envia una captura de pantalla del error a {}
      <Link href="//t.me/snejugal" isWhite={true}>
        the developer on Telegram
      </Link>
      {} y describe qué hiciste para que el error ocurriera. También necesitas enviar el archivo original del tema que usaste.
    </>,
    dismiss: `Para descartar el error, solo toca aquí.`,
  },
  emptyWorkspace: {
    title: `Empieza a trabajar en tu tema`,
    createTheme: `Crea un nuevo tema`,
    openTheme: `Abrir temas ya existentes`,
    credits: <>
      Creado por {}
      <Link href="//t.me/snejugal">@snejugal</Link>
      {} y {}
      <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
      {} y traducido al español por {}
      <Link href="//t.me/DiegoCanevaro">@DiegoCanevaro</Link>
      {} con {}
      <LoveEmoji className="emoji" />.
      {} Revisa el código de {}
      <Link href="//github.com/snejugal/attheme-editor">
        the editor&apos;s en GitHub
      </Link>
      {} y suscríbete a {}
      <Link href="//t.me/atthemeeditor">
        nuestro canal en Telegram
      </Link>!
    </>,
    uploadWaysHint: <>
      También puedes usar el drag&apos;n&apos;drop para abrir temas o usar {}
      <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>
      {} para abrir temas vía Telegram.
    </>,
  },
  theme: {
    defaultName: `Tema Increíble`,
  },
  workspace: {
    themeNameLabel: `Nombre del tema`,
    closeTheme: `Cerrar Tema`,
    closeThemePrompt: `¿Estás seguro de que quieres cerrar el tema?`,
    downloadThemeFile: `Descargar .attheme directamente`,
    createPreview: `Crea una vista previa`,
    testTheme: `Prueba el tema`,
    downloadWorkspace: `Descarga el espacio de trabajo`,
    runScript: `Corre a script`,
    unaddedVariable: `Sin añadir`,
    unusedVariable: `No usada por Telegram`,
    obsoleteVariable: `Obsoleta`,
    nonStandardVariable: `No estándar`,
    search: `Buscar`,
    variablesAmount({ total, theme }: VariablesAmountProp) {
      const forms = {
        one: {
          one: `${theme} de ${total} variable se añadió al tema`,
          other: `${theme} de ${total} variables se añadió al tema`,
        },
        other: {
          one: `${theme} de ${total} variable se añadieron al tema`,
          other: `${theme} de ${total} variables se añadieron al tema`,
        },
      };

      return forms[select(theme)][select(total)];
    },
    editPalette: `Editar la paleta personalizada del tema`,
    noVariablesPlaceholder: `Aún no tienes variables en el tema :( ¡Añade algunas en el recuadro de búsqueda justo debajo!`,
    noResultsPlaceholder: `Ooops, la búsqueda no dio resultados. Tal vez tienes un error de escritura en tu consulta.`,
    uploadError: `Ooops, el editor no puede cargar el tema al bot. Revisa tu conexión a internet y vuelve a intentarlo.`,
    removedVariable(version: string) {
      return `Removido desde la versión ${version}`;
    },
    downloadError: `Ooops, parece que trataste de abrir un tema que expiró. Deberías enviar el tema al bot una vez que esté disponible de nuevo para abrirlo en el editor.`,
  },
  confirmDialog: {
    yes: `Si`,
    no: `No`,
  },
  variableEditor: {
    cancel: `Cancelar`,
    save: `Guardar`,
    delete: `Borrar`,
    red: `Red`,
    green: `Verde`,
    blue: `Azul`,
    hue: `Matiz`,
    lightness: `Brillo, %`,
    saturation: `Saturación, %`,
    hex: `HEX`,
    alpha: `Alpha`,
    uploadImage: `Sube una imagen`,
    imageTab: `Imagen`,
    colorModelsTab: `Modelos de Color`,
    palettesTab: `Paletas`,
    wallpaperColorsHint: `Aquí hay algunos colores para el fondo de pantalla. Haz click en uno para añadirlo a la paleta de colores:`,
    editPalette: `Editar la paleta`,
    themeColorsPlaceholder: `Ooops, aún no hay colores en el tema.`,
    themeCustomPalettePlaceholder: `Ooops, aún no hay colores en la paleta personalizada. Haz click en el botón “Editar la paleta” que está justo encima`,
  },
  scriptRunner: {
    title: `Correr un script`,
    description: <React.Fragment>
      .attheme editor lets you easily run scripts wrriten in EcmaScript 2017 to fasten theme developing. You can read more about the API the editor provides on <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">its GitHub repository&apos;s wiki</Link>.
    </React.Fragment>,
    close: `Cerrar`,
    run: `Ejecutar`,
    isEvaluated: `¡El script se ejecutó exitosamente!`,
    runtimeError: `Ooops, ocurrió el siguiente error en tu script:`,
    syntaxError: `Ooops, tienes error de sintaxis en tu script:`,
    logMessage: `Tu script registró:`,
    babelLoadingFailed: `Falló al cargar Babel. Revisa tu conexión a internet y vuelve a cargar la página.`,
    interpreterLoadingFailed: `Falló al cargar el intérprete.Revisa tu conexión a internet y vuelve a cargar la página.`,
  },
  palettes: {
    apple: `Apple`,
    materialDesign: `Material Design`,
    css: `CSS colors`,
    themeColors: `Colores del tema`,
    themeCustomPalette: `Paleta personalizada del tema`,
  },
  paletteEditor: {
    close: `Cerrar`,
    cancel: `Cancelar`,
    save: `Guardar`,
    delete: `Borrar`,
    back: `Volver a la variable`,
    newColor: `Añadir un nuevo color`,
    title: `Paleta personalizada del tema`,
    defaultColorName: `Color bonito`,
    placeholder: `Ooops, la paleta está vacía… aún. Haz click en el botón “Añadir un nuevo color” en el fondo o, si asignaste una imagen a chat_wallpaper, abre su editor y añade los colores sugeridos a esta paleta.`,
  },
};

export default localization;
