// Variabili globali
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
        alertMaxShifts: "Puoi assegnare al massimo 5 turni per giorno.",
        alertSaveShiftError: "Errore nel salvataggio dei turni.",
        alertSaveNoteError: "Errore nel salvataggio della nota.",
        alertNotificationPermission: "Permetti le notifiche per ricevere avvisi sulle note.",
        alertStoragePermission: "Permetti l'accesso alla memoria per salvare i file.",
        noShiftsAssigned: "Nessun turno assegnato",
        noNotesPresent: "Nessuna nota presente",
        editNote: "Modifica nota",
        alertShareError: "Errore nella condivisione del calendario.",
        alertBackupError: "Errore nella creazione del backup."
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
        alertMaxShifts: "You can assign a maximum of 5 shifts per day.",
        alertSaveShiftError: "Error saving shifts.",
        alertSaveNoteError: "Error saving note.",
        alertNotificationPermission: "Allow notifications to receive note alerts.",
        alertStoragePermission: "Allow storage access to save files.",
        noShiftsAssigned: "No shifts assigned",
        noNotesPresent: "No notes present",
        editNote: "Edit note",
        alertShareError: "Error sharing the calendar.",
        alertBackupError: "Error creating the backup."
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
        alertMaxShifts: "Vous pouvez assigner un maximum de 5 quarts par jour.",
        alertSaveShiftError: "Erreur lors de l'enregistrement des quarts.",
        alertSaveNoteError: "Erreur lors de l'enregistrement de la note.",
        alertNotificationPermission: "Autorisez les notifications pour recevoir des alertes de notes.",
        alertStoragePermission: "Autorisez l'accès au stockage pour enregistrer des fichiers.",
        noShiftsAssigned: "Aucun quart assigné",
        noNotesPresent: "Aucune note présente",
        editNote: "Modifier la note",
        alertShareError: "Erreur lors du partage du calendrier.",
        alertBackupError: "Erreur lors de la création de la sauvegarde."
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
        alertMaxShifts: "Sie können maximal 5 Schichten pro Tag zuweisen.",
        alertSaveShiftError: "Fehler beim Speichern der Schichten.",
        alertSaveNoteError: "Fehler beim Speichern der Notiz.",
        alertNotificationPermission: "Erlauben Sie Benachrichtigungen, um Notizalarme zu erhalten.",
        alertStoragePermission: "Erlauben Sie den Zugriff auf den Speicher, um Dateien zu speichern.",
        noShiftsAssigned: "Keine Schichten zugewiesen",
        noNotesPresent: "Keine Notizen vorhanden",
        editNote: "Notiz bearbeiten",
        alertShareError: "Fehler beim Teilen des Kalenders.",
        alertBackupError: "Fehler beim Erstellen des Backups."
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
        alertMaxShifts: "Puede asignar un máximo de 5 turnos por día.",
        alertSaveShiftError: "Error al guardar los turnos.",
        alertSaveNoteError: "Error al guardar la nota.",
        alertNotificationPermission: "Permita las notificaciones para recibir alertas de notas.",
        alertStoragePermission: "Permita el acceso al almacenamiento para guardar archivos.",
        noShiftsAssigned: "No hay turnos asignados",
        noNotesPresent: "No hay notas presentes",
        editNote: "Editar nota",
        alertShareError: "Error al compartir el calendario.",
        alertBackupError: "Error al crear la copia de seguridad."
    }
};

function updateTranslations(lang) {
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
    document.getElementById('monthYear').textContent = `${monthNames[lang][currentMonth]} ${currentYear}`;
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

    if (languageFlagSpan) {
        languageFlagSpan.className = `flag-icon ${languageMap[savedLanguage].flag}`;
    }
    updateTranslations(savedLanguage);

    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
        languageButton.classList.toggle('active');
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            languageFlagSpan.className = `flag-icon ${languageMap[lang].flag}`;
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
        }
    });
}

function initializeHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburgerButton');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    hamburgerButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!hamburgerButton.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
        }
    });
    document.getElementById('shareCalendar').addEventListener('click', shareCalendar);
    document.getElementById('backupCalendar').addEventListener('click', backupCalendar);
}

