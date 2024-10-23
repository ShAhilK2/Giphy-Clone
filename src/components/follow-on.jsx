// FollowOn.jsx
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div className="text-gray-400 pt-2">
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3 faded-text">
        <a href="https://www.youtube.com/">
          <FaYoutube size={20} />
        </a>
        <a href="https://www.instagram.com/sahil.kataria08">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.twitter.com/Sahil_katariya8">
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
