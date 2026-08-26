document.getElementById("shopownerlogin").addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "shopowner@gmail.com" && password === "1020304050"){

        alert("Login Successful!");

        window.location.href = "shopowner.html";

    }

    else{

        alert("Invalid Email or Password");

    }

});