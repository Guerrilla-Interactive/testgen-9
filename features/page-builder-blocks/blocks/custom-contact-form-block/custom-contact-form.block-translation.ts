function translate<T extends Record<string, any>>(
    translations: T | undefined | null
  ) {
    return function t<K extends keyof T>(
      key: K, 
      fallback: string
    ): string {
        if (!translations) return fallback;
        const value = translations[key];
        return (value !== undefined ? String(value) : fallback);
    };
}


export const customContactFormBlockTranslations = translate({
    formTitle: "Kontakt oss",
    formDescription: "Ta kontakt med oss for forspørsmål og et uforpliktet tilbud angående deres prosjekt.",
    submitButtonText: "Send melding",
    successMessage: "Takk for meldingen. Vi vil kontakte deg så fort som mulig!",
    
    // Form field labels and placeholders
    name: "Fornavn",
    namePlaceholder: "Ditt fornavn...",

    phone: "Telefon",
    phonePlaceholder: "Ditt telefonnummer...",
    email: "Epost",
    emailPlaceholder: "Din epostadresse...",
    message: "Melding",
    messagePlaceholder: "Din melding...",
    messageHelpText: "Det er fint med litt beskrivelse om hva du trenger hjelp med, så vil vi kunne være mer behjelpelig når vi tar kontakt!",
    
    // Validation messages
    required: "er påkrevd",
    invalidEmail: "Vennligst skriv inn en gyldig e-postadresse",
    invalidPhone: "Vennligst skriv inn et gyldig telefonnummer",
    invalidDate: "Vennligst velg en gyldig dato",
    mustBeConfirmed: "må bekreftes",
    pleasePick: "Vennligst velg en",
    errorMessage: "En feil oppstod.",
    submissionError: "En feil oppstod under innsendingen av skjemaet.",
    
    // File upload
    selectFile: "Velg fil",
    
    // Form labels
    getHelp: "Få hjelp",
});


export const customContactFormBlockComponentTranslations = translate({
    formTitle: "Kontakt oss",
    // Add component-specific translations here if needed
});


