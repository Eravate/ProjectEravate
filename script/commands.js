// Function to fetch data from the DB

function fetchData() {
    fetch('php/read.php', {
        method: "POST",
    })
        .then(response => response.text())
        .then(data => {
            planets = JSON.parse(data);
        });
}

// Function to fill all the planets with information uppon load

function fillWithPlanet() {
    planetName = planets[numPlanet][1].toLowerCase();
    audio = new Audio('music/'+planetName+'.mp3');
    $("#planet").attr("src","photos/"+planetName+".png");
    $("#planetname").html(planets[numPlanet][1]);
    $("#mass").html(planets[numPlanet][2]);
    $("#radius").html(planets[numPlanet][3]);
    $("#gravity").html(planets[numPlanet][4].toFixed(2));
    $("#temperature").html(planets[numPlanet][5]);
    $("#pressure").html(planets[numPlanet][6]);
    $("#period").html(planets[numPlanet][7]);
    $("#axis").html(planets[numPlanet][8]);
    $("#tilt").html(planets[numPlanet][9]);
    $("#speed").html(planets[numPlanet][10]);
    $("#type").html(planets[numPlanet][11]);
    $("#volcanism").html(planets[numPlanet][12]);
    $("#atmosphere").html(planets[numPlanet][13]);
    $("#atmosphere1").html(planets[numPlanet][14]);
    $("#atmosphere2").html(planets[numPlanet][15]);
    $("#atmosphere3").html(planets[numPlanet][16]);
    $("#composition1").html(planets[numPlanet][17]);
    $("#composition2").html(planets[numPlanet][18]);

}

// Function to wait for Planets to load in
function waitForPlanets(){
    if(typeof planets !== "undefined") {
        fillWithPlanet();
    } else {
        setTimeout(waitForPlanets, 250);
    }
}

// Function to allow the dragging of the console across the screen
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

// Function to clear the console
function clearTextArea() {
  $("#textArea").contents().filter(function(){ return this.nodeType != 1; }).remove();
}

// Function to submit the Log In and check if it's valid
function submitLogin() {
  var type = $('#type_input').val();
  var email = $('#email_input').val();
  var passwd = $('#password_input').val();
  var passwd2;
  if (type == "create") {
    passwd2 = $('#sec_password_input').val();
  }

  if (type == "login" || passwd == passwd2) {
    var formData = new FormData();
    formData.append('type', type);
    formData.append('email', email);
    formData.append('passwd', passwd);
    fetch('php/process.php', {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
  } else {
    if (type == "create") {
      Swal.fire('Passwords Not Matching!','error');
      Swal.fire({
        icon: 'error',
        title: 'Passwords Don\'t Match!',
      })
    }
  }
  
}

function logout() {
  $('#logoutForm').submit();
}

function changeLoginScope(createAcc) {
  var txtLogin = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="login"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label><div class="forgotPass"><a href="#">Forgot password?</a></div></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(false)">Create account</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Login</button></div></div>';
  var txtCreate = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="create"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label></div></div><div class="row"><div class="input-field col s12"><input id="sec_password_input" type="password" class="validate" required="" aria-required="true"><label for="sec_password_input">Repeat Password</label></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(true)">Have an account? Log In</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Login</button></div></div>';
  if (!createAcc) {
    $('#formLogin').html(txtCreate);
  } else {
    $('#formLogin').html(txtLogin);
  }
}