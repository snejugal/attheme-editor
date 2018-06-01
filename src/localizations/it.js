import Link from "../link/component";
import React from "react";

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

  confirmDialog_yes: () => `Sì`,
  confirmDialog_no: () => `No`,
};

export default localization;