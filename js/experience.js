const workName = document.getElementById("workName");
const companyName = document.getElementById("companyName");
const expDesc = document.getElementById("expDesc");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const expForm = document.getElementById("experience-form");
const expRow = document.getElementById("experiences-row");
const saveEditBtn = document.getElementById("save-edit");
const addBtn = document.getElementById("addBtn");
const pagination = document.querySelector(".pagination");

let selected = null;
let limit = 5;
let page = 1;

const changeNote = () => {
  saveEditBtn.innerHTML = selected ? "Save" : "Add";
};

const getRow = ({
  id,
  _id,
  work_name,
  company_name,
  description,
  start_date,
  end_date,
}) => {
  return `
    <th scope="row">${id}</th>
    <td>${work_name}</td>
    <td>${company_name}</td>
    <td>${description}</td>
    <td>${start_date.split("T")[0]}</td>
    <td>${end_date.split("T")[0]}</td>
    <td>
      <button 
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#experience-modal"
        onclick={editExp('${_id}')}
      >
        <i class="bi bi-pencil-square"></i></td>
      </button>
    <td>
      <button class="btn btn-danger" onclick={deleteExp('${_id}')}>
        <i class="bi bi-trash3"></i>
      </button>
    </td>
  `;
};

addBtn.addEventListener("click", () => {
  selected = null;
  workName.value = "";
  companyName.value = "";
  expDesc.value = "";
  startDate.value = "";
  endDate.value = "";
  changeNote();
});

function getExperiences() {
  expRow.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
  request.get(`experiences?page=${page}&limit=${limit}`).then((res) => {
    expRow.innerHTML = "";
    res.data.data.map((el, i) => {
      expRow.innerHTML += getRow({ id: i + 1, ...el });
    });
    let pages_number = Math.ceil(
      res.data.pagination.total / res.data.pagination.limit
    );
    let pages = "";
    for (let i = 1; i <= pages_number; i++) {
      pages += `<li class="page-item"><a class="page-link ${
        page === i ? "active" : ""
      }" href="#" onclick="{changePage(${i})}">${i}</a></li>`;
    }
    pagination.innerHTML = `
      <li class="page-item"><a class="page-link ${
        page === 1 ? "disabled" : ""
      }" href="#" onclick="{changePage('prev')}">Previous</a></li>
      ${pages}
      <li class="page-item"><a class="page-link ${
        pages_number === page ? "disabled" : ""
      }" href="#" onclick="{changePage('next')}">Next</a></li>
    `;
  });
}

getExperiences();

expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    work_name: workName.value,
    company_name: companyName.value,
    description: expDesc.value,
    start_date: startDate.value,
    end_date: endDate.value,
  };
  if (selected) {
    request.put(`experiences/${selected}`, data).then((res) => {
      getExperiences();
    });
  } else {
    request.post("experiences", data).then((res) => {
      getExperiences();
    });
  }
});

function deleteExp(id) {
  console.log(id);
  request.delete(`experiences/${id}`).then(() => {
    getExperiences();
  });
}

function editExp(id) {
  selected = id;
  changeNote();
  request.get(`experiences/${id}`).then((res) => {
    let data = res.data.data;
    workName.value = data.work_name;
    companyName.value = data.company_name;
    expDesc.value = data.description;
    startDate.value = data.start_date.split("T")[0];
    endDate.value = data.end_date.split("T")[0];
  });
}

function changePage(value) {
  if (value === "next") {
    page++;
  } else if (value === "prev") {
    page--;
  } else {
    page = value;
  }
  getExperiences();
}