function requestStoragePermissions(callback) {
    if (window.cordova && cordova.plugins && cordova.plugins.diagnostic) {
        cordova.plugins.diagnostic.requestExternalStorageAuthorization(
            (status) => {
                if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
                    callback();
                } else {
                    alert('alertStoragePermission');
                }
            },
            (err) => {
                alert('alertStoragePermission');
            }
        );
    } else {
        callback();
    }
}

function saveAndShareFile(content, fileName, mimeType, shareTitle, shareText) {
    document.addEventListener('deviceready', () => {
        const directory = cordova.file.externalDataDirectory || cordova.file.dataDirectory;
        window.resolveLocalFileSystemURL(directory, (dirEntry) => {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
                fileEntry.createWriter((fileWriter) => {
                    fileWriter.onwriteend = () => {
                        if (window.plugins && window.plugins.socialsharing) {
                            window.plugins.socialsharing.share(
                                shareText,
                                shareTitle,
                                fileEntry.toURL(),
                                null,
                                () => console.log('Condivisione completata'),
                                (err) => {
                                    alert('alertShareError');
                                    fallbackDownload(content, fileName);
                                }
                            );
                        } else {
                            fallbackDownload(content, fileName);
                        }
                    };
                    fileWriter.onerror = (err) => {
                        alert('alertShareError');
                        fallbackDownload(content, fileName);
                    };
                    fileWriter.write(new Blob([content], { type: mimeType }));
                });
            }, (err) => {
                alert('alertShareError');
                fallbackDownload(content, fileName);
            });
        }, (err) => {
            alert('alertShareError');
            fallbackDownload(content, fileName);
        });
    }, { once: true });
}

function fallbackDownload(content, fileName) {
    const blob = new Blob([content], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function shareCalendar() {
    requestStoragePermissions(() => {
        const icsContent = generateICSFile();
        const fileName = `calendar_${currentYear}_${currentMonth + 1}.ics`;
        saveAndShareFile(icsContent, fileName, 'text/calendar', 'AppTurni Calendario', 'Condividi il tuo calendario AppTurni');
    });
}

function backupCalendar() {
    requestStoragePermissions(() => {
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
        const backupJson = JSON.stringify(backupData, null, 2);
        const fileName = `backup_appturni_${new Date().toISOString().split('T')[0]}.json`;
        saveAndShareFile(backupJson, fileName, 'application/json', 'AppTurni Backup', 'Condividi il tuo backup AppTurni');
    });
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

function initializeNotifications() {
    document.addEventListener('deviceready', () => {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
            cordova.plugins.notification.local.requestPermission(() => {
                rescheduleNotifications();
            }, () => {
                alert('alertNotificationPermission');
            });
            cordova.plugins.notification.local.on('click', (notification) => {
                console.log('Notifica cliccata:', notification);
            });
        }
    }, { once: true });
}

function rescheduleNotifications() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('note_')) {
            const noteData = JSON.parse(localStorage.getItem(key));
            const [_, year, month, day] = key.split('_').map(Number);
            if (noteData.text && noteData.time) {
                sendNoteNotification(year, month, day, noteData.text, noteData.time);
            }
        }
    }
}

function sendNoteNotification(year, month, day, noteText, noteTime) {
    const lang = localStorage.getItem('selectedLanguage') || 'it';
    const monthNames = {
        it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    const title = `Nota per ${day} ${monthNames[lang][month]} ${year}`;
    document.addEventListener('deviceready', () => {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
            const notificationId = parseInt(`${year}${month}${day}`);
            const triggerTime = noteTime ? new Date(year, month, day, ...noteTime.split(':').map(Number)) : new Date();
            cordova.plugins.notification.local.cancel(notificationId, () => {
                cordova.plugins.notification.local.schedule({
                    id: notificationId,
                    title: title,
                    text: noteText,
                    trigger: { at: triggerTime },
                    foreground: true
                });
            });
        }
    }, { once: true });
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
                if (noteTime) {
                    sendNoteNotification(year, month, day, noteText, noteTime);
                }
            } else {
                localStorage.removeItem(currentNoteKey);
                const [_, year, month, day] = currentNoteKey.split('_').map(Number);
                const notificationId = parseInt(`${year}${month}${day}`);
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
                    cordova.plugins.notification.local.cancel(notificationId);
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
    document.getElementById('createShiftModal').classList.remove('hidden');
}

