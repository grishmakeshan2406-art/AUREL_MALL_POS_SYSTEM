document.getElementById("customerlogin").addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "customer@gmail.com" && password === "1020304050"){

        alert("Login Successful!");

        window.location.href = "customer.html";

    }

    else{

        alert("Invalid Email or Password");

    }

});