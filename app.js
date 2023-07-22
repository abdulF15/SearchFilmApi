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
    const result = shows[i];
    display.innerHTML += `<div class="col mb-3">
      <div class="card" style="width: 18rem">
      <img src="${result.show.image.medium}" class="card-img-top" alt="${result.show.name}"/>
      <div class="card-body">
      <h5 class="card-title">${result.show.name}</h5>
      <p class="card-text">
        ${result.show.type}
      </p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">
        Details
      </button>  
      <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${result.show.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="${result.show.image.medium}" class="card-img-top" alt="${result.show.name}"/>
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
