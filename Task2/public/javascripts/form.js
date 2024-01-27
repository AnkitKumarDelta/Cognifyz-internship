const validateForm=()=>{
    var user=document.querySelector('#username');
    var email=document.querySelector('#exampleInputEmail1');
    var pass=document.querySelector('#exampleInputPassword1');
    if(user.value==='' || email.value==='' || pass.value===''){
        alert('All fields must be filled out');
            return false; // Prevent form submission
    }
    return true;
}