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
  workspace_unaddedVariable: () => `Non aggiunta`,
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
  variableEditor_uploadImage: () => `Carica un'immagine`,
};

export default localization;