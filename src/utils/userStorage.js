export function saveUserToLocalStorage(newUser){
const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
const updatedUsers = [...existingUsers,newUser];
localStorage.setItem("users",JSON.stringify(updatedUsers));
}

export function getUserFromLocalStorage(){
    return JSON.parse(localStorage.getItem('users')) || [];
}