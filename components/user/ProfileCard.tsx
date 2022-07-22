import React, { useState, useEffect } from "react";
import { User } from "../../types/User";
import Cookie from "js-cookie";

const ProfileCard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async (username: string) => {
            const data: User = await fetch(`/api/users/find?username=${username}`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            setUser(data);
        }
        const cookie = Cookie.get("info");
        console.log(cookie);
        
        if (cookie) {
            const info = JSON.parse(cookie);
            fetchUser(info.user);
        }
    }, []);

    return (
        <div className="items-center text-center border rounded w-4/12 shadow-xl">
            <h1 className="font-semibold text-4xl p-5 w-full bg-slate-200 mb-3">Profile</h1>
            <div className="flex flex-col justify-left text-left">
                <h2 className="font-semibold text-xl pl-3">Username</h2>
                <p className="pl-3">{user?.username}</p>
                <h2 className="font-semibold text-xl pl-3 mt-3">Email</h2>
                <p className="pl-3">{user?.email}</p>
            </div>
        </div>
    );
}

export default ProfileCard;