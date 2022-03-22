import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Stats } from "./api/cs";
import * as yup from "yup";
import StatsCard from "../components/StatsCard";

interface FormValues {
    username: string;
}

export interface ServerData {
    _id: number | null,
    username: string | null,
    data: Stats,
    timestamp: number | null
}

const CSNameScheme = yup.object().shape({
    username: yup.string().trim().required("Required")
});

const SavedStats = () => {
    const [data, setData] = useState<ServerData[] | null>(null);
    const initialValues:FormValues = {username: ""};

    return (
        <div className="flex flex-col justify-center items-center">
            <Formik validationSchema={CSNameScheme} initialValues={initialValues} onSubmit={async (values, actions) => {
                    actions.setSubmitting(false);
                    
                    await fetch(`/api/mongo?username=${values.username}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type':'application/json'
                        }
                    })
                    .then(async (response) => {
                        return await response.json();
                    })
                    .then((stats) => {
                        console.log(stats);
                        setData(stats);
                    })
                    .catch((error) => {console.log(error);});
                }}>
                    <Form className="flex flex-col justify-center items-center">
                        <label className="font-semibold" htmlFor="username">Steam Account or Display Name</label>
                        <Field className="border-2" id="username" name="username" type="text" placeholder="Steam account/display name/SteamID" autoComplete="off"/>
                        <button className="border-2 w-auto p-1 rounded-md m-1 font-semibold" type='submit'>Fetch Stats</button>
                    </Form>
            </Formik>
            <div className="flex gap-3">
                {data && data.length > 0 ? data.map(d => <StatsCard {...d}/>) : <p>No data to fetch!</p>}
            </div>
        </div>
    );
};

export default SavedStats;