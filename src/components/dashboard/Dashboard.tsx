import React, { ReactElement, useState } from "react";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { User } from "../../models/User";
import Application from "../application/Application";
import "./Dashboard.css";
interface DashboardProps {
    personalProfile: User,
    setPersonalProfile: React.Dispatch<React.SetStateAction<User>>,
    professionalProfile: ProfessionalProfile,
    setProfessionalProfile: React.Dispatch<React.SetStateAction<ProfessionalProfile>>,
    privacy: PrivacyProfile,
    setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>
    setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>
};

function Dashboard(props: DashboardProps): ReactElement {
    const [flag, setFlag] = useState<boolean>(false);
    async function logout(): Promise<void> {
        await fetch("https://include-type.herokuapp.com/api/user/logout", {
            method: "POST",
            credentials: "include"
        });
        // console.log(`${props.user.firstName} logged out successfully.`);
        props.setPersonalProfile({
            id: "",
            firstName: "",
            lastName: "",
            bio: "",
            username: "",
            email: "",
            password: "",
            address: "",
            country: "",
            city: "",
            state: "",
            pincode: "",
            contact: "",
            picture: ""
        });
        props.setLoginComplete(false);
    }

    return (
        <div>
            {flag === false ? (
                <div className="login_page dashboard">
                    <h1>Welcome {props.personalProfile!.firstName} {props.personalProfile!.lastName}! 😃</h1>
                    <p>Username : {props.personalProfile!.username}</p>
                    <p>Email    : {props.personalProfile!.email}</p>
                    <button className="registration_buttons" onClick={logout}>Log Out</button>
                    <button className="registration_buttons" onClick={() => setFlag(true)}>Go To Application</button>
                </div>
            ) : (
                <Application
                    personalProfile={props.personalProfile}
                    setPersonalProfile={props.setPersonalProfile}
                    professionalProfile={props.professionalProfile}
                    setProfessionalProfile={props.setProfessionalProfile}
                    privacy={props.privacy}
                    setPrivacy={props.setPrivacy}
                />
            )}
        </div>
    );
}

export default Dashboard;