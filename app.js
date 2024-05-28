const form = document.querySelector("#search-form");
const submit = document.querySelector("#submit");
const display = document.querySelector("#card-container");
const modal = document.querySelector("#modal");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const input = document.querySelector("#input-search").value;

  const config = {
    params: { q: input },
  };
  const res = await axios.get("https://api.tvmaze.com/search/shows", config);

  display.innerHTML = "";

  cardFilm(res.data);
  document.querySelector("#input-search").value = "";
});

const cardFilm = (shows) => {
  for (let i = 0; i < shows.length; i++) {
    const result = shows[i].show;
    const imageUrl = result.image ? result.image.medium : 'default-image-url'; // Handle if image is null
    display.innerHTML += `<div class="col mb-3">
      <div class="card" style="width: 18rem">
        <img src="${imageUrl}" class="card-img-top" alt="${result.name}"/>
        <div class="card-body">
          <h5 class="card-title">${result.name}</h5>
          <p class="card-text">
            ${result.type}
          </p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">
            Details
          </button>  
          <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">${result.name}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <img src="${imageUrl}" class="card-img-top" alt="${result.name}"/>
                  <p><strong>Genre:</strong> ${result.genres.join(', ')}</p>
                  <p><strong>Language:</strong> ${result.language}</p>
                  <p><strong>Premiered:</strong> ${result.premiered}</p>
                  <p><strong>Rating:</strong> ${result.rating.average ? result.rating.average : 'N/A'}</p>
                  <p><strong>Summary:</strong> ${result.summary ? result.summary.replace(/<[^>]*>?/gm, '') : 'No summary available.'}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>`;
  }
};
