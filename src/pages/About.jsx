import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Title Section */}
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-center py-8 border-t border-gray-300">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      
      {/* About Content */}
      <div className="my-12 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
        <img
          className="w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-lg"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 text-gray-800">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Welcome to UrbanAura, where passion meets quality in every product we offer. Our journey began with a vision to create a shopping experience that goes beyond the ordinary. We believe in delivering not just items, but a lifestyle—one that reflects your individuality and meets your needs with excellence and style.
          </p>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Our store is more than just a place to shop; it's a destination where you can discover unique products designed to enrich your life and elevate your everyday experiences.
          </p>
          <b className="text-gray-900 text-lg md:text-xl lg:text-2xl">Our Mission</b>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            We strive to provide a curated selection of high-quality products that enhance your lifestyle. Our mission is to make fashion and essentials accessible and enjoyable, ensuring you feel confident and satisfied with every purchase.
          </p>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-center py-6">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-20">
        {/* Quality Assurance */}
        <div className="border border-gray-200 px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12 flex flex-col gap-4 rounded-lg shadow-md bg-white">
          <b className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Quality Assurance:</b>
          <p className="text-gray-700 leading-relaxed">
            We carefully select our products to ensure they meet the highest standards of quality. Each item undergoes rigorous checks to guarantee durability, comfort, and style, so you can shop with confidence.
          </p>
        </div>
        
        {/* Convenience */}
        <div className="border border-gray-200 px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12 flex flex-col gap-4 rounded-lg shadow-md bg-white">
          <b className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Convenience:</b>
          <p className="text-gray-700 leading-relaxed">
            Shopping with us is easy and enjoyable. Our user-friendly website, seamless checkout process, and fast shipping options are designed to make your experience as smooth and hassle-free as possible.
          </p>
        </div>
        
        {/* Exceptional Customer Service */}
        <div className="border border-gray-200 px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12 flex flex-col gap-4 rounded-lg shadow-md bg-white">
          <b className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Exceptional Customer Service:</b>
          <p className="text-gray-700 leading-relaxed">
            Our dedicated customer service team is here to assist you every step of the way. We pride ourselves on our personalized support and quick responses to ensure you have a pleasant and satisfying shopping experience.
          </p>
        </div>
      </div>
      
      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default About;
