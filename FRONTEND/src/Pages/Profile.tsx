import { Camera, Mail, MapPin, Pencil, Phone} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { useAuth } from "../Context/AuthContext";
import type { User, Address } from "../types/index";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<User>({} as User);
  const {updateUser}=useAuth();
  const home = profile?.addresses?.find(address => address?.label === 'Home');

  const fetchUser=async()=>{
    try{
        const {data}=await api.get("/user");
        updateUser(data.user);
        setProfile(data.user)
    }catch(error:any){
        console.log(error.message);
        toast.error(error.message);
    }
  }

  const updateProfile = async() => {
    try{
        const {data}=await api.patch('/user',profile);  
        console.log(data);     
         setProfile(data.user);
          updateUser(data.user);
        toast.success("Profile updated successfully");
    }catch(error:any){
        console.log(error.message);
        toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({...profile,[e.target.name]: e.target.value,
        });
    };


  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <section className="min-h-screen bg-app-cream py-50 px-5">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-app-green to-green-600" />

          {/* Profile Info */}
          <div className="px-6 md:px-10 pb-8">

            {/* Avatar */}
            <div className="relative -mt-14 mb-6 flex items-end justify-between">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-app-green/10 flex items-center justify-center text-app-green">
                    {/* <User className="w-12 h-12" /> */}
                  </div>
                </div>

                <button
                  type="button"
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-app-green text-white flex items-center justify-center shadow-md hover:bg-green-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-5 py-2.5  rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors active:scale-95 duration-200"
              >
                <Pencil className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Name */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile?.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Customer
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-app-green/10 text-app-green flex items-center justify-center">
                    {/* <User className="w-4 h-4" /> */}
                  </div>

                  <span className="text-sm text-gray-500">
                    Full Name
                  </span>
                </div>

                {isEditing ? (
                  <input
                    name="name"
                    value={profile?.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-app-green focus:ring-2 focus:ring-app-green/10"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {profile?.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>

                  <span className="text-sm text-gray-500">
                    Email Address
                  </span>
                </div>

               <div>
                  <p className="font-medium text-gray-800 break-all">
                    {profile?.email}
                  </p>
                </div>
              </div> 

              {/* Phone */}
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>

                  <span className="text-sm text-gray-500">
                    Phone Number
                  </span>
                </div>

                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-app-green focus:ring-2 focus:ring-app-green/10"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {profile?.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>

                  <span className="text-sm text-gray-500">
                    Default Address
                  </span>
                </div>

                <p className="font-medium text-gray-800">
                  {home ? `${home.address} ${home.city} ${home.state}` : ''}
                </p>
              </div>

            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {setIsEditing(false);updateProfile()}}
                  className="px-6 py-2.5 rounded-lg bg-app-green text-white font-medium hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
