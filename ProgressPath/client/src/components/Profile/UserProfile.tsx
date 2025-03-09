import React, { useState, useEffect } from "react";
import {
  MDBCol as ProfileCol,
  MDBContainer as ProfileContainer,
  MDBRow as ProfileRow,
  MDBCard as ProfileCard,
  MDBCardBody as ProfileCardBody,
  MDBTypography as ProfileTypography,
  MDBInput as ProfileInput,
  MDBTextArea as ProfileTextArea,
  MDBBtn as ProfileBtn,
  MDBIcon as ProfileIcon,
} from "mdb-react-ui-kit";
import { useAuth } from "../../context/authContext";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../utils/mutations";
import "./UserProfile.css";

// Icons for Avatar Selection
import { TbArrowsRandom } from "react-icons/tb";
import { FaBrain, FaPaintBrush, FaBookReader, FaDumbbell, FaTasks } from "react-icons/fa";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";

const iconMap: Record<string, JSX.Element> = {
  TbArrowsRandom: <TbArrowsRandom style={{ fontSize: "2rem" }} />,
  FaBrain: <FaBrain style={{ fontSize: "2rem" }} />,
  FaPaintBrush: <FaPaintBrush style={{ fontSize: "2rem" }} />,
  GiInnerSelf: <GiInnerSelf style={{ fontSize: "2rem" }} />,
  GiKnifeFork: <GiKnifeFork style={{ fontSize: "2rem" }} />,
  FaBookReader: <FaBookReader style={{ fontSize: "2rem" }} />,
  FaDumbbell: <FaDumbbell style={{ fontSize: "2rem" }} />,
  FaTasks: <FaTasks style={{ fontSize: "2rem" }} />,
};

const UserProfile: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [deleteUser] = useMutation(DELETE_USER);
  const [profile, setProfile] = useState({
    name: "",
    pathway: "",
    location: "",
    email: user?.email || "",
    about: "",
    facebook: "",
    instagram: "",
    avatar: "FaBrain", // Default avatar
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfile({ ...profile, avatar: e.target.value });
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    console.log("Profile Saved:", profile);
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteUser();
      console.log("User deleted successfully.");
      localStorage.removeItem("token");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("userId");
      logout();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className={`profile-modal ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "flex" : "none" }}>
      <div className="profile-modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>

        <ProfileContainer className="py-5">
          <ProfileRow className="justify-content-center">
            <ProfileCol lg="6">
              <ProfileCard className="mb-3">
                <ProfileRow className="g-0">
                  <ProfileCol md="4" className="gradient-custom text-center text-white">
                    <div className="profile-avatar">{iconMap[profile.avatar]}</div>
                    <ProfileTypography tag="h5">{profile.name || "Your Name"}</ProfileTypography>
                    <ProfileTypography tag="h6">{profile.pathway || "Your Pathway"}</ProfileTypography>

                    <select className="form-select avatar-select" name="avatar" value={profile.avatar} onChange={handleAvatarChange}>
                      {Object.keys(iconMap).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </ProfileCol>

                  <ProfileCol md="8">
                    <ProfileCardBody className="p-4">
                      <ProfileTypography tag="h6">Profile Information</ProfileTypography>
                      <hr />

                      <ProfileInput label="Name" type="text" name="name" value={profile.name} onChange={handleChange} />
                      <ProfileInput label="Location" type="text" name="location" value={profile.location} onChange={handleChange} className="mt-3" />
                      <ProfileInput label="Email" type="email" name="email" value={profile.email} readOnly className="mt-3" />

                      <ProfileTextArea label="About" name="about" value={profile.about} onChange={handleChange} maxLength={300} className="mt-3" />

                      <ProfileInput label="Facebook" type="text" name="facebook" value={profile.facebook} onChange={handleChange} className="mt-3" />
                      <ProfileInput label="Instagram" type="text" name="instagram" value={profile.instagram} onChange={handleChange} className="mt-3" />

                      <ProfileBtn className="mt-4 profile-btn" block onClick={handleSaveProfile}>
                        Save Profile
                      </ProfileBtn>

                      <ProfileBtn className="mt-2 delete-profile-btn" block onClick={handleDeleteProfile}>
                        <ProfileIcon fas icon="trash" className="delete-icon" /> Delete Profile
                      </ProfileBtn>
                    </ProfileCardBody>
                  </ProfileCol>
                </ProfileRow>
              </ProfileCard>
            </ProfileCol>
          </ProfileRow>
        </ProfileContainer>
      </div>
    </div>
  );
};

export default UserProfile;


