import CryptoJS from "crypto-js";
import { User } from "../types/User";

export const getToken = async (username: string, password: string) => {
    const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_CRYPTO_KEY!).toString();
    const user: User = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: encrypted })
    })
    .then(response => response.json() )
    .then(data => data.value )
    .catch(err => {
        console.log(err);
        alert(err.message);
    });
    window.sessionStorage.setItem('user', user.username);
    window.sessionStorage.setItem('user_email', user.email);
    window.sessionStorage.setItem('token', JSON.stringify(user.token));
}