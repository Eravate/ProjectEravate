// Function to fetch data from the DB

function fetchData() {
    var formData = new FormData();
    formData.append('solar', solar);
    fetch('php/read.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            objects = JSON.parse(data);
        });
}

// Function to fill all the objects with information uppon load

function fillWithPlanet() {
    var threed;
    /*planetName = objects[numObject][1].toLowerCase();
    audio = new Audio('music/'+planetName+'.mp3');
    $("#object").attr("src","photos/"+planetName+".png");
    $("#planetname").html(objects[numObject][1]);
    $("#mass").html(objects[numObject][2]);
    $("#radius").html(objects[numObject][3]);
    $("#gravity").html(objects[numObject][4].toFixed(2));
    $("#temperature").html(objects[numObject][5]);
    $("#pressure").html(objects[numObject][6]);
    $("#period").html(objects[numObject][7]);
    $("#axis").html(objects[numObject][8]);
    $("#tilt").html(objects[numObject][9]);
    $("#speed").html(objects[numObject][10]);
    $("#type").html(objects[numObject][11]);
    $("#volcanism").html(objects[numObject][12]);
    $("#atmosphere").html(objects[numObject][13]);
    $("#atmosphere1").html(objects[numObject][14]);
    $("#atmosphere2").html(objects[numObject][15]);
    $("#atmosphere3").html(objects[numObject][16]);
    $("#composition1").html(objects[numObject][17]);
    $("#composition2").html(objects[numObject][18]);*/
    $("#solarsystem").html(objects[0][1].toUpperCase());
    if (Array.isArray(objects[numObject][0])) {
      $("#name").html(objects[numObject][numSat][1].toUpperCase());
      $("#txt").html(objects[numObject][numSat][6]);
      $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][0][8]+'\'>'+objects[numObject][numSat][7]+'</a>');
      $("#rottime").html(objects[numObject][numSat][2]+'&nbsp;DAYS');
      $("#revtime").html(objects[numObject][numSat][3]+'&nbsp;DAYS');
      $("#radius").html(objects[numObject][numSat][4]+'&nbsp;KM');
      $("#temp").html(objects[numObject][numSat][5]+'&nbsp;ºC');

      threed = objects[numObject][numSat][15];
      // Switch for loading 3D Planet
      switch (threed) {
        // If the object doesn't have a 3D Texture, load the ? texture
        case 0:
          execute3d("unknown");
          break;
        case 1:
          execute3d(objects[numObject][numSat][1].toLowerCase());
          break;
        default:
          execute3d(threed);
          break;
      }
    } else {
      $("#name").html(objects[numObject][1].toUpperCase());
      $("#txt").html(objects[numObject][6]);
      $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][8]+'\'>'+objects[numObject][7]+'</a>');
      $("#rottime").html(objects[numObject][2]+'&nbsp;DAYS');
      $("#revtime").html(objects[numObject][3]+'&nbsp;DAYS');
      $("#radius").html(objects[numObject][4]+'&nbsp;KM');
      $("#temp").html(objects[numObject][5]+'&nbsp;ºC');

      threed = objects[numObject][15];
      // Switch for loading 3D Planet
      switch (threed) {
        // If the object doesn't have a 3D Texture, load the ? texture
        case 0:
          execute3d("unknown");
          break;
        case 1:
          execute3d(objects[numObject][1].toLowerCase());
          break;
        default:
          execute3d(threed);
          break;
      }
    }
    
    checkForArrows();

    
}

// Function to wait for objects to load in

function waitForObjects(){
    if(typeof objects !== "undefined") {
        fillWithPlanet();
    } else {
        setTimeout(waitForObjects, 250);
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

/* Function to clear the console OBSOLETE

function clearTextArea() {
  $("#textArea").contents().filter(function(){ return this.nodeType != 1; }).remove();
}*/

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
        result = JSON.parse(data);
        switch(result) {
          // I've set up two different success cases and 2 different error cases for more specific alerts
          // sucl means the client has succesfully logged into his account
          // succ, on the other hand, means the client has succesfully registered his account, and is now allow to log in
          // err1 is the error that we get when a client is trying to register, but has already created an account with that email address
          // err2 is the error we get when the client is trying to log-in, but either the email address or the password are not correct
          case "sucl":
              window.location.href = "index.php";
            break;
          case "succ":
            Swal.fire({
              icon: 'success',
              title: 'The Account Has Been Created Succesfully, You Can Now Log In!',
            })
            changeLoginScope(true);
            break;
          case "err1":
            Swal.fire({
              icon: 'error',
              title: 'An Accout With This Email Already Exists!',
            })
            break;
          case "err2":
            Swal.fire({
              icon: 'error',
              title: 'The Email And The Password Do Not Correspond To Any Account!',
            })
            break;
        }
      });
  } else {
    if (type == "create") {
      // This alert is pretty self-explanatory, it's when the client has typed two different passwords when creating his account
      Swal.fire('Passwords Not Matching!','error');
      Swal.fire({
        icon: 'error',
        title: 'Passwords Don\'t Match!',
      })
    }
  }
  
}

// Function to log-out, pretty self-explanatory

function logout() {
  $('#logoutForm').submit();
}

// Function to change between Log-in and Register

function changeLoginScope(createAcc) {
  var txtLogin = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="login"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label><div class="forgotPass"><a href="#">Forgot password?</a></div></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(false)">Create account</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Login</button></div></div>';
  var txtCreate = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="create"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label></div></div><div class="row"><div class="input-field col s12"><input id="sec_password_input" type="password" class="validate" required="" aria-required="true"><label for="sec_password_input">Repeat Password</label></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(true)">Have an account? Log In</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Create</button></div></div>';
  if (!createAcc) {
    $('#formLogin').html(txtCreate);
  } else {
    $('#formLogin').html(txtLogin);
  }
}

// Function to go full-screen with the press of a button

function gofullscreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
  } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      }
  }
}

// Function used previously to retract the left-content table, unused now

/**
function retractInfoLeft() {
  $('#contentLeft').slideToggle(1000);
}
*/