import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Stats } from "./api/cs";
import * as yup from "yup";

const CSNameScheme = yup.object().shape({
    username: yup.string().trim().required("Required")
});

const About = () => {
    const [data, setData] = useState<Stats | null>(null);

    return (
        <>
            <Formik validationSchema={CSNameScheme} initialValues={{ username: "" }} onSubmit={async (values) => {
                    await fetch('/api/cs', { method: 'POST', body: JSON.stringify({ username: values.username })})
                    .then((response) => response.json())
                    .then((stats) => {
                        setData(stats);
                    });
                }}>
                {({errors}) => (
                    <Form>
                        <Field name="username" type="text" placeholder="Steam account/display name/SteamID" autocomplete="off"/>
                        {errors.username ? (<div>{errors.username}</div>):null}
                    </Form>
                 )};
            </Formik>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
    );
}

export default About;