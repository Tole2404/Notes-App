import Notes from "../data/notes.js";

document.addEventListener("DOMContentLoaded", function () {
  const addNotes = document.getElementById("addNotes");
  addNotes.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const createdAt = new Date().toLocaleString();

    const noteElement = document.createElement("note-element");
    noteElement.dataset.title = title;
    noteElement.dataset.body = body;
    noteElement.dataset.createdAt = createdAt;

    const noteItem = document.getElementById("noteItem");
    noteItem.appendChild(noteElement);

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
  });

  class inputNote extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class="form-group form-title">
        <label for="title">Judul:</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div class="form-group form-title">
        <label for="body">Isi Catatan:</label>
        <textarea id="body" name="body" rows="4" cols="50" spellcheck="false" required></textarea>
      </div>
      <div class="form-group">
      <button type="submit" name="Submit" class="btn-submit">SUBMIT</button>
      </div>
    `;
    }
  }
  customElements.define("input-note", inputNote);

  class NoteElement extends HTMLElement {
    connectedCallback() {
      const title = this.dataset.title;
      const body = this.dataset.body;
      const createdAt = this.dataset.createdAt;

      this.innerHTML = `
      <div class="card">
      <div class="title-note">
        <h2>${title}</h2>
      </div>
      <div class="body-note">
        <p>${body}</p>
      </div>
      <div class="date-note">${createdAt}</div>
    </div>
    `;
    }
  }

  customElements.define("note-element", NoteElement);
});

const home = () => {
  const searchFormElement = document.querySelector("#searchForm");
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector(".note-list");
  const notelistElement = noteListElement.querySelector(".listnote");

  // Mendefinisikan fungsi untuk menampilkan semua data

  function displayAllNotes() {
    const allNotes = Notes.getAll();
    displayResult(allNotes);
  }

  const showNotesData = (query) => {
    const result = Notes.searchNote(query);
    if (result.length === 0) {
      displayNotFoundMessage();
    } else {
      displayResult(result);
    }
  };

  const displayNotFoundMessage = () => {
    alert("Catatan Tidak Ditemukan.");
  };

  const displayResult = (notesData) => {
    const noteItems = notesData.map((note) => {
      return `
      <div class="card">
      <div class="title-note">
        <h2>${note.title}</h2>
      </div>
      <div class="body-note">
        <p>${note.body}</p>
      </div>
      <div class="date-note">${note.createdAt}</div>
    </div>
      `;
    });

    notelistElement.innerHTML = noteItems.join("");
  };

  displayAllNotes();

  searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = event.target.elements.name.value.trim();
    if (query !== "") {
      showNotesData(query);
    } else {
      displayAllNotes();
    }
  });
};

export default home;
