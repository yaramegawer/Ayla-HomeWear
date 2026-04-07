import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";


const SocialMediaFooter = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
    <div className="bg-secondaryBrown flex justify-center items-center flex-col py-9 gap-3 mt-24 mx-5 max-[400px]:mx-3">
      <p className="text-base text-white font-light">Follow us on:</p>
      <div className="flex gap-2 text-white">
   <a href="https://www.facebook.com/share/1Ack7vEqsQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="w-3" />
      </a>

      <a href="https://www.instagram.com/elmawardy__store?igsh=cW44bzhzODhjbmZ3" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="w-4" />
      </a>

      <a href="https://www.tiktok.com/@elmawardy__store?_r=1&_t=ZS-95JXrdUFjrs" target="_blank" rel="noopener noreferrer">
        <FaTiktok className="w-4" />
      </a>
      </div>
    </div>

    </div>
  )
}
export default SocialMediaFooter