function closeCreateShiftModal() {
    document.getElementById('createShiftModal').classList.add('hidden');
    document.getElementById('shiftName').value = '';
    document.getElementById('shiftAbbreviation').value = '';
    document.getElementById('shiftHours').value = '';
    document.getElementById('shiftColor').value = '#fef3c7';
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
        if (noteData.text) {
            const date = new Date(currentYear, currentMonth, day);
            const dayNames = {
                it: ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
                en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                fr: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
                de: ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'],
                es: ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
            };
            const dayName = dayNames[lang][date.getDay()];
            const timeText = noteData.time ? ` (${noteData.time})` : '';
            notesHtml += `
                <div class="mb-3 pb-3 border-b border-blue-300">
                    <div class="font-bold text-white">${day} ${dayName}${timeText}</div>
                    <div class="text-sm text-white">${noteData.text}</div>
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

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
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
        const cell = document.createElement('div');
        cell.className = 'day-cell';
        if (isCurrentMonth && day === today.getDate()) {
            cell.classList.add('current-day');
            cell.classList.add('today');
        }
        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);
        const shiftKey = `shift_${currentYear}_${currentMonth}_${day}`;
        const shiftNames = loadShift(shiftKey);
        if (shiftNames.length > 0) {
            const shiftsContainer = document.createElement('div');
            shiftsContainer.className = 'shifts-container';
            shiftNames.slice(0, 5).forEach(shiftName => {
                if (shifts[shiftName]) {
                    const shiftBadge = document.createElement('div');
                    shiftBadge.className = `shift-badge shift-count-${shiftNames.length}`;
                    if (shiftNames.length === 1) {
                        shiftBadge.classList.add('single-shift');
                    }
                    shiftBadge.textContent = shifts[shiftName].abbreviation;
                    shiftBadge.title = `${shifts[shiftName].name} (${decimalToTime(shifts[shiftName].hours)})`;
                    shiftBadge.style.backgroundColor = shifts[shiftName].color;
                    shiftsContainer.appendChild(shiftBadge);
                }
            });
            cell.appendChild(shiftsContainer);
        }
        const date = new Date(currentYear, currentMonth, day);
        const isHoliday = holidays.some(h => h.month === currentMonth && h.day === day);
        const isSunday = date.getDay() === 0;
        if (isHoliday || isSunday) {
            cell.classList.add('holiday');
        }
        cell.addEventListener('click', (e) => {
            if (e.target.classList.contains('note-edit-btn')) return;
            if (selectedShift) {
                const currentShifts = loadShift(shiftKey);
                const shiftIndex = currentShifts.indexOf(selectedShift);
                if (shiftIndex === -1) {
                    if (currentShifts.length < 5) {
                        currentShifts.push(selectedShift);
                        saveShift(shiftKey, currentShifts);
                        renderCalendar();
                        updateWorkedHoursAndSummary();
                    } else {
                        alert('alertMaxShifts');
                    }
                } else {
                    currentShifts.splice(shiftIndex, 1);
                    saveShift(shiftKey, currentShifts);
                    renderCalendar();
                    updateWorkedHoursAndSummary();
                }
            }
        });
        const noteKey = `note_${currentYear}_${currentMonth}_${day}`;
        const noteData = loadNote(noteKey);
        if (noteData.text) {
            cell.classList.add('has-note');
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-text';
            noteDiv.textContent = noteData.text;
            if (shiftNames.length < 5) {
                noteDiv.style.display = 'block';
            }
            cell.appendChild(noteDiv);
        }
        const noteEditBtn = document.createElement('div');
        noteEditBtn.className = 'note-edit-btn';
        noteEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
        noteEditBtn.title = translations[lang].editNote;
        noteEditBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openNoteModal(currentYear, currentMonth, day);
        });
        cell.appendChild(noteEditBtn);
        calendar.appendChild(cell);
    }
    const totalCellsNeeded = offset + daysInMonth;
    const rowsNeeded = Math.ceil(totalCellsNeeded / 7);
    const totalCells = rowsNeeded * 7;
    while (calendar.children.length < totalCells) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell';
        calendar.appendChild(emptyCell);
    }
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

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageSelector();
    initializeHamburgerMenu();
    initializeNotifications();
    loadCustomShifts();
    renderShiftSelector();
    renderCalendar();
});
