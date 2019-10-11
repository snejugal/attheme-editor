import React from "react";
import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import { PartialLocalization, VariablesAmountProp } from "./types";

// eslint-disable-next-line quotes
type Forms = "one" | "other";

const pluralRules = new Intl.PluralRules(`it`);
const select = (num: number): Forms => pluralRules.select(num) as Forms;

const localization: PartialLocalization = {
  dragAndDrop: {
    hint: `Invia qui i file .attheme oppure .attheme-editor`,
  },
  error: {
    title: `Oops, c'è stato un errore.`,
    description: (
      <>
        Per favore, manda uno screenshot dell&apos;errore al seguente indirizzo{" "}
        {}
        <Link href="//t.me/snejugal" isWhite={true}>
          lo sviluppatore su Telegram
        </Link>
        {} e descrivi cosa hai fatto che ha causato l&apos;errore. Potrebbe
        essere necessario mandare anche il file originale del tema che hai
        usato.
      </>
    ),
    dismiss: `Per chiudere la finestra di errore fai tap qui.`,
  },
  emptyWorkspace: {
    title: `Comincia a lavorare al tuo tema`,
    createTheme: `Crea un nuovo tema`,
    openTheme: `Apri dei temi già esistenti`,
    credits: (
      <>
        Creato da {}
        <Link href="//t.me/snejugal">@snejugal</Link>
        {} e {}
        <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
        {} e tradotto in Italiano da {}
        <Link href="//t.me/SventraPopizz">@SventraPopizz</Link>
        {} e {}
        <Link href="//t.me/supervalery">@supervalery</Link>
        {} con {}
        <LoveEmoji className="emoji" />.{} Guarda {}
        <Link href="//github.com/snejugal/attheme-editor">
          il codice sorgente dell&apos;editor su GitHub
        </Link>
        {} e iscriviti al {}
        <Link href="//t.me/atthemeeditor">nostro canale Telegram</Link>!
      </>
    ),
    uploadWaysHint: (
      <>
        Per aprire i temi puoi anche usare il drag&apos;n&apos;drop oppure usa{" "}
        {}
        <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>
        {} per aprire i temi direttamente da Telegram.
      </>
    ),
  },
  theme: {
    defaultName: `Bel tema`,
  },
  workspace: {
    themeNameLabel: `Nome del tema`,
    closeTheme: `Chiudi tema`,
    closeThemePrompt: `Sei sicuro di voler chiudere il tema?`,
    downloadThemeFile: `Scarica direttamente il file .attheme`,
    createPreview: `Crea un'anteprima`,
    testTheme: `Prova il tema`,
    downloadWorkspace: `Scarica l'area di lavoro`,
    runScript: `Esegui uno script`,
    editPalette: `Modifica la palette colori del tema`,
    unaddedVariable: `Non aggiunta`,
    unusedVariable: `Non utilizzata da Telegram`,
    obsoleteVariable: `Obsoleta`,
    nonStandardVariable: `Non standard`,
    search: `Cerca`,
    variablesAmount({ total, theme }: VariablesAmountProp) {
      const forms = {
        one: `Una variabile su ${total} è stata aggiunta al tema`,
        other: `${theme} variabili su ${total} sono state aggiunte al tema`,
      };

      return forms[select(theme)];
    },
    noVariablesPlaceholder: `Non hai ancora inserito variabili nel tema :( Aggiungine qualcuna tramite il campo di ricerca in alto!`,
    noResultsPlaceholder: `Oops, la ricerca non ha prodotto alcun risultato. Magari hai sbagliato a scrivere?`,
    uploadError: `Oops, l'editor non è riuscito ad inviare il tuo tema al bot. Controlla la tua connessione ad internet e prova di nuovo`,
  },
  confirmDialog: {
    yes: `Sì`,
    no: `No`,
  },
  variableEditor: {
    cancel: `Annulla`,
    save: `Salva`,
    delete: `Cancella`,
    red: `Rosso`,
    green: `Verde`,
    blue: `Blu`,
    hex: `HEX`,
    alpha: `Alpha`,
    hue: `Colore`,
    lightness: `Luminosità, %`,
    saturation: `Saturazione, %`,
    uploadImage: `Carica un'immagine`,
    downloadImage: `Scarica l'immagine`,
    imageTab: `Immagine`,
    gradientTab: `Gradient`,
    colorModelsTab: `Codici colori`,
    palettesTab: `Palette dei colori`,
    wallpaperColorsHint: `Ecco alcuni colori estratti dallo sfondo. Clicca su un colore per aggiungerlo alla palette del tuo tema:`,
    editPalette: `Modifica la palette dei colori`,
    themeColorsPlaceholder: `Oops, non ci sono ancora colori nel tuo tema.`,
    themeCustomPalettePlaceholder: `Oops, non c'è ancora alcun colore nella palette colori personalizzata. Premi il tasto "Modifica la palette colori" qui sopra!`,
    fromPoint: `Inizio`,
    toPoint: `Fine`,
  },
  scriptRunner: {
    title: `Esegui uno script`,
    description: (
      <>
        L&apos;editor .attheme ti permette di eseguire facilmente degli script
        in linguaggio EcmaScript 2017 per velocizzare lo sviluppo dei temi. Puoi
        trovare informazioni sulle API che l&apos;editor mette a disposizione
        alla{" "}
        <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">
          wiki del suo repository su GitHub
        </Link>
        .
      </>
    ),
    close: `Chiudi`,
    run: `Esegui`,
    isEvaluated: `Lo script è stato eseguito correttamente!`,
    runtimeError: `Oops, è stato riscontrato questo errore nel tuo script:`,
    syntaxError: `Oops, c'è un errore di sintassi nel tuo script:`,
    logMessage: `Il tuo script ha come log:`,
    babelLoadingFailed: `Impossibile caricare Babel. Controlla la tua connessione ad internet e ricarica la pagina.`,
    interpreterLoadingFailed: `Impossibile caricare l'interprete. Controlla la tua connessione ad internet e ricarica la pagina.`,
  },
  palettes: {
    apple: `Apple`,
    materialDesign: `Material Design`,
    css: `Colori CSS`,
    themeColors: `Il colore del tema`,
    themeCustomPalette: `Palette personalizzata del tema`,
  },
  paletteEditor: {
    close: `Chiudi`,
    cancel: `Annulla`,
    save: `Salva`,
    delete: `Cancella`,
    back: `Torna alla variabile`,
    newColor: `Aggiungi un nuovo colore`,
    title: `La palette colori del tema`,
    defaultColorName: `Bel colore`,
    placeholder: `Oops, la palette colori è vuota… Per ora. Premi il tasto "Aggiungi un nuovo colore" in fondo, oppure se hai assegnato un'immagine a chat_wallpaper, apri il suo editor e aggiungi il colore che viene consigliato a questa palette!`,
  },
};

export default localization;
