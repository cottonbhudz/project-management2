import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Auth } from "aws-amplify"; // Assuming AWS Amplify for Cognito authentication

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    username: "",
    email: "",
    teamName: "",
    roleName: "",
  });

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserSettings = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const { username, attributes } = user;

        // Assuming the attributes contain email, you can adjust this based on your setup
        const userData = {
          username,
          email: attributes.email,
          teamName: "Development Team", // Replace this with actual team data if available
          roleName: "Developer", // Replace with actual role data if available
        };

        setUserSettings(userData);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    fetchUserSettings();
  }, []);

  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
