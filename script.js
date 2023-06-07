const input = document.getElementById("numInput");
const divWrapper = document.querySelector("#postWrapper");
const commentsDiv = document.querySelector("#commentsDiv");
const title = document.querySelector("#postTitle");
const content = document.querySelector("#postContent");
const submitButtn = document.getElementById("submitButtn");
const showComButtn = document.getElementById("showComButtn");
const form = document.getElementById("idForm");

showComButtn.style.display = "none";
commentsDiv.setAttribute("class", "commentsDiv");

async function fetchComments(count) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${count}/comments`);
    const commentsArray = await response.json();
    
    commentsArray.forEach(elem => {
      let commentDiv = document.createElement("div");
      commentsDiv.appendChild(commentDiv);

      let commentName = document.createElement("h3");
      commentName.textContent = `NAME: ${elem.name}`;
      commentName.setAttribute("class", "comments");
      commentDiv.appendChild(commentName);

      let commentEmail = document.createElement("h4");
      commentEmail.textContent = `E-MAIL: ${elem.email}`;
      commentEmail.setAttribute("class", "comments");
      commentDiv.appendChild(commentEmail);

      let commentBody = document.createElement("p");
      commentBody.textContent =`COMMENT: ${elem.body}`;
      commentBody.setAttribute("class", "comments");
      commentDiv.appendChild(commentBody);
    });
    
  } catch (err) {
    console.error(err);
  }
} 

async function fetchPost(i) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${i}`
    );
    const post = await response.json();
    title.textContent = post.title;
    content.textContent = post.body;
    showComButtn.style.display = "block";

  } catch (err) {
    console.error(err);
  }
}

function cleanDiv() {
  while (commentsDiv.hasChildNodes()) {
    commentsDiv.removeChild(commentsDiv.lastChild);
  }
}

submitButtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value >= 1 && input.value <= 100) {
    fetchPost(input.value);
    cleanDiv();
  } else {
    alert("This id doesn't exist!");
    title.textContent = "";
    content.textContent = "";
    showComButtn.style.display = "none";
    form.reset();
    cleanDiv();
  }
});

showComButtn.addEventListener("click", () => {
  fetchComments(input.value);
  showComButtn.style.display = "none";
});