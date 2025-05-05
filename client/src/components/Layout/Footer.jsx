import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-6 max-w-[1400px] mx-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row md:px-32 justify-between items-center text-sm">
        <div className="text-black">© 2025 Auth. All rights reserved.</div>
        <div className="flex space-x-4 text-black">
          <a href="#" className="hover:text-gray-700 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Contact
          </a>
        </div>
        <div>
          <p className="text-[7px]">
            Designed & Developed by:{" "}
            <a
              href="https://www.linkedin.com/in/pustamrai"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <b className="underline hover:no-underline cursor-pointer">
                Pustam Rai
              </b>{" "}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
