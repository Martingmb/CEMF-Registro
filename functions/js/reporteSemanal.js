watchForm();

function handleFetch(searchTerm, callback) {
    let url = `https://dog.ceo/api/breed/${searchTerm}/images/random/4`

    fetch(url).then(Response => {
        if (Response.ok) {
            return Response.json();
        } else {
            throw new Error('Big Yikes');
        }
    }).then(responseJSON => {
        callback(responseJSON);
    }).catch(err => {
        $('.results').html(err.message);
    })

}

function displayResults(data) {
    $('.results').html('');

    for (var i = 0; i < data.message.length; i++) {
        $('.results').append(`
        <div class="dogImage"> <img src="${data.message[i]}" alt="Dog Image"> </div>
        `)
    }
}

function watchForm() {
    $('#reporteSemanalForm').on('submit', (event) => {
        event.preventDefault();
        var asistencia = $('#asistencia').val();
        var biblias = $('#biblia').val();
        var fecha = $('#fecha').val();
        var capLeidos = $('#capitulo').val();
        var ofrenda = $('#ofrenda').val();
        var aseo = $('#aseo').val();
        handleFetch(breed, displayResults);
    })
}