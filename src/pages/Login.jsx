import React, {useState} from "react"
import { useLoaderData, 
    // useNavigate, 
    Form, 
    redirect, 
    useActionData,
    useNavigation } from "react-router-dom"
import { loginUser } from "../api";

export function loader( {request}){
    return new URL(request.url).searchParams.get("message") //revise this again on mdn
}
export async function action( {request} ){
    const formData= await request.formData()
    const email= formData.get("email")
    const password= formData.get("password")
    try{
        const data= await loginUser( {email, password} )
        localStorage.setItem("loggedIn", true)
        redirect("/host")
        return null
    }
    catch(err){
        return err.message
    }
}

const Login = () => {
    const message= useLoaderData();
    const errorMessage = useActionData()
    const navigation = useNavigation()
    // console.log(errorMessage)
    // const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    // const [status, setStatus]= useState("idle")
    // const [error, setError]= useState(null)
    // const navigate= useNavigate()

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     setStatus("Submitting")
    //     // setError(null)
    //     loginUser(loginFormData)
    //         .then(data => navigate("/host", {replace: true}))
    //     .catch(err => setError(err))
    //     .finally(() => setStatus("idle"))
    //     // setError(null)
    // }

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setLoginFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

return (
    <div className="login-container">
        <h1>Sign in to your account</h1>
        {errorMessage && <h3 className="red">{errorMessage}</h3>}
        {message && <h3 className="red">{message}</h3>}

        <Form method="post" className="login-form" replace>
            <input
                name="email"
                type="email"
                placeholder="Email address"
                // onChange={handleChange}
                // value={loginFormData.email}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                // onChange={handleChange}
                // value={loginFormData.password}
            />
            <button disabled= {navigation.state === "submitting"}>
                {navigation.state === "submitting" ? "Logging in..." 
                : "Log in"
                }
            </button>
        </Form>
    </div>
    )
}

export default Login