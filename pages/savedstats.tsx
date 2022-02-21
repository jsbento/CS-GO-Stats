import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Stats } from "./api/cs";
import * as yup from "yup";

interface FormValues {
    username: string;
}

const CSNameScheme = yup.object().shape({
    username: yup.string().trim().required("Required")
});

const SavedStats = () => {
    const [data, setData] = useState<Stats | null>(null);
    //const [username, setUsername] = useState<string | null>("");
    const initialValues:FormValues = {username: ""};

    return (
        <>
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
                    .then((stats) => {setData(stats);})
                    .catch((error) => {console.log(error);});
                }}>
                    <Form>
                        <label htmlFor="username">Username</label>
                        <Field id="username" name="username" type="text" placeholder="Steam account/display name/SteamID" autoComplete="off"/>
                        <button type='submit'>Submit</button>
                    </Form>
            </Formik>
            {data && (<pre>{JSON.stringify(data, null, 2)}</pre>)}
        </>
    );
};

export default SavedStats;