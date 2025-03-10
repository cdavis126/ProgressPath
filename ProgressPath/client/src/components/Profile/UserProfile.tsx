import React, { useState, useEffect } from "react";
import {
  MDBCol as ProfileCol,
  MDBContainer as ProfileContainer,
  MDBRow as ProfileRow,
  MDBCard as ProfileCard,
  MDBCardBody as ProfileCardBody,
  MDBTypography as ProfileTypography,
  MDBTextArea as ProfileTextArea,
  MDBBtn as ProfileBtn,
} from "mdb-react-ui-kit";
import { useAuth } from "../../context/authContext";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../utils/mutations";
import "./UserProfile.css";

// Icons
import { TbArrowsRandom } from "react-icons/tb";
import { FaBrain, FaPaintBrush, FaBookReader, FaDumbbell, FaTasks } from "react-icons/fa";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";

// Interface for component props
interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

// Profile state interface
interface ProfileState {
  name: string;
  pathway: string;
  location: string;
  about: string;
  avatar: string;
}

// Icon map
const iconMap: Record<string, { element: JSX.Element; label: string }> = {
  TbArrowsRandom: { element: <TbArrowsRandom />, label: "Progressing" },
  FaBrain: { element: <FaBrain />, label: "Learning" },
  FaPaintBrush: { element: <FaPaintBrush />, label: "Creating" },
  GiInnerSelf: { element: <GiInnerSelf />, label: "Mindful" },
  GiKnifeFork: { element: <GiKnifeFork />, label: "Nourishing" },
  FaBookReader: { element: <FaBookReader />, label: "Reading" },
  FaDumbbell: { element: <FaDumbbell />, label: "Flexing" },
  FaTasks: { element: <FaTasks />, label: "Accomplishing" },
};

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [deleteUser] = useMutation(DELETE_USER);

  const userEmail: string = user?.email || "No email found";

  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    pathway: "",
    location: "",
    about: "",
    avatar: "FaBrain",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <button className="close-button" onClick={onClose}>✖</button>

        <ProfileContainer>
          <ProfileRow className="justify-content-center">
            <ProfileCol lg="8">
              <ProfileCard className="profile-card">
                <ProfileRow className="g-0">
                  
                  {/* ✅ LEFT SIDE - FIXED GRADIENT, ICON UPDATING */}
                  <ProfileCol md="5" className="profile-left">
                    <div className="profile-avatar">
                      {iconMap[profile.avatar]?.element || <FaBrain />}
                    </div>

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="profile-name-input"
                    />

                    <p className="profile-pathway">{profile.pathway || "Select Your Pathway"}</p>

                    <select className="form-select pathway-dropdown" name="avatar" value={profile.avatar} onChange={handleAvatarChange}>
                      <option value="">I'm...</option>
                      {Object.keys(iconMap).map((key) => (
                        <option key={key} value={key}>{iconMap[key].label}</option>
                      ))}
                    </select>
                  </ProfileCol>

                  {/* ✅ RIGHT SIDE FIXES */}
                  <ProfileCol md="7">
                    <ProfileCardBody className="p-4">
                      <ProfileTypography tag="h6" className="profile-section-header">Profile Information</ProfileTypography>
                      <hr className="profile-divider" />

                      {/* ✅ EMAIL FIXED (NO BORDER) */}
                      <p className="profile-email-box">{userEmail}</p>

                      <label className="profile-label">Select Your Pathway</label>
                      <select className="form-select mt-2" name="pathway" value={profile.pathway} onChange={handleChange}>
                        <option value="">Select Your Pathway</option>
                        <option value="Mindset">Mindset</option>
                        <option value="Creativity">Creativity</option>
                        <option value="Well-Being">Well-Being</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Growth">Growth</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Other">Other</option>
                      </select>

                      <label className="profile-label mt-2">Location</label>
                      <input type="text" name="location" value={profile.location} onChange={handleChange} className="profile-location mt-2" placeholder="Enter your location" />

                      {/* ✅ ABOUT FIXED (NOW ABOVE FORM FILL) */}
                      <label className="profile-label mt-2">About</label>
                      <ProfileTextArea name="about" value={profile.about} onChange={handleChange} maxLength={300} className="mt-2 profile-textarea" placeholder="Tell us about yourself!"/>

                      {/* ✅ FIXED DELETE PROFILE BUTTON */}
                      <ProfileBtn className="mt-3 profile-btn" block onClick={handleSaveProfile}>Save Profile</ProfileBtn>
                      <ProfileBtn className="mt-2 delete-profile-btn" block onClick={handleDeleteProfile}>Delete Profile</ProfileBtn>

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























