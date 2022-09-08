// ------------------------------------------------------------------------------
// Onderstaande functie is voor het (dynamisch) aanmaken van een Combobox.
// De options worden gevuld vanuit een array die in de parameters is meegegeven.
// ------------------------------------------------------------------------------

function createComboboxFromArray(params)
{
    const select = document.createElement('select');
    const label  = document.createElement('label');
    const parent = params.parent;
    const options = params.options;

    label.for       = params.label.for;
    label.innerHTML = params.label.innerHTML;

    select.name     = params.name;
    select.id       = params.id;
    select.addEventListener('change', function(event) {
        console.log(event.target.value);
    });

    console.log(params.options);

    for(let i=0; i<params.options.length; i++)
    {
        const option = document.createElement('option');
        option.value = options[i];
        option.innerHTML = options[i];
        select.append(option);
    }

    parent.append(label);
    parent.append(select);
}

createComboboxFromArray( {name:'waardering',
                          id:'waardering',
                          parent:document.getElementById('dynamische_combo'),
                          options:['-', 'G', 'PG', 'PG-13', 'R', 'NC-17', 'NOT RATED', 'UNRATED'],
                          label:{for:'waardering', innerHTML:'Kies waardering:'}} );

// ------------------------------------------------------------------------------
// Onderstaande functie is voor het (dynamisch) aanmaken van een Combobox.
// De options worden gevuld vanuit een (extern) JSON-bestand.
// De data uit dit JSON-bestand kan natuurlijk ook door een database worden verstrekt. 
// ------------------------------------------------------------------------------

function createComboboxFromJSON(params)
{
    const select = document.createElement('select');
    const label  = document.createElement('label');
    const parent = params.parent;
    const options = params.options;

    label.for       = params.label.for;
    label.innerHTML = params.label.innerHTML;

    select.name     = params.name;
    select.id       = params.id;
    select.addEventListener('change', function(event) {
        console.log(event.target.value);
    });

    fetch('/src/assets/json/movies.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const options = data.options;
        for(let i=0; i<options.length; i++) 
        {
            const option = document.createElement('option');
            option.value = options[i];
            option.innerText = options[i];
            select.append(option);
        }
      })



    parent.append(label);
    parent.append(select);
}

createComboboxFromJSON( {name:'film',
                         id:'film',
                         parent:document.getElementById('dynamische_combo_json'),
                         json:'movies.json',
                         label:{for:'film', innerHTML:'Kies film:'}} );