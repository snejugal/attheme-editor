import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import React from "react";

const pluralRules = new Intl.PluralRules(`it`);

const localization = {
  dropHint: () => `Invia qui i file .attheme oppure .attheme-editor`,

  error_title: () => `Oops, c'è stato un errore.`,
  error_description: () => <>
    Per favore, manda uno screenshot dell&apos;errore al seguente indirizzo {}
    <Link href="//t.me/snejugal" isWhite={true}>
      lo sviluppatore su Telegram
    </Link>
    {} e descrivi cosa hai fatto che ha causato l&apos;errore. Potrebbe essere necessario mandare anche il file originale del tema che hai usato.
  </>,
  error_dismiss: () => `Per chiudere la finestra di errore fai tap qui.`,

  emptyWorkspace_title: () => `Comincia a lavorare al tuo tema`,
  emptyWorkspace_createTheme: () => `Crea un nuovo tema`,
  emptyWorkspace_openTheme: () => `Apri dei temi già esistenti`,
  emptyWorkspace_credits: () => <>
    Creato da {}
    <Link href="//t.me/snejugal">@snejugal</Link>
    {} e {}
    <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
    {} e tradotto in Italiano da {}
    <Link href="//t.me/SventraPopizz">@SventraPopizz</Link>
    {} e {}
    <Link href="//t.me/supervalery">@supervalery</Link>
    {} con {}
    <LoveEmoji className="emoji" />.
    {} Guarda {}
    <Link href="//github.com/snejugal/attheme-editor">
      il codice sorgente dell&apos;editor su GitHub
    </Link>
    {} e iscriviti al {}
    <Link href="//t.me/atthemeeditor">
      nostro canale Telegram
    </Link>!
  </>,
  emptyWorkspace_uploadWaysHint: () => <>
    Per aprire i temi puoi anche usare il drag&apos;n&apos;drop oppure usa {}
    <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>
    {} per aprire i temi direttamente da Telegram.
  </>,

  theme_defaultName: () => `Bel tema`,

  workspace_themeNameLabel: () => `Nome del tema`,
  workspace_closeTheme: () => `Chiudi tema`,
  workspace_closeThemePrompt: () => `Sei sicuro di voler chiudere il tema?`,
  workspace_downloadThemeFile: () => `Scarica direttamente il file .attheme`,
  workspace_createPreview: () => `Crea un'anteprima`,
  workspace_testTheme: () => `Prova il tema`,
  workspace_downloadWorkspace: () => `Scarica l'area di lavoro`,
  workspace_runScript: () => `Esegui uno script`,
  workspace_editPalette: () => `Modifica la palette colori del tema`,
  workspace_unaddedVariable: () => `Non aggiunta`,
  workspace_unusedVariable: () => `Non utilizzata da Telegram`,
  workspace_obsoleteVariable: () => `Obsoleta`,
  workspace_nonStandardVariable: () => `Non standard`,
  workspace_search: () => `Cerca`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      one: `Una variabile su ${total} è stata aggiunta al tema`,
      other: `${theme} variabili su ${total} sono state aggiunte al tema`,
    };

    return forms[pluralRules.select(theme)];
  },
  workspace_noVariablesPlaceholder: () => `Non hai ancora inserito variabili nel tema :( Aggiungine qualcuna tramite il campo di ricerca in alto!`,
  workspace_noResultsPlaceholder: () => `Oops, la ricerca non ha prodotto alcun risultato. Magari hai sbagliato a scrivere?`,
  workspace_uploadError: () => `Oops, l'editor non è riuscito ad inviare il tuo tema al bot. Controlla la tua connessione ad internet e prova di nuovo`,

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
  variableEditor_palettesTab: () => `Palette dei colori`,
  variableEditor_wallpaperColorsHint: () => `Ecco alcuni colori estratti dallo sfondo. Clicca su un colore per aggiungerlo alla palette del tuo tema:`,
  variableEditor_editPalette: () => `Modifica la palette dei colori`,
  variableEditor_themeColorsPlaceholder: () => `Oops, non ci sono ancora colori nel tuo tema.`,
  variableEditor_themeCustomPalettePlaceholder: () => `Oops, non c'è ancora alcun colore nella palette colori personalizzata. Premi il tasto "Modifica la palette colori" qui sopra!`,

  scriptRunner_title: () => `Esegui uno script`,
  scriptRunner_description: () => <>
    L&apos;editor .attheme ti permette di eseguire facilmente degli script in linguaggio EcmaScript 2017 per velocizzare lo sviluppo dei temi. Puoi trovare informazioni sulle API che l&apos;editor mette a disposizione alla <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">wiki del suo repository su GitHub</Link>.
  </>,
  scriptRunner_close: () => `Chiudi`,
  scriptRunner_run: () => `Esegui`,
  scriptRunner_isEvaluated: () => `Lo script è stato eseguito correttamente!`,
  scriptRunner_runtimeError: () => `Oops, è stato riscontrato questo errore nel tuo script:`,
  scriptRunner_syntaxError: () => `Oops, c'è un errore di sintassi nel tuo script:`,
  scriptRunner_logMessage: () => `Il tuo script ha come log:`,
  scriptRunner_babelLoadingFailed: () => `Impossibile caricare Babel. Controlla la tua connessione ad internet e ricarica la pagina.`,
  scriptRunner_interpreterLoadingFailed: () => `Impossibile caricare l'interprete. Controlla la tua connessione ad internet e ricarica la pagina.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `Colori CSS`,
  palettes_themeColors: () => `Il colore del tema`,
  palettes_themeCustomPalette: () => `Palette personalizzata del tema`,

  paletteEditor_close: () => `Chiudi`,
  paletteEditor_cancel: () => `Annulla`,
  paletteEditor_save: () => `Salva`,
  paletteEditor_delete: () => `Cancella`,
  paletteEditor_back: () => `Torna alla variabile`,
  paletteEditor_newColor: () => `Aggiungi un nuovo colore`,
  paletteEditor_title: () => `La palette colori del tema`,
  paletteEditor_defaultColorName: () => `Bel colore`,
  paletteEditor_placeholder: () => `Oops, la palette colori è vuota… Per ora. Premi il tasto "Aggiungi un nuovo colore" in fondo, oppure se hai assegnato un'immagine a chat_wallpaper, apri il suo editor e aggiungi il colore che viene consigliato a questa palette!`,
};

export default localization;
