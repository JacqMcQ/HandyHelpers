import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className='container my-1'>
            <Link to='/signup'>Signup</Link>

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='flex-row space-between my-2'>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>
            <div className='flex-row space-between my-2'>
                <label>Password:</label>
                <input
                    placeholder='******'
                    type='password'
                    name='password'
                    id='pwd'
                    onChange={handleChange}
                />
            </div>
            {error ? (
                <div>
                    <p className='error-text'>Email or Password incorrect</p>
                </div>
            ) : null}
            <div className='flex-row flex-end'>
                <button type='submit'>Submit</button>
            </div>
            </form>
        </div>
    );
}

export default Login;
