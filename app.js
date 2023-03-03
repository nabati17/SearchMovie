$('.search-button').on('click', function () {
  // menggunakan Jquery
  $.ajax({
    //konek ke api
    url: 'http://www.omdbapi.com/?apikey=e387e64f&s=' + $('.input-keyword').val(),
    // menggunakan callback
    success: (results) => {
      const movies = results.Search;
      let cards = '';
      //lopping
      movies.forEach((m) => {
        cards += showCards(m);
      });
      //jQuery cariakan movi container lalu isi html ganti jadi cards
      $('.movie-container').html(cards);

      //ketika tombol detail di klick
      $('.modal-detail-button').on('click', function () {
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=e387e64f&i=' + $(this).data('imdbid'),
          success: (m) => {
            const movieDetail = showMovieDetail(m);
            $('.modal-body').html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCards(m) {
  return ` <div class="col-md-4 my-3">
        <div class="card">
        <img
          src="${m.Poster}"
          class="card-img-top"
        />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a
            href="#"
            class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}"
            >Show details</a
          >
        </div>
      </div>
    </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid" alt="">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></h4></li>
                <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${m.Actors}/li>
                <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
              </ul>
        </div>
    </div>
</div>`;
}
