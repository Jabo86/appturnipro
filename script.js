// script.js

let shifts = {};
const holidays = [
    { month: 0, day: 1 },   // 1 gennaio
    { month: 0, day: 6 },   // 6 gennaio
    { month: 3, day: 20 },  // 20 aprile (Pasqua)
    { month: 3, day: 21 },  // 21 aprile (Pasquetta)
    { month: 3, day: 25 },  // 25 aprile
    { month: 4, day: 1 },   // 1 maggio
    { month: 5, day: 2 },   // 2 giugno
    { month: 7, day: 15 },  // 15 agosto
    { month: 10, day: 1 },  // 1 novembre
    { month: 11, day: 8 },  // 8 dicembre
    { month: 11, day: 25 }, // 25 dicembre
    { month: 11, day: 26 }  // 26 dicembre
];
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentDay = currentDate.getDate();
let currentNoteKey = null;
let currentEditShiftKey = null;
let selectedShift = null;

const translations = {
    it: {
        title: "AppTurni",
        prevMonth: "Precedente",
        nextMonth: "Successivo",
        monday: "LUN",
        tuesday: "MAR",
        wednesday: "MER",
        thursday: "GIO",
        friday: "VEN",
        saturday: "SAB",
        sunday: "DOM",
        selectShift: "Seleziona Turno",
        clearShift: "Rimuovi Turno",
        addShift: "Aggiungi Turno",
        editShift: "Modifica Turno",
        deleteShift: "Elimina Turno",
        statistics: "Statistiche",
        statsTitle: "Statistiche Complete",
        workedHours: "Ore Lavorate",
        totalHoursMonth: "Totale ore questo mese",
        shifts: "Turni",
        notes: "Note",
        backToCalendar: "Torna al Calendario",
        createShiftTitle: "Crea Nuovo Turno",
        shiftNameLabel: "Nome Turno (es. Mattina)",
        shiftNamePlaceholder: "Inserisci nome turno",
        shiftAbbreviationLabel: "Abbreviazione (es. M, opzionale)",
        shiftAbbreviationPlaceholder: "Inserisci abbreviazione",
        shiftHoursLabel: "Ore (HH:MM)",
        shiftHoursPlaceholder: "Es. 07:15",
        shiftColorLabel: "Colore Turno",
        cancel: "Annulla",
        create: "Crea",
        deleteShiftTitle: "Elimina Turno",
        selectShiftLabel: "Seleziona Turno",
        selectShiftOption: "Seleziona un turno",
        delete: "Elimina",
        editShiftTitle: "Modifica Turno",
        save: "Salva",
        noteTitle: "Aggiungi/Modifica Nota",
        noteLabel: "Nota",
        notePlaceholder: "Inserisci una nota",
        noteTimeLabel: "Orario Notifica",
        noteTimePlaceholder: "Seleziona orario (es. 07:00)",
        shareCalendar: "Condividi Calendario",
        backupCalendar: "Backup",
        alertInvalidNameHours: "Inserisci un nome valido e un orario valido (es. 07:15).",
        alertInvalidHours: "Inserisci un orario valido nel formato HH:MM.",
        alertShiftExists: "Esiste già un turno con questo nome.",
        alertSelectShiftToEdit: "Seleziona un turno da modificare.",
        alertSelectShiftToDelete: "Seleziona un turno da eliminare.",
        alertMaxShifts: "Puoi assegnare al massimo 3 turni per giorno.",
        alertSaveShiftError: "Errore nel salvataggio dei turni.",
        alertSaveNoteError: "Errore nel salvataggio della nota.",
        alertNotificationPermission: "Permetti le notifiche per ricevere avvisi sulle note.",
        noShiftsAssigned: "Nessun turno assegnato",
        noNotesPresent: "Nessuna nota presente",
        editNote: "Modifica nota",
        snooze: "Posticipa (5 min)"
    },
    en: {
        title: "AppTurni",
        prevMonth: "Previous",
        nextMonth: "Next",
        monday: "MON",
        tuesday: "TUE",
        wednesday: "WED",
        thursday: "THU",
        friday: "FRI",
        saturday: "SAT",
        sunday: "SUN",
        selectShift: "Select Shift",
        clearShift: "Clear Shift",
        addShift: "Add Shift",
        editShift: "Edit Shift",
        deleteShift: "Delete Shift",
        statistics: "Statistics",
        statsTitle: "Complete Statistics",
        workedHours: "Worked Hours",
        totalHoursMonth: "Total hours this month",
        shifts: "Shifts",
        notes: "Notes",
        backToCalendar: "Back to Calendar",
        createShiftTitle: "Create New Shift",
        shiftNameLabel: "Shift Name (e.g., Morning)",
        shiftNamePlaceholder: "Enter shift name",
        shiftAbbreviationLabel: "Abbreviation (e.g., M, optional)",
        shiftAbbreviationPlaceholder: "Enter abbreviation",
        shiftHoursLabel: "Hours (HH:MM)",
        shiftHoursPlaceholder: "E.g., 07:15",
        shiftColorLabel: "Shift Color",
        cancel: "Cancel",
        create: "Create",
        deleteShiftTitle: "Delete Shift",
        selectShiftLabel: "Select Shift",
        selectShiftOption: "Select a shift",
        delete: "Delete",
        editShiftTitle: "Edit Shift",
        save: "Save",
        noteTitle: "Add/Edit Note",
        noteLabel: "Note",
        notePlaceholder: "Enter a note",
        noteTimeLabel: "Notification Time",
        noteTimePlaceholder: "Select time (e.g., 07:00)",
        shareCalendar: "Share Calendar",
        backupCalendar: "Backup",
        alertInvalidNameHours: "Enter a valid name and time (e.g., 07:15).",
        alertInvalidHours: "Enter a valid time in HH:MM format.",
        alertShiftExists: "A shift with this name already exists.",
        alertSelectShiftToEdit: "Select a shift to edit.",
        alertSelectShiftToDelete: "Select a shift to delete.",
        alertMaxShifts: "You can assign a maximum of 3 shifts per day.",
        alertSaveShiftError: "Error saving shifts.",
        alertSaveNoteError: "Error saving note.",
        alertNotificationPermission: "Allow notifications to receive note alerts.",
        noShiftsAssigned: "No shifts assigned",
        noNotesPresent: "No notes present",
        editNote: "Edit note",
        snooze: "Snooze (5 min)"
    },
    fr: {
        title: "AppTurni",
        prevMonth: "Précédent",
        nextMonth: "Suivant",
        monday: "LUN",
        tuesday: "MAR",
        wednesday: "MER",
        thursday: "JEU",
        friday: "VEN",
        saturday: "SAM",
        sunday: "DIM",
        selectShift: "Sélectionner un quart",
        clearShift: "Supprimer le quart",
        addShift: "Ajouter un quart",
        editShift: "Modifier le quart",
        deleteShift: "Supprimer le quart",
        statistics: "Statistiques",
        statsTitle: "Statistiques complètes",
        workedHours: "Heures travaillées",
        totalHoursMonth: "Total des heures ce mois",
        shifts: "Quarts",
        notes: "Notes",
        backToCalendar: "Retour au calendrier",
        createShiftTitle: "Créer un nouveau quart",
        shiftNameLabel: "Nom du quart (ex. Matin)",
        shiftNamePlaceholder: "Entrez le nom du quart",
        shiftAbbreviationLabel: "Abréviation (ex. M, facultatif)",
        shiftAbbreviationPlaceholder: "Entrez l'abréviation",
        shiftHoursLabel: "Heures (HH:MM)",
        shiftHoursPlaceholder: "Ex. 07:15",
        shiftColorLabel: "Couleur du quart",
        cancel: "Annuler",
        create: "Créer",
        deleteShiftTitle: "Supprimer un quart",
        selectShiftLabel: "Sélectionner un quart",
        selectShiftOption: "Sélectionnez un quart",
        delete: "Supprimer",
        editShiftTitle: "Modifier le quart",
        save: "Enregistrer",
        noteTitle: "Ajouter/Modifier une note",
        noteLabel: "Note",
        notePlaceholder: "Entrez une note",
        noteTimeLabel: "Heure de notification",
        noteTimePlaceholder: "Sélectionnez l'heure (ex. 07:00)",
        shareCalendar: "Partager le calendrier",
        backupCalendar: "Sauvegarde",
        alertInvalidNameHours: "Entrez un nom valide et une heure valide (ex. 07:15).",
        alertInvalidHours: "Entrez une heure valide au format HH:MM.",
        alertShiftExists: "Un quart avec ce nom existe déjà.",
        alertSelectShiftToEdit: "Sélectionnez un quart à modifier.",
        alertSelectShiftToDelete: "Sélectionnez un quart à supprimer.",
        alertMaxShifts: "Vous pouvez assigner un maximum de 3 quarts par jour.",
        alertSaveShiftError: "Erreur lors de l'enregistrement des quarts.",
        alertSaveNoteError: "Erreur lors de l'enregistrement de la note.",
        alertNotificationPermission: "Autorisez les notifications pour recevoir des alertes de notes.",
        noShiftsAssigned: "Aucun quart assigné",
        noNotesPresent: "Aucune note présente",
        editNote: "Modifier la note",
        snooze: "Repousser (5 min)"
    },
    de: {
        title: "AppTurni",
        prevMonth: "Vorheriger",
        nextMonth: "Nächster",
        monday: "MO",
        tuesday: "DI",
        wednesday: "MI",
        thursday: "DO",
        friday: "FR",
        saturday: "SA",
        sunday: "SO",
        selectShift: "Schicht auswählen",
        clearShift: "Schicht entfernen",
        addShift: "Schicht hinzufügen",
        editShift: "Schicht bearbeiten",
        deleteShift: "Schicht löschen",
        statistics: "Statistiken",
        statsTitle: "Vollständige Statistiken",
        workedHours: "Gearbeitete Stunden",
        totalHoursMonth: "Gesamtstunden in diesem Monat",
        shifts: "Schichten",
        notes: "Notizen",
        backToCalendar: "Zurück zum Kalender",
        createShiftTitle: "Neue Schicht erstellen",
        shiftNameLabel: "Schichtname (z.B. Morgen)",
        shiftNamePlaceholder: "Schichtname eingeben",
        shiftAbbreviationLabel: "Abkürzung (z.B. M, optional)",
        shiftAbbreviationPlaceholder: "Abkürzung eingeben",
        shiftHoursLabel: "Stunden (HH:MM)",
        shiftHoursPlaceholder: "Z.B. 07:15",
        shiftColorLabel: "Schichtfarbe",
        cancel: "Abbrechen",
        create: "Erstellen",
        deleteShiftTitle: "Schicht löschen",
        selectShiftLabel: "Schicht auswählen",
        selectShiftOption: "Wählen Sie eine Schicht",
        delete: "Löschen",
        editShiftTitle: "Schicht bearbeiten",
        save: "Speichern",
        noteTitle: "Notiz hinzufügen/bearbeiten",
        noteLabel: "Notiz",
        notePlaceholder: "Notiz eingeben",
        noteTimeLabel: "Benachrichtigungszeit",
        noteTimePlaceholder: "Zeit auswählen (z.B. 07:00)",
        shareCalendar: "Kalender teilen",
        backupCalendar: "Backup",
        alertInvalidNameHours: "Geben Sie einen gültigen Namen und eine gültige Zeit ein (z.B. 07:15).",
        alertInvalidHours: "Geben Sie eine gültige Zeit im Format HH:MM ein.",
        alertShiftExists: "Eine Schicht mit diesem Namen existiert bereits.",
        alertSelectShiftToEdit: "Wählen Sie eine Schicht zum Bearbeiten aus.",
        alertSelectShiftToDelete: "Wählen Sie eine Schicht zum Löschen aus.",
        alertMaxShifts: "Sie können maximal 3 Schichten pro Tag zuweisen.",
        alertSaveShiftError: "Fehler beim Speichern der Schichten.",
        alertSaveNoteError: "Fehler beim Speichern der Notiz.",
        alertNotificationPermission: "Erlauben Sie Benachrichtigungen, um Notizalarme zu erhalten.",
        noShiftsAssigned: "Keine Schichten zugewiesen",
        noNotesPresent: "Keine Notizen vorhanden",
        editNote: "Notiz bearbeiten",
        snooze: "Snooze (5 Min)"
    },
    es: {
        title: "AppTurni",
        prevMonth: "Anterior",
        nextMonth: "Siguiente",
        monday: "LUN",
        tuesday: "MAR",
        wednesday: "MIÉ",
        thursday: "JUE",
        friday: "VIE",
        saturday: "SÁB",
        sunday: "DOM",
        selectShift: "Seleccionar turno",
        clearShift: "Eliminar turno",
        addShift: "Añadir turno",
        editShift: "Editar turno",
        deleteShift: "Eliminar turno",
        statistics: "Estadísticas",
        statsTitle: "Estadísticas completas",
        workedHours: "Horas trabajadas",
        totalHoursMonth: "Total de horas este mes",
        shifts: "Turnos",
        notes: "Notas",
        backToCalendar: "Volver al calendario",
        createShiftTitle: "Crear nuevo turno",
        shiftNameLabel: "Nombre del turno (ej. Mañana)",
        shiftNamePlaceholder: "Introducir nombre del turno",
        shiftAbbreviationLabel: "Abreviatura (ej. M, opcional)",
        shiftAbbreviationPlaceholder: "Introducir abreviatura",
        shiftHoursLabel: "Horas (HH:MM)",
        shiftHoursPlaceholder: "Ej. 07:15",
        shiftColorLabel: "Color del turno",
        cancel: "Cancelar",
        create: "Crear",
        deleteShiftTitle: "Eliminar turno",
        selectShiftLabel: "Seleccionar turno",
        selectShiftOption: "Seleccione un turno",
        delete: "Eliminar",
        editShiftTitle: "Editar turno",
        save: "Guardar",
        noteTitle: "Añadir/Editar nota",
        noteLabel: "Nota",
        notePlaceholder: "Introducir una nota",
        noteTimeLabel: "Hora de notificación",
        noteTimePlaceholder: "Seleccionar hora (ej. 07:00)",
        shareCalendar: "Compartir calendario",
        backupCalendar: "Copia de seguridad",
        alertInvalidNameHours: "Introduzca un nombre válido y una hora válida (ej. 07:15).",
        alertInvalidHours: "Introduzca una hora válida en formato HH:MM.",
        alertShiftExists: "Ya existe un turno con este nombre.",
        alertSelectShiftToEdit: "Seleccione un turno para editar.",
        alertSelectShiftToDelete: "Seleccione un turno para eliminar.",
        alertMaxShifts: "Puede asignar un máximo de 3 turnos por día.",
        alertSaveShiftError: "Error al guardar los turnos.",
        alertSaveNoteError: "Error al guardar la nota.",
        alertNotificationPermission: "Permita las notificaciones para recibir alertas de notas.",
        noShiftsAssigned: "No hay turnos asignados",
        noNotesPresent: "No hay notas presentes",
        editNote: "Editar nota",
        snooze: "Posponer (5 min)"
    }
};

