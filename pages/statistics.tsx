import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Stats } from "./api/cs";
import * as yup from "yup";
import StatsCard from "../components/StatsCard";
import { NextPage } from "next";

interface FormValues {
    username: string;
}

export interface ServerData {
    _id: number | null,
    username: string | null,
    data: Stats,
    timestamp: string | number
}

const CSNameScheme = yup.object().shape({
    username: yup.string().trim().required("Steam profile name required")
});

const Statistics: NextPage = () => {
    const [dataErr, setDataErr] = useState<boolean>(false);
    const [dataArr, setDataArr] = useState<ServerData[] | null>(null);
    const initialValues:FormValues = {username: ""};

    const getAPIData = async (username: string) => {
        return await fetch('/api/cs', {
            method: 'POST',
            body: JSON.stringify({username: username})
        })
        .then(response => {
            if(response.status === 500)
                return null;
            else
                return response.json();
        });
    };

    const postData = async (username: string, data: Stats, timestamp: number) => {
        await fetch('/api/mongo', {
            method: 'POST',
            body: JSON.stringify({username: username, data: data, timestamp: timestamp})
        })
        .then(response => {console.log(response.status);})
        .catch(error => {console.log(error);});
    };

    const fetchData = async (username: string) => {
        await fetch(`/api/mongo?username=${username}`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        })
        .then(async response => {return await response.json();})
        .then(stats => {setDataArr(stats.reverse());})
        .catch(error => {console.log(error);});
    };

    /*
    When users implemented

    if(loggedIn)
        return form
    else
        return "please log in"
    */

    return (
        <div className="flex flex-col items-center">
            <Formik validationSchema={CSNameScheme} initialValues={initialValues} onSubmit={async (values, actions) => {
                    setDataArr(null);
                    const data = await getAPIData(values.username);
                    if(data != null)
                    {
                        postData(values.username, data, Date.now());
                        fetchData(values.username);
                        setDataErr(false);
                    }
                    else
                        setDataErr(true);
                    actions.setSubmitting(false);
                }}>
                    {({errors, isSubmitting}) => (
                        <Form className="flex flex-col justify-center items-center">
                            <label className="font-semibold" htmlFor="username">Steam Account Name</label>
                            <Field className="border-2" id="username" name="username" type="text" placeholder="Steam account name" autoComplete="off"/>
                            <button className="border-2 w-auto p-1 rounded-md m-1 font-semibold" type='submit'>Fetch Stats</button>
                            {errors.username ? (<div className="text-red-600 text-lg">{errors.username}</div>) : null}
                            {isSubmitting ? (<div className="animate-pulse font-semibold text-lg">Loading...</div>) : null}
                        </Form>
                    )}
            </Formik>
            {dataErr ? <p className="text-center">Error fetching data. Please use Steam account name.</p> : null}
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dataArr && dataArr.length > 0 ? dataArr.slice(0, 4).map(data => <StatsCard {...data}/>) : null}
            </div>
        </div>
    );
};

export default Statistics;