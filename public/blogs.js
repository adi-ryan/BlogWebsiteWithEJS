const deleteButton = document.querySelectorAll("a.delete");

for (let i=0;i<deleteButton.length;i++)
{
  deleteButton[i].addEventListener("click", (e) => 
    {
      const delLink = deleteButton[i].getAttribute("blog-id-link");
      fetch(delLink, {
        method: "DELETE"}).then( (res) => {
          res.json().then((data) => window.location.href = data.redirect);
          console.log(response.redirect);
        }).catch(err => console.log(err));
    });
};