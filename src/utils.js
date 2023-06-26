import { redirect } from "react-router-dom"

export async function requireAuth() {
    const isLoggedIn = localStorage.getItem("loggedIn")


    if (!isLoggedIn) {
        redirect("/login?message=You Must Login First") //redirect not working...
    }
    return null
}