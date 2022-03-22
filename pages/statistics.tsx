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

const Statistics = () => {
    const [data, setData] = useState<Stats | null>(null);
    const initialValues:FormValues = {username: ""};

    return (
        <div className="flex flex-col justify-center items-center">
            <Formik validationSchema={CSNameScheme} initialValues={initialValues} onSubmit={async (values, actions) => {
                    const rawData = await fetch('/api/cs', { method: 'POST', body: JSON.stringify({ username: values.username })});
                    const cleanData:Stats = await rawData.json();
                    setData(cleanData);
                    actions.setSubmitting(false);
                    
                    await fetch('/api/mongo', {
                        method: 'POST',
                        body: JSON.stringify({username: values.username, data:cleanData, timestamp:Date.now()})
                    })
                    .then((response) => {console.log(response.status);})
                    .catch((error) => {console.log(error);});
                }}>
                    <Form className="flex flex-col justify-center items-center">
                        <label className="font-semibold" htmlFor="username">Steam Account or Display Name</label>
                        <Field className="border-2" id="username" name="username" type="text" placeholder="Steam account/display name/SteamID" autoComplete="off"/>
                        <button className="border-2 w-auto p-1 rounded-md m-1 font-semibold" type='submit'>Fetch Stats</button>
                    </Form>
            </Formik>
            <div>
                {data && (<pre>{JSON.stringify(data, null, 2)}</pre>)}
            </div>
        </div>
    );
};

export default Statistics;