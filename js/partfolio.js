const portfolioRow = document.querySelector("#portfolio-row");
const portfolio = document.getElementById("portfolio");
const portfolioImage = document.getElementById("portfolioImage");
const portfolioUrl = document.getElementById("portfolioUrl");
const portfolioForm = document.getElementById("portfolioForm");
const portfolioModal = document.getElementById("portfolio-modal");
const portfolioBtn = document.getElementById("portfolio-add-btn");
const modalOpenBtn = document.getElementById("modal-open-btn");

let selected = null;
let limit = 5;
let page = 1;

const changeNote = () => {
  saveEditBtn.innerHTML = selected ? "Save" : "Add";
};

function getRow({ id, _id, name, url, photo }) {
  return `<tr>
      <th scope="row">${id}</th>
      <td>
        <img width=50px src="${IMAGE_URL}${photo._id}.${
    photo.name.split(".")[1]
  }" alt=${name}/>
      </td>
      <td>
        <a href="${url}">${name}</a>
      </td>
      <td>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#portfolio-modal"
          onclick={editExp('${_id}')}
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger"  onclick={deleteExp('${_id}')}>
          <i class="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  `;
}

function getPortfolios() {
  portfolioRow.innerHTML = `<div class=" spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
  request.get("portfolios").then((res) => {
    portfolioRow.innerHTML = "";
    res.data.data.map((el, i) => {
      portfolioRow.innerHTML += getRow({ id: i + 1, ...el });
    });
  });
}

getPortfolios();

portfolioForm.addEventListener("submit", function (e) {
  e.preventDefault();
  this.classList.add("was-validated");
  let check = this.checkValidity();
  if (check) {
    let form = new FormData();
    form.append("file", portfolioImage.files[0]);
    requestImage.post("upload", form).then((res) => {
      let data = {
        name: portfolio.value,
        url: portfolioUrl.value,
        photo: res.data.data._id,
      };
      request.post("portfolios", data).then(() => {
        bootstrap.Modal.getInstance(portfolioModal).hide();
        getPortfolios();
        alert("Portfolio is added");
      });
    });
  }
});

function deleteExp(_id) {
  let check = confirm("Rostanam o'chirishni xohlaysizmi ?");
  if (check) {
    request.delete(`portfolios/${_id}`).then(() => {
      getPortfolios();
    });
  }
}
