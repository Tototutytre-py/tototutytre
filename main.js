document.addEventListener('DOMContentLoaded', () => {
    const cronograma = document.getElementById('cronograma');
    const yearTitle = document.getElementById('year-title');
    const prevYearButton = document.getElementById('prev-year');
    const nextYearButton = document.getElementById('next-year');
    const currentYear = new Date().getFullYear();
    let displayedYear = 2024;

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const countries = ['Colombia', 'El Salvador', 'Guatemala', 'México'];

    // Eventos que se mostraran en los cuadros del cronograma
    const events = [
        { name: 'Evento 1', date: '2024-01-15', location: 'Bogotá', country: 'Colombia' },
        { name: 'Evento 2', date: '2024-02-20', location: 'San Salvador', country: 'El Salvador' },
        { name: 'Evento 3', date: '2024-03-10', location: 'Ciudad de Guatemala', country: 'Guatemala' },
        { name: 'Evento 4', date: '2024-04-25', location: 'Ciudad de México', country: 'México' },
        { name: 'Evento 5', date: '2024-05-14', location: 'Medellín', country: 'Colombia' },
        { name: 'Evento 6', date: '2024-06-18', location: 'Santa Ana', country: 'El Salvador' },
        { name: 'Evento 7', date: '2024-07-22', location: 'Quetzaltenango', country: 'Guatemala' },
        { name: 'Evento 8', date: '2024-08-05', location: 'Guadalajara', country: 'México' },
        { name: 'Evento 9', date: '2024-09-10', location: 'Cali', country: 'Colombia' },
        { name: 'Evento 10', date: '2024-10-30', location: 'San Miguel', country: 'El Salvador' },
        { name: 'Evento 11', date: '2024-11-21', location: 'Escuintla', country: 'Guatemala' },
        { name: 'Evento 12', date: '2024-12-05', location: 'Monterrey', country: 'México' },
    ];

    const fetchEvents = (year) => {
        // Filtrar eventos para el año especificado
        return events.filter(event => new Date(event.date).getFullYear() === year);
    };

    const generateTable = (year) => {
        const yearEvents = fetchEvents(year);
        cronograma.innerHTML = '';
        yearTitle.textContent = year;

        // Generar fila de encabezado con los meses
        const headerRow = cronograma.insertRow();
        const th = document.createElement('th');
        th.textContent = 'Países';
        headerRow.appendChild(th);
        months.forEach(month => {
            const th = document.createElement('th');
            th.textContent = month;
            headerRow.appendChild(th);
        });

        // Generar filas para cada país
        countries.forEach(country => {
            const row = cronograma.insertRow();
            const countryCell = row.insertCell();
            countryCell.textContent = country;

            months.forEach((month, index) => {
                const cell = row.insertCell();
                const monthEvents = yearEvents.filter(event => new Date(event.date).getMonth() === index && event.country === country);
                if (monthEvents.length > 0) {
                    monthEvents.forEach(event => {
                        const eventDiv = document.createElement('div');
                        eventDiv.textContent = `${event.location} (${event.date})`;
                        eventDiv.addEventListener('click', () => {
                            window.location.href = `/eventos/${year}/${index + 1}`;
                        });
                        cell.appendChild(eventDiv);
                    });
                } else {
                    cell.textContent = "";
                }
            });
        });
    };

    const updateButtons = () => {
        prevYearButton.disabled = displayedYear <= currentYear;
        nextYearButton.disabled = displayedYear >= currentYear + 2;
    };

    prevYearButton.addEventListener('click', () => {
        if (displayedYear > currentYear) {
            displayedYear--;
            generateTable(displayedYear);
            updateButtons();
        }
    });

    nextYearButton.addEventListener('click', () => {
        if (displayedYear < currentYear + 2) {
            displayedYear++;
            generateTable(displayedYear);
            updateButtons();
        }
    });

    generateTable(displayedYear);
    updateButtons();
});