function updateTranslations(lang) {
    console.log('Aggiornamento traduzioni per lingua:', lang);
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            const icon = element.querySelector('i');
            if (icon) {
                element.innerHTML = '';
                element.appendChild(icon);
                element.appendChild(document.createTextNode(' ' + translations[lang][key]));
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    document.title = translations[lang].title;
    document.querySelectorAll('.note-edit-btn').forEach(btn => {
        btn.title = translations[lang].editNote;
    });
    const monthNames = {
        it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    const monthYearElement = document.getElementById('monthYear');
    if (monthYearElement) {
        monthYearElement.textContent = `${monthNames[lang][currentMonth]} ${currentYear}`;
    } else {
        console.error('Elemento #monthYear non trovato');
    }
}

const originalAlert = window.alert;
window.alert = function(message) {
    const lang = localStorage.getItem('selectedLanguage') || 'it';
    const translatedMessage = translations[lang][message] || message;
    originalAlert(translatedMessage);
};

function initializeLanguageSelector() {
    const languageButton = document.getElementById('languageButton');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageFlagSpan = document.getElementById('languageFlag');
    const languageOptions = document.querySelectorAll('.language-option');
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'it';
    const languageMap = {
        'it': { name: 'Italiano', flag: 'flag-icon-it' },
        'en': { name: 'English', flag: 'flag-icon-gb' },
        'fr': { name: 'Français', flag: 'flag-icon-fr' },
        'de': { name: 'Deutsch', flag: 'flag-icon-de' },
        'es': { name: 'Español', flag: 'flag-icon-es' }
    };

    console.log('Inizializzazione selettore lingua, lingua salvata:', savedLanguage);
    if (languageFlagSpan) {
        languageFlagSpan.className = `flag-icon ${languageMap[savedLanguage].flag}`;
        console.log('Bandiera impostata:', languageMap[savedLanguage].flag);
    } else {
        console.error('Elemento #languageFlag non trovato');
    }
    updateTranslations(savedLanguage);

    if (languageButton && languageDropdown) {
        languageButton.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
            languageButton.classList.toggle('active');
            console.log('Pulsante lingua cliccato, dropdown attivo:', languageDropdown.classList.contains('active'));
        });

        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                if (languageFlagSpan) {
                    languageFlagSpan.className = `flag-icon ${languageMap[lang].flag}`;
                    console.log('Lingua selezionata:', lang, 'Bandiera aggiornata:', languageMap[lang].flag);
                }
                localStorage.setItem('selectedLanguage', lang);
                languageDropdown.classList.remove('active');
                languageButton.classList.remove('active');
                updateTranslations(lang);
                renderCalendar();
            });
        });

        document.addEventListener('click', (e) => {
            if (!languageButton.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
                languageButton.classList.remove('active');
                console.log('Clic fuori dal menu, dropdown chiuso');
            }
        });
    } else {
        console.error('Elementi #languageButton o #languageDropdown non trovati');
    }
}

function initializeHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburgerButton');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const shareCalendarBtn = document.getElementById('shareCalendar');
    const backupCalendarBtn = document.getElementById('backupCalendar');
    const menuItems = document.querySelectorAll('.menu-item');

    if (!hamburgerButton || !hamburgerMenu) {
        console.error('Elementi hamburger non trovati:', { hamburgerButton, hamburgerMenu });
        return;
    }

    hamburgerButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.toggle('active');
        console.log('Menu hamburger cliccato, menu attivo:', hamburgerMenu.classList.contains('active'));
    });

    document.addEventListener('click', (e) => {
        if (!hamburgerButton.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            console.log('Clic fuori dal menu hamburger, menu chiuso');
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerMenu.classList.remove('active');
            console.log('Elemento del menu cliccato, menu chiuso');
        });
    });

    if (shareCalendarBtn) {
        shareCalendarBtn.addEventListener('click', shareCalendar);
    } else {
        console.error('Pulsante #shareCalendar non trovato');
    }

    if (backupCalendarBtn) {
        backupCalendarBtn.addEventListener('click', backupCalendar);
    } else {
        console.error('Pulsante #backupCalendar non trovato');
    }
}

function shareCalendar() {
    const icsContent = generateICSFile();
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const fileName = `calendar_${currentYear}_${currentMonth + 1}.ics`;

    if (navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: 'text/calendar' });
        navigator.share({
            title: 'AppTurni Calendario',
            text: 'Condividi il tuo calendario AppTurni',
            files: [file]
        }).then(() => {
            console.log('Calendario condiviso con successo tramite Web Share API');
        }).catch(err => {
            console.error('Errore nella condivisione tramite Web Share API:', err);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
            console.log('Calendario scaricato come fallback');
        });
    } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        console.log('Calendario scaricato (Web Share API non supportata)');
    }
}

