 
 function swapValues() {
      let fromInput = document.getElementById("from");
      let toInput = document.getElementById("to");

      // Swapping values
      let temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;

    }


 (function () {
    const user = localStorage.getItem('username');

    const loginLink = document.getElementById('loginLink');
    const userBtn = document.getElementById('userBtn');

    if (user && user.trim() !== '') {
      // hide login and show username
      loginLink.style.display = 'none';
      userBtn.style.display = 'inline-block';
      // show first name (or full username) and a little icon
      userBtn.innerHTML = '<i class="fa-solid fa-user"></i> ' + user;
      // optional: add title attribute
      userBtn.title = 'View profile';
    } else {
      // no user: show login, hide username
      loginLink.style.display = 'inline-block';
      userBtn.style.display = 'none';
    }
  })();
