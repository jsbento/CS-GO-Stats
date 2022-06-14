import React from "react";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { User } from "../../types/User";
import { FormValues } from "../../types/Form";
import { getToken } from "../../utils/Tokens";

const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpScheme = Yup.object().shape({
    username: Yup.string().trim().required("Username is required"),
    email: Yup.string().trim().required("Email is required").email("Email is invalid"),
    password: Yup.string().trim().required("Password is required").matches(/[a-zA-Z0-9!@#$%^&*]/),
    confirmPassword: Yup.string().trim().required("Confirm password is required").oneOf([Yup.ref("password")], "Passwords must match")
});

const SignUpCard: React.FC = () => {
    const [exists, setExists] = React.useState<boolean>(false);

    const checkExists = async (username: string) => {
        await fetch(`/api/users/find?username=${username}`, { method: "GET" })
        .then(res => {
            if (res.status === 200)
                setExists(true);
            else
                setExists(false);
        })
    }

    const createUser = async (values: FormValues) => {
        const { username, email, password } = values;
        const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_CRYPTO_KEY!).toString();
        const user: User = { username, email: email!, password: encrypted };
        await fetch('/api/users/create', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            alert("Error while creating user");
        });
    }

    return (
        <div id="sign-up-card" className="card flex flex-col items-center">
            <Formik validationSchema={SignUpScheme}
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, actions) => {
                    setExists(false);
                    await checkExists(values.username);
                    if (exists)
                        actions.setSubmitting(false);
                    else {
                        await createUser(values);
                        await getToken(values.username, values.password);
                        actions.setSubmitting(false);
                        window.location.href="/dashboard";
                    }
                }}
            >
                { ({ errors, isSubmitting }) => (
                    <>
                    <h2 className="font-bold p-2">Sign Up</h2>
                        <Form className="flex flex-col items-center justify-center mx-auto my-auto w-fit">
                            <label id="form-elt" htmlFor="username">Username</label>
                            <Field id="username" name="username" type="text" placeholder="Username" autoComplete="off"/>
                            <label id="form-elt" htmlFor="email">Email</label>
                            <Field id="email" name="email" type="text" placeholder="Email" autoComplete="off"/>
                            <label id="form-elt" htmlFor="password">Password</label>
                            <Field id="password" name="password" type="password" placeholder="Password" autoComplete="off"/>
                            <label id="form-elt" htmlFor="conf_pass">Confirm Password</label>
                            <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" autoComplete="off"/>
                            <button className="border-2 w-auto p-1 rounded-md m-2 font-semibold" type="submit">Sign Up</button>
                            {errors.username ? <div className="text-red-600">{ errors.username }</div> : null}
                            {errors.email ? <div className="text-red-600">{ errors.email }</div> : null}
                            {errors.password ? <div className="text-red-600">{ errors.password }</div> : null}
                            {errors.confirmPassword ? <div className="text-red-600">{ errors.confirmPassword }</div> : null}
                            {isSubmitting ? (<div className="animate-pulse font-semibold text-lg">Loading...</div>) : null}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default SignUpCard;