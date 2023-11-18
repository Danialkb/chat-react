import React, {useState} from 'react';
import './Login.css';
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";
import {useNavigate} from 'react-router-dom';
import {login} from "./Login.service";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            const status = await login(email, password);

            if (status === 200) {
                navigate("/chat");
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-form">
                <h1>Log In</h1>
                <form>
                    <label className="label">Email</label>
                    <MyInput onChange={handleEmail} type="text"/>
                    <label className="label">Password</label>
                    <MyInput onChange={handlePassword} type="password"/>
                    <MyButton onClick={handleSubmit} type="submit">
                        Submit
                    </MyButton>
                </form>

            </div>
        </div>
    )
}
export default Login;