function generateICSFile() {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AppTurni//Calendar//IT
CALSCALE:GREGORIAN
`;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const shiftKey = `shift_${currentYear}_${currentMonth}_${day}`;
        const noteKey = `note_${currentYear}_${currentMonth}_${day}`;
        const shiftNames = loadShift(shiftKey);
        const noteData = loadNote(noteKey);
        const noteText = noteData.text || '';
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
        shiftNames.forEach(shiftName => {
            if (shifts[shiftName]) {
                const shift = shifts[shiftName];
                icsContent += `BEGIN:VEVENT
UID:${shiftKey}_${shiftName}
DTSTAMP:${dateStr}T000000
DTSTART:${dateStr}T000000
DTEND:${dateStr}T235959
SUMMARY:${shift.name} (${decimalToTime(shift.hours)})
DESCRIPTION:${noteText || 'Nessuna nota'}
END:VEVENT
`;
            }
        });
        if (noteText && !shiftNames.length) {
            icsContent += `BEGIN:VEVENT
UID:${noteKey}
DTSTAMP:${dateStr}T000000
DTSTART:${dateStr}T000000
DTEND:${dateStr}T235959
SUMMARY:Nota
DESCRIPTION:${noteText}
END:VEVENT
`;
        }
    }
    icsContent += `END:VCALENDAR`;
    return icsContent;
}

function backupCalendar() {
    const backupData = {
        shifts,
        localStorage: {}
    };
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('shift_') || key.startsWith('note_') || key === 'customShifts' || key === 'selectedLanguage') {
            backupData.localStorage[key] = localStorage.getItem(key);
        }
    }
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_appturni_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    console.log('Backup creato come file JSON');
}

function initializeNotifications() {
    document.addEventListener('deviceready', () => {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
            cordova.plugins.notification.local.requestPermission(() => {
                console.log('Permessi notifiche locali concessi');
            }, () => {
                alert('alertNotificationPermission');
            });
            cordova.plugins.notification.local.on('click', (notification) => {
                if (notification.data && notification.data.snooze) {
                    snoozeNotification(notification.data.noteKey, notification.data.noteText, notification.data.noteTime);
                }
            });
        } else {
            console.warn('Plugin notifiche locali non disponibile');
        }
    });
}

function snoozeNotification(noteKey, noteText, noteTime) {
    const [_, year, month, day] = noteKey.split('_').map(Number);
    const [hours, minutes] = noteTime.split(':').map(Number);
    const triggerTime = new Date(year, month, day, hours, minutes);
    triggerTime.setMinutes(triggerTime.getMinutes() + 5); // Posticipa di 5 minuti
    const lang = localStorage.getItem('selectedLanguage') || 'it';
    const monthNames = {
        it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    const title = `Nota per ${day} ${monthNames[lang][month]} ${year}`;
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
        cordova.plugins.notification.local.schedule({
            id: parseInt(noteKey.replace(/\D/g, '') + '1'), // ID unico per snooze
            title: title,
            text: noteText,
            trigger: { at: triggerTime },
            sound: 'file://sound/alarm.mp3', // Assicurati di avere un file audio nella directory www/sound
            actions: [
                { id: 'snooze', title: translations[lang].snooze }
            ],
            data: { noteKey, noteText, noteTime, snooze: true }
        }, () => {
            console.log('Notifica snooze schedulata:', title, noteText, triggerTime);
        });
    }
}

function sendNoteNotification(year, month, day, noteText, noteTime) {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
        const lang = localStorage.getItem('selectedLanguage') || 'it';
        const monthNames = {
            it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        };
        const title = `Nota per ${day} ${monthNames[lang][month]} ${year}`;
        let triggerTime;
        if (noteTime) {
            const [hours, minutes] = noteTime.split(':').map(Number);
            triggerTime = new Date(year, month, day, hours, minutes);
        } else {
            triggerTime = new Date(year, month, day);
        }
        const noteKey = `note_${year}_${month}_${day}`;
        cordova.plugins.notification.local.schedule({
            id: parseInt(noteKey.replace(/\D/g, '')), // ID unico basato su noteKey
            title: title,
            text: noteText,
            trigger: { at: triggerTime },
            sound: 'file://sound/alarm.mp3', // File audio per la notifica
            actions: [
                { id: 'snooze', title: translations[lang].snooze }
            ],
            data: { noteKey, noteText, noteTime, snooze: true }
        }, () => {
            console.log('Notifica locale schedulata:', title, noteText, triggerTime);
        });
    }
    // Notifica push FCM (fallback o per dispositivi online)
    if (Notification.permission === 'granted') {
        const lang = localStorage.getItem('selectedLanguage') || 'it';
        const monthNames = {
            it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        };
        const title = `Nota per ${day} ${monthNames[lang][month]} ${year}`;
        const options = {
            body: noteText,
            icon: '/icon.png',
            requireInteraction: true
        };
        new Notification(title, options);
        console.log('Notifica push inviata:', title, noteText);
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, options);
            });
        }
    }
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

const isStorageAvailable = storageAvailable('localStorage');

function saveShift(shiftKey, shiftValue) {
    if (isStorageAvailable) {
        try {
            if (shiftValue && shiftValue.length > 0) {
                localStorage.setItem(shiftKey, JSON.stringify(shiftValue));
            } else {
                localStorage.removeItem(shiftKey);
            }
        } catch (e) {
            alert('alertSaveShiftError');
        }
    }
}

function loadShift(shiftKey) {
    if (isStorageAvailable) {
        try {
            const shift = localStorage.getItem(shiftKey);
            return shift ? JSON.parse(shift) : [];
        } catch (e) {
            return [];
        }
    }
    return [];
}

function saveNote() {
    if (currentNoteKey && isStorageAvailable) {
        const noteText = document.getElementById('noteText').value.trim();
        const noteTime = document.getElementById('noteTime').value;
        try {
            if (noteText) {
                const noteData = { text: noteText, time: noteTime || '' };
                localStorage.setItem(currentNoteKey, JSON.stringify(noteData));
                const [_, year, month, day] = currentNoteKey.split('_').map(Number);
                sendNoteNotification(year, month, day, noteText, noteTime);
            } else {
                localStorage.removeItem(currentNoteKey);
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
                    cordova.plugins.notification.local.cancel(parseInt(currentNoteKey.replace(/\D/g, '')), () => {
                        console.log('Notifica locale cancellata per:', currentNoteKey);
                    });
                }
            }
        } catch (e) {
            alert('alertSaveNoteError');
        }
        closeNoteModal();
        renderCalendar();
    }
}

function loadNote(noteKey) {
    if (isStorageAvailable) {
        try {
            const note = localStorage.getItem(noteKey);
            return note ? JSON.parse(note) : { text: '', time: '' };
        } catch (e) {
            return { text: '', time: '' };
        }
    }
    return { text: '', time: '' };
}

function loadCustomShifts() {
    if (isStorageAvailable) {
        const customShifts = localStorage.getItem('customShifts');
        if (customShifts) {
            shifts = JSON.parse(customShifts);
        }
    }
}

function saveCustomShifts() {
    if (isStorageAvailable) {
        try {
            localStorage.setItem('customShifts', JSON.stringify(shifts));
        } catch (e) {
            alert('alertSaveShiftError');
        }
    }
}

function timeToDecimal(time) {
    if (!time || !time.includes(':')) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours + (minutes / 60);
}

function decimalToTime(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

function openCreateShiftModal() {
    const modal = document.getElementById('createShiftModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error('Modale #createShiftModal non trovato');
    }
}

function closeCreateShiftModal() {
    const modal = document.getElementById('createShiftModal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('shiftName').value = '';
        document.getElementById('shiftAbbreviation').value = '';
        document.getElementById('shiftHours').value = '';
        document.getElementById('shiftColor').value = '#fef3c7';
    } else {
        console.error('Modale #createShiftModal non trovato');
    }
}

function createShift() {
    const shiftName = document.getElementById('shiftName').value.trim().toUpperCase();
    const shiftAbbreviation = document.getElementById('shiftAbbreviation').value.trim().toUpperCase();
    const shiftHoursInput = document.getElementById('shiftHours').value.trim();
    const shiftColor = document.getElementById('shiftColor').value;
    if (!shiftName || !shiftHoursInput) {
        alert('alertInvalidNameHours');
        return;
    }
    const shiftHours = timeToDecimal(shiftHoursInput);
    if (isNaN(shiftHours)) {
        alert('alertInvalidHours');
        return;
    }
    if (shifts[shiftName]) {
        alert('alertShiftExists');
        return;
    }
    shifts[shiftName] = { 
        name: shiftName, 
        abbreviation: shiftAbbreviation || shiftName,
        hours: shiftHours, 
        color: shiftColor 
    };
    saveCustomShifts();
    closeCreateShiftModal();
    renderShiftSelector();
    renderCalendar();
}

function openEditShiftModal() {
    const select = document.createElement('select');
    select.id = 'editShiftSelect';
    select.className = 'w-full p-2 border rounded-lg mb-4';
    select.innerHTML = '<option value="" data-translate="selectShiftOption">Seleziona un turno</option>' + 
        Object.keys(shifts).map(
            key => `<option value="${key}">${shifts[key].name} (${decimalToTime(shifts[key].hours)})</option>`
        ).join('');
    select.addEventListener('change', () => {
        const shiftKey = select.value;
        if (shiftKey && shifts[shiftKey]) {
            currentEditShiftKey = shiftKey;
            document.getElementById('editShiftName').value = shifts[shiftKey].name;
            document.getElementById('editShiftAbbreviation').value = shifts[shiftKey].abbreviation;
            document.getElementById('editShiftHours').value = decimalToTime(shifts[shiftKey].hours);
            document.getElementById('editShiftColor').value = shifts[shiftKey].color;
        } else {
            currentEditShiftKey = null;
            document.getElementById('editShiftName').value = '';
            document.getElementById('editShiftAbbreviation').value = '';
            document.getElementById('editShiftHours').value = '';
            document.getElementById('editShiftColor').value = '#fef3c7';
        }
    });
    const modal = document.getElementById('editShiftModal');
    const modalContent = modal.querySelector('.bg-white');
    const title = modalContent.querySelector('h3');
    title.insertAdjacentElement('afterend', select);
    modal.classList.remove('hidden');
    updateTranslations(localStorage.getItem('selectedLanguage') || 'it');
}

function closeEditShiftModal() {
    const modal = document.getElementById('editShiftModal');
    const select = document.getElementById('editShiftSelect');
    if (select) select.remove();
    modal.classList.add('hidden');
    currentEditShiftKey = null;
}

function updateShift() {
    if (!currentEditShiftKey) {
        alert('alertSelectShiftToEdit');
        return;
    }
    const shiftAbbreviation = document.getElementById('editShiftAbbreviation').value.trim().toUpperCase();
    const shiftHoursInput = document.getElementById('editShiftHours').value.trim();
    const shiftColor = document.getElementById('editShiftColor').value;
    const shiftHours = timeToDecimal(shiftHoursInput);
    if (isNaN(shiftHours)) {
        alert('alertInvalidHours');
        return;
    }
    shifts[currentEditShiftKey] = {
        name: shifts[currentEditShiftKey].name,
        abbreviation: shiftAbbreviation || shifts[currentEditShiftKey].name,
        hours: shiftHours,
        color: shiftColor
    };
    saveCustomShifts();
    closeEditShiftModal();
    renderShiftSelector();
    renderCalendar();
}

function openDeleteShiftModal() {
    const select = document.getElementById('deleteShiftSelect');
    select.innerHTML = '<option value="" data-translate="selectShiftOption">Seleziona un turno</option>' + 
        Object.keys(shifts).map(
            key => `<option value="${key}">${shifts[key].name} (${decimalToTime(shifts[key].hours)})</option>`
        ).join('');
    document.getElementById('deleteShiftModal').classList.remove('hidden');
    updateTranslations(localStorage.getItem('selectedLanguage') || 'it');
}

function closeDeleteShiftModal() {
    document.getElementById('deleteShiftModal').classList.add('hidden');
    document.getElementById('deleteShiftSelect').value = '';
}

function deleteShift() {
    const shiftName = document.getElementById('deleteShiftSelect').value;
    if (!shiftName) {
        alert('alertSelectShiftToDelete');
        return;
    }
    delete shifts[shiftName];
    saveCustomShifts();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const shiftKey = `shift_${currentYear}_${currentMonth}_${day}`;
        const savedShifts = loadShift(shiftKey);
        const updatedShifts = savedShifts.filter(s => s !== shiftName);
        saveShift(shiftKey, updatedShifts);
    }
    if (selectedShift === shiftName) {
        selectedShift = null;
        renderShiftSelector();
    }
    closeDeleteShiftModal();
    renderShiftSelector();
    renderCalendar();
    updateWorkedHoursAndSummary();
}

function openNoteModal(year, month, day) {
    currentNoteKey = `note_${year}_${month}_${day}`;
    const noteData = loadNote(currentNoteKey);
    document.getElementById('noteText').value = noteData.text;
    document.getElementById('noteTime').value = noteData.time;
    document.getElementById('noteModal').classList.remove('hidden');
    updateTranslations(localStorage.getItem('selectedLanguage') || 'it');
}

function closeNoteModal() {
    document.getElementById('noteModal').classList.add('hidden');
    document.getElementById('noteText').value = '';
    document.getElementById('noteTime').value = '';
    currentNoteKey = null;
}

function calculateWorkedHours() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let totalWorked = 0;
    for (let day = 1; day <= daysInMonth; day++) {
        const shiftKey = `shift_${currentYear}_${currentMonth}_${day}`;
        const shiftNames = loadShift(shiftKey);
        shiftNames.forEach(shiftName => {
            if (shifts[shiftName]) {
                totalWorked += shifts[shiftName].hours;
            }
        });
    }
    return totalWorked;
}

function calculateShiftSummary() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const shiftCounts = {};
    const shiftHours = {};
    Object.keys(shifts).forEach(shift => {
        shiftCounts[shift] = 0;
        shiftHours[shift] = 0;
    });
    for (let day = 1; day <= daysInMonth; day++) {
        const shiftKey = `shift_${currentYear}_${currentMonth}_${day}`;
        const shiftNames = loadShift(shiftKey);
        shiftNames.forEach(shiftName => {
            if (shifts[shiftName]) {
                shiftCounts[shiftName]++;
                shiftHours[shiftName] += shifts[shiftName].hours;
            }
        });
    }
    const lang = localStorage.getItem('selectedLanguage') || 'it';
    let summaryHtml = '';
    Object.keys(shifts).forEach(shift => {
        const totalHours = shiftHours[shift];
        const formattedHours = decimalToTime(totalHours);
        summaryHtml += `
            <div class="stats-item">
                <div class="stats-item-title">${shifts[shift].name}</div>
                <div class="stats-item-value">${shiftCounts[shift]}</div>
                <div class="stats-item-title">${formattedHours}</div>
            </div>
        `;
    });
    if (!Object.keys(shifts).length) {
        summaryHtml = `<div class="stats-item">${translations[lang].noShiftsAssigned}</div>`;
    }
    return summaryHtml;
}

function updateWorkedHoursAndSummary() {
    const workedHours = calculateWorkedHours();
    document.getElementById('statsWorkedHours').textContent = decimalToTime(workedHours);
    const shiftSummary = calculateShiftSummary();
    document.getElementById('statsShiftsDetails').innerHTML = shiftSummary;
    updateStatsNotes();
}

function updateStatsNotes() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lang = localStorage.getItem('selectedLanguage') || 'it';
    let notesHtml = '';
    for (let day = 1; day <= daysInMonth; day++) {
        const noteKey = `note_${currentYear}_${currentMonth}_${day}`;
        const noteData = loadNote(noteKey);
        const noteText = noteData.text;
        if (noteText) {
            const date = new Date(currentYear, currentMonth, day);
            const dayNames = {
                it: ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
                en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                fr: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
                de: ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'],
                es: ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
            };
            const dayName = dayNames[lang][date.getDay()];
            notesHtml += `
                <div class="mb-3 pb-3 border-b border-blue-300">
                    <div class="font-bold text-white">${day} ${dayName}</div>
                    <div class="text-sm text-white">${noteText}</div>
                </div>
            `;
        }
    }
    if (!notesHtml) {
        notesHtml = `<div class="text-white text-center">${translations[lang].noNotesPresent}</div>`;
    }
    document.getElementById('statsNotesList').innerHTML = notesHtml;
}

function showStatsPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('statsPage').style.display = 'block';
    updateWorkedHoursAndSummary();
}

function showMainPage() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('statsPage').style.display = 'none';
}

function renderShiftSelector() {
    const shiftSelector = document.getElementById('shiftSelector');
    if (!shiftSelector) {
        console.error('Elemento #shiftSelector non trovato');
        return;
    }
    shiftSelector.innerHTML = '';
    Object.keys(shifts).forEach(shiftKey => {
        const shift = shifts[shiftKey];
        const shiftOption = document.createElement('div');
        shiftOption.className = `shift-option ${selectedShift === shiftKey ? 'selected-shift' : ''}`;
        shiftOption.style.backgroundColor = shift.color;
        shiftOption.textContent = shift.abbreviation;
        shiftOption.title = `${shift.name} (${decimalToTime(shifts[shiftKey].hours)})`;
        shiftOption.addEventListener('click', () => {
            selectedShift = shiftKey;
            renderShiftSelector();
        });
        shiftSelector.appendChild(shiftOption);
    });
}

function clearShift() {
    selectedShift = null;
    renderShiftSelector();
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    if (!calendar || !monthYear) {
        console.error('Elementi #calendar o #monthYear non trovati:', { calendar, monthYear });
        return;
    }
    const lang = localStorage.getItem('selectedLanguage') || 'it';
    while (calendar.children.length > 7) {
        calendar.removeChild(calendar.lastChild);
    }
    const monthNames = {
        it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    monthYear.textContent = `${monthNames[lang][currentMonth]} ${currentYear}`;
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < offset; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell';
        calendar.appendChild(emptyCell);
    }
    const today = new Date();
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        if (isCurrentMonth && day === today.getDate()) {
            dayCell.classList.add('today');
        }
        // Verifica se il giorno è una domenica o una festività
        const date = new Date(currentYear, currentMonth, day);
        const isSunday = date.getDay() === 0; // Domenica
        const isHoliday = holidays.some(h => h.month === currentMonth && h.day === day) || isSunday;
        if (isHoliday) {
            dayCell.classList.add('holiday');
        }
        const shiftKey = `shift_${currentYear}_${currentMonth}_${day}`;
        const noteKey = `note_${currentYear}_${currentMonth}_${day}`;
        const shiftNames = loadShift(shiftKey);
        const noteData = loadNote(noteKey);
        const noteText = noteData.text;
        if (noteText) {
            dayCell.classList.add('has-note');
            if (isHoliday) {
                dayCell.classList.add('holiday');
            }
        }
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        const shiftsContainer = document.createElement('div');
        shiftsContainer.className = 'shifts-container';
        shiftNames.forEach(shiftName => {
            if (shifts[shiftName]) {
                const shiftBadge = document.createElement('div');
                shiftBadge.className = shiftNames.length === 1 ? 'shift-badge single-shift' : 'shift-badge';
                shiftBadge.style.backgroundColor = shifts[shiftName].color;
                shiftBadge.textContent = shifts[shiftName].abbreviation;
                shiftBadge.title = `${shifts[shiftName].name} (${decimalToTime(shifts[shiftName].hours)})`;
                shiftsContainer.appendChild(shiftBadge);
            }
        });
        dayCell.appendChild(shiftsContainer);
        if (noteText) {
            const noteTextEl = document.createElement('div');
            noteTextEl.className = 'note-text';
            noteTextEl.textContent = noteText;
            dayCell.appendChild(noteTextEl);
            const noteEditBtn = document.createElement('i');
            noteEditBtn.className = 'fas fa-edit note-edit-btn';
            noteEditBtn.title = translations[lang].editNote;
            noteEditBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openNoteModal(currentYear, currentMonth, day);
            });
            dayCell.appendChild(noteEditBtn);
        }
        dayCell.addEventListener('click', () => {
            if (selectedShift) {
                const currentShifts = loadShift(shiftKey);
                if (currentShifts.includes(selectedShift)) {
                    const updatedShifts = currentShifts.filter(s => s !== selectedShift);
                    saveShift(shiftKey, updatedShifts);
                } else {
                    if (currentShifts.length >= 3) {
                        alert('alertMaxShifts');
                        return;
                    }
                    currentShifts.push(selectedShift);
                    saveShift(shiftKey, currentShifts);
                }
                renderCalendar();
                updateWorkedHoursAndSummary();
            } else {
                openNoteModal(currentYear, currentMonth, day);
            }
        });
        calendar.appendChild(dayCell);
    }
    renderShiftSelector();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Inizializzazione app');
    loadCustomShifts();
    initializeLanguageSelector();
    initializeHamburgerMenu();
    initializeNotifications();
    renderCalendar();
});
