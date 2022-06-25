import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { User } from "../types/User";

export const DAYS_IN_MS = 86400000;

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

    const cookie = {
        user: user.username,
        token: user.token
    }

    Cookies.set("info", JSON.stringify(cookie), { expires: new Date(Date.now() + (DAYS_IN_MS * 3)) });
}