import Link from "../link/component";
import React from "react";

const pluralRules = new Intl.PluralRules(`it`);

const localization = {
  error_title: () => `Oops, c'è stato un errore.`,
  error_description: () => <React.Fragment>
    Per favore, manda uno screenshot dell&apos;errore al seguente indirizzo {}
    <Link href="//t.me/snejugal" isWhite={true}>
      lo sviluppatore su Telegram
    </Link>
    {} e descrivi cosa hai fatto che ha causato l&apos;errore. Potrebbe essere necessario mandare anche il file originale del tema che hai usato.
  </React.Fragment>,
  error_dismiss: () => `Per respingere l'errore tappa qui.`,

  emptyWorkspace_title: () => `Comincia a lavorare sul tuo tema`,
  emptyWorkspace_createTheme: () => `Crea un nuovo tema`,
  emptyWorkspace_openTheme: () => `Apri un tema esistente`,

  theme_defaultName: () => `Bel tema`,

  workspace_themeNameLabel: () => `Nome del tema`,
  workspace_closeTheme: () => `Chiudi tema`,
  workspace_closeThemePrompt: () => `Sei sicuro di voler chiudere il tema?`,
  workspace_downloadThemeFile: () => `Scarica direttamente il file .attheme`,
  workspace_createPreview: () => `Crea un'anteprima`,
  workspace_testTheme: () => `Prova il tema`,
  workspace_downloadWorkspace: () => `Scarica l'area di lavoro`,
  workspace_runScript: () => `Esegui uno script`,
  workspace_unaddedVariable: () => `Non aggiunta`,
  workspace_unusedVariable: () => `Non utilizzata da Telegram`,
  workspace_obsoleteVariable: () => `Obsoleta`,
  workspace_nonStandardVariable: () => `Non standard`,
  workspace_search: () => `Cerca`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      one: `Una variabile su ${total} è stata aggiunta al tema`,
      other: `${theme} variabili  su ${total} sono state aggiunte al tema`,
    };

    return forms[pluralRules.select(theme)];
  },

  confirmDialog_yes: () => `Sì`,
  confirmDialog_no: () => `No`,

  variableEditor_cancel: () => `Annulla`,
  variableEditor_save: () => `Salva`,
  variableEditor_delete: () => `Cancella`,
  variableEditor_red: () => `Rosso`,
  variableEditor_green: () => `Verde`,
  variableEditor_blue: () => `Blu`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Alpha`,
  variableEditor_hue: () => `Colore`,
  variableEditor_lightness: () => `Luminosità, %`,
  variableEditor_saturation: () => `Saturazione, %`,
  variableEditor_uploadImage: () => `Carica un'immagine`,
  variableEditor_imageTab: () => `Immagine`,
  variableEditor_colorModelsTab: () => `Codici colori`,
  variableEditor_palettesTab: () => `Tavolozza di colori`,

  scriptRunner_title: () => `Esegui uno script`,
  scriptRunner_description: () => <React.Fragment>
    L&apos;editor .attheme ti permette di eseguire facilmente gli script scritti in EcmaScript 2017 per velocizzare lo sviluppo dei temi. Puoi informarti riguardo le API che l&apos;editor mette a disposizione alla <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">wiki del suo repository di GitHub</Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Chiudi`,
  scriptRunner_run: () => `Esegui`,
  scriptRunner_isEvaluating: () => `Lo script sta venendo eseguito…`,
  scriptRunner_isEvaluated: () => `Lo script è stato eseguito correttamente!`,
  scriptRunner_runtimeError: () => `Oops, è stato riscontrato questo errore nel tuo script:`,
  scriptRunner_syntaxError: () => `Oops, c'è un errore di sintassi nel tuo script:`,
  scriptRunner_logMessage: () => `Il tuo script ha come log:`,
  scriptRunner_babelLoadingFailed: () => `Impossibile caricare Babel. Controlla la tua connessione ad internet e ricarica la pagina.`,

  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `Colori CSS`,
  palettes_themeColors: () => `Il colore del tema`,
};

export default localization;