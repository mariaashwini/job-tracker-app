export function isLoggedIn(){
    return !!localStorage.getItem("loggedInUser");